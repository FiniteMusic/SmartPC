const pool = require("../database/connection");
const { generarScoresProducto } = require("./scoringService");

function obtenerModeloComponente(valor, respaldo) {
  return valor && String(valor).trim() !== "" ? valor : respaldo;
}

function obtenerResolucion(nombre = "") {
  const match = nombre.match(/\d{3,4}x\d{3,4}/);

  if (match) return match[0];

  if (nombre.toLowerCase().includes("full hd")) return "1920x1080";
  if (nombre.toLowerCase().includes("wuxga")) return "1920x1200";

  return "No especificada";
}

function obtenerTamanoPantalla(nombre = "") {
  const match = nombre.match(/(\d{2}(?:\.\d)?)["”]/);

  if (match) return `${match[1]} pulgadas`;

  return "No especificado";
}

function obtenerFrecuenciaPantalla(nombre = "") {
  const match = nombre.match(/(\d{2,3})\s*hz/i);

  if (match) return Number(match[1]);

  return 60;
}

async function productoYaExisteEnCatalogo(linkTienda) {
  const [rows] = await pool.query(
    `
    SELECT id
    FROM equipos
    WHERE link_tienda = ?
    LIMIT 1
    `,
    [linkTienda]
  );

  return rows[0] || null;
}

async function convertirProductoAEquipo(producto) {
  if (!producto) {
    throw new Error("Producto no encontrado");
  }

  if (producto.estado_revision !== "aprobado") {
    throw new Error("Solo se pueden convertir productos aprobados");
  }

  const existente = await productoYaExisteEnCatalogo(producto.link_tienda);

  if (existente) {
    throw new Error("Este producto ya existe en el catálogo principal");
  }

  const scores = generarScoresProducto(producto);

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const [equipoResult] = await connection.query(
      `
      INSERT INTO equipos (
        nombre,
        marca,
        categoria,
        precio,
        tienda,
        link_tienda,
        disponible,
        descripcion
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        generarNombreCorto(producto.nombre),
        detectarMarca(producto.nombre),
        scores.categoria,
        producto.precio,
        producto.tienda,
        producto.link_tienda,
        true,
        `Equipo importado desde scraping. Gama detectada: ${scores.gama}.`,
      ]
    );

    const equipoId = equipoResult.insertId;

    const componentes = [
      {
        tipo: "cpu",
        modelo: obtenerModeloComponente(producto.cpu_detectado, "CPU no especificado"),
        score: scores.cpuScore,
        extra: {},
      },
      {
        tipo: "ram",
        modelo: `${producto.ram_gb || "No especificada"} GB RAM`,
        score: scores.ramScore,
        extra: {
          capacidad_gb: producto.ram_gb || null,
          tipo_memoria: "No especificada",
        },
      },
      {
        tipo: "gpu",
        modelo: obtenerModeloComponente(producto.gpu_detectada, "Integrada"),
            score: scores.gpuScore,
          extra: {
        tipo_gpu:
          producto.gpu_detectada && producto.gpu_detectada !== "Integrada"
            ? "dedicada"
            : "integrada",
          vram_gb: null,
        },
      },
      {
        tipo: "almacenamiento",
        modelo: `${producto.almacenamiento_gb || "No especificado"} GB SSD`,
        score: scores.almacenamientoScore,
        extra: {
          capacidad_gb: producto.almacenamiento_gb || null,
          tipo_almacenamiento: "SSD",
        },
      },
      {
        tipo: "pantalla",
        modelo: `${obtenerTamanoPantalla(producto.nombre)} ${obtenerResolucion(producto.nombre)}`,
        score: scores.pantallaScore,
        extra: {
          tamano_pantalla: obtenerTamanoPantalla(producto.nombre),
          resolucion: obtenerResolucion(producto.nombre),
          hz: obtenerFrecuenciaPantalla(producto.nombre),
          tipo_pantalla: "No especificada",
        },
      },
      {
        tipo: "bateria",
        modelo: "Batería no especificada",
        score: scores.bateriaScore,
        extra: {},
      },
      {
        tipo: "portabilidad",
        modelo: "Peso no especificado",
        score: scores.portabilidadScore,
        extra: {
          peso_kg: null,
        },
      },
    ];

    for (const comp of componentes) {
      const [compResult] = await connection.query(
        `
        INSERT INTO componentes (tipo, modelo, score)
        VALUES (?, ?, ?)
        `,
        [comp.tipo, comp.modelo, comp.score]
      );

      const componenteId = compResult.insertId;

      await connection.query(
        `
        INSERT INTO equipo_componentes (
          equipo_id,
          componente_id,
          capacidad_gb,
          tipo_memoria,
          tipo_gpu,
          vram_gb,
          tipo_almacenamiento,
          tamano_pantalla,
          resolucion,
          hz,
          tipo_pantalla,
          peso_kg
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
          equipoId,
          componenteId,
          comp.extra.capacidad_gb || null,
          comp.extra.tipo_memoria || null,
          comp.extra.tipo_gpu || null,
          comp.extra.vram_gb || null,
          comp.extra.tipo_almacenamiento || null,
          comp.extra.tamano_pantalla || null,
          comp.extra.resolucion || null,
          comp.extra.hz || null,
          comp.extra.tipo_pantalla || null,
          comp.extra.peso_kg || null,
        ]
      );
    }

    await connection.query(
      `
      UPDATE productos_scraping
      SET observaciones = 'Convertido a catalogo principal'
      WHERE id = ?
      `,
      [producto.id]
    );

    await connection.commit();

    return {
      equipoId,
      nombre: producto.nombre,
      categoria: scores.categoria,
      gama: scores.gama,
      scores,
    };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

function detectarMarca(nombre = "") {
  const text = nombre.toLowerCase();

  if (text.includes("lenovo")) return "Lenovo";
  if (text.includes("hp")) return "HP";
  if (text.includes("asus")) return "ASUS";
  if (text.includes("acer")) return "Acer";
  if (text.includes("dell")) return "Dell";
  if (text.includes("aorus")) return "AORUS";
  if (text.includes("ghia")) return "GHIA";

  return "No especificada";
}

function generarNombreCorto(nombre = "") {
  const text = nombre.toLowerCase();

  if (text.includes("lenovo loq")) {
    const modelo = nombre.match(/LOQ\s?[A-Z0-9]+/i);
    return modelo ? `Lenovo ${modelo[0]}` : "Lenovo LOQ";
  }

  if (text.includes("hp victus")) return "HP Victus";
  if (text.includes("hp omen")) return "HP OMEN";
  if (text.includes("asus tuf")) return "ASUS TUF Gaming";
  if (text.includes("asus vivobook")) return "ASUS Vivobook";
  if (text.includes("acer travelmate")) return "Acer TravelMate";
  if (text.includes("dell")) return "Dell Laptop";
  if (text.includes("aorus")) return "AORUS Laptop";
  if (text.includes("ghia")) return "GHIA Libero Gamer";
  if (text.includes("macbook air")) {
  const chip = nombre.match(/\bM[1234]\b/i);
  return chip ? `MacBook Air ${chip[0].toUpperCase()}` : "MacBook Air";
}

if (text.includes("macbook pro")) {
  const chip = nombre.match(/\bM[1234]\b/i);
  return chip ? `MacBook Pro ${chip[0].toUpperCase()}` : "MacBook Pro";
}

  return nombre.split(",")[0].trim();
}

module.exports = {
  convertirProductoAEquipo,
};