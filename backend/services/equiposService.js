const pool = require("../database/connection");

function transformarEquipo(row) {
  return {
    id: row.id,
    nombre: row.nombre,
    precio: Number(row.precio),
    marca: row.marca,
    categoria: row.categoria,
    tienda: row.tienda,
    linkTienda: row.link_tienda,
    disponible: Boolean(row.disponible),

    cpu: {
      modelo: row.cpu_modelo,
      score: row.cpu_score,
    },

    ram: {
      capacidadGB: row.ram_capacidad_gb,
      tipo: row.ram_tipo,
      score: row.ram_score,
    },

    gpu: {
      modelo: row.gpu_modelo,
      tipo: row.gpu_tipo,
      vramGB: row.gpu_vram_gb,
      score: row.gpu_score,
    },

    almacenamiento: {
      capacidadGB: row.almacenamiento_capacidad_gb,
      tipo: row.almacenamiento_tipo,
      score: row.almacenamiento_score,
    },

    pantalla: {
      tamano: row.pantalla_tamano,
      resolucion: row.pantalla_resolucion,
      hz: row.pantalla_hz,
      tipo: row.pantalla_tipo,
      score: row.pantalla_score,
    },

    bateria: {
      score: row.bateria_score,
    },

    portabilidad: {
      pesoKG: Number(row.portabilidad_peso_kg),
      score: row.portabilidad_score,
    },

    descripcion: row.descripcion,
    fortalezas: [
      "Buena relación entre precio y especificaciones",
      "Componentes adecuados para su perfil recomendado",
      "Disponible con enlace de compra externo",
    ],
  };
}

async function obtenerEquipos() {
  const [rows] = await pool.query(`
    SELECT *
    FROM vista_equipos_recomendacion
    WHERE disponible = TRUE
  `);

  return rows.map(transformarEquipo);
}

async function obtenerEquipoPorId(id) {
  const [rows] = await pool.query(
    `
    SELECT *
    FROM vista_equipos_recomendacion
    WHERE id = ?
    LIMIT 1
    `,
    [id]
  );

  if (rows.length === 0) return null;

  return transformarEquipo(rows[0]);
}

module.exports = {
  obtenerEquipos,
  obtenerEquipoPorId,
};