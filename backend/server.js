const express = require("express");
const cors = require("cors");
const { generarRecomendaciones } = require("./services/recommendationEngine");
const { obtenerEquipos, obtenerEquipoPorId } = require("./services/equiposService");
const { 
  iniciarSchedulerScraping, 
  ejecutarScrapingProgramado, 
} = require("./services/schedulerService");
const {
  obtenerProductosScraping,
  actualizarEstadoProductoScraping,
   guardarResultadosScraping,
   obtenerProductoScrapingPorId,
} = require("./services/scrapingService");

const {
  obtenerPesosPerfiles,
  obtenerPesosPerfilPorNombre,
} = require("./services/perfilService");


const { convertirProductoAEquipo } = require("./services/catalogoService");
const { verificarAdmin } = require("./middlewares/adminAuth");
const app = express();
const PORT = process.env.PORT || 3001;



// Middlewares
const normalizeOrigin = (url) => url?.replace(/\/$/, "");

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  process.env.FRONTEND_URL,
]
  .filter(Boolean)
  .map(normalizeOrigin);

app.use(
  cors({
    origin: (origin, callback) => {
      const cleanOrigin = normalizeOrigin(origin);

      if (!cleanOrigin || allowedOrigins.includes(cleanOrigin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Origen no permitido por CORS"));
    },
    credentials: true,
  })
);
app.use(express.json());

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({
    mensaje: "Backend de SmartPC funcionando correctamente",
  });
});

// Ruta temporal para probar API
app.get("/api/status", (req, res) => {
  res.json({
    ok: true,
    sistema: "SmartPC",
    modulo: "Backend",
  });
});


app.get("/api/equipos", async (req, res) => {
  try {
    const equipos = await obtenerEquipos();

    res.json({
      total: equipos.length,
      equipos,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener equipos",
      detalle: error.message,
    });
  }
});

app.get("/api/equipos/:id", async (req, res) => {
  try {
    const equipo = await obtenerEquipoPorId(Number(req.params.id));

    if (!equipo) {
      return res.status(404).json({
        mensaje: "Equipo no encontrado",
      });
    }

    res.json(equipo);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener equipo",
      detalle: error.message,
    });
  }
});
app.post("/api/recomendaciones", async (req, res) => {
    console.log("BODY RECIBIDO:", req.body);
  try {
    const {
      perfil,
      presupuestoMin,
      presupuestoMax,
      preferencias = [],
    } = req.body;

    if (!perfil || presupuestoMin == null || presupuestoMax == null) {
      return res.status(400).json({
        mensaje: "Faltan datos obligatorios: perfil, presupuestoMin o presupuestoMax",
      });
    }

    const equipos = await obtenerEquipos();

    const resultado = generarRecomendaciones({
      equipos,
      perfil,
      presupuestoMin: Number(presupuestoMin),
      presupuestoMax: Number(presupuestoMax),
      preferencias,
    });

    res.json(resultado);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      mensaje: "Error al generar recomendaciones",
      detalle: error.message,
    });
  }
});

app.post("/api/scraping/ejecutar", verificarAdmin, async (req, res) => {
  try {
    const { grupo } = req.body || {};

    await ejecutarScrapingProgramado(grupo || null);

    res.json({
      mensaje: "Scraping ejecutado correctamente",
      grupo: grupo || "automatico",
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al ejecutar scraping",
      detalle: error.message,
    });
  }
});

app.get("/api/scraping/productos", verificarAdmin, async (req, res) => {
  try {
    const { estado } = req.query;

    const productos = await obtenerProductosScraping(estado || null);

    res.json({
      total: productos.length,
      productos,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener productos scrapeados",
      detalle: error.message,
    });
  }
});

app.patch("/api/scraping/productos/:id/estado", verificarAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { estadoRevision, observaciones } = req.body;

    if (!estadoRevision) {
      return res.status(400).json({
        mensaje: "El campo estadoRevision es obligatorio",
      });
    }

    const actualizado = await actualizarEstadoProductoScraping(
      Number(id),
      estadoRevision,
      observaciones || null
    );

    if (!actualizado) {
      return res.status(404).json({
        mensaje: "Producto scrapeado no encontrado",
      });
    }

    res.json({
      mensaje: "Estado actualizado correctamente",
      id: Number(id),
      estadoRevision,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar estado del producto",
      detalle: error.message,
    });
  }
});


app.post("/api/scraping/productos/:id/convertir", verificarAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const producto = await obtenerProductoScrapingPorId(Number(id));

    if (!producto) {
      return res.status(404).json({
        mensaje: "Producto scrapeado no encontrado",
      });
    }

    const resultado = await convertirProductoAEquipo(producto);

    res.json({
      mensaje: "Producto convertido al catálogo correctamente",
      resultado,
    });
  } catch (error) {

    console.error("ERROR REAL AL CONVERTIR PRODUCTO:");
    console.error(error);

    res.status(500).json({
      mensaje: "Error al convertir producto al catálogo",
      detalle: error.message,
    });
  }
});

app.get("/api/perfiles/pesos", async (req, res) => {
  try {
    const perfiles = await obtenerPesosPerfiles();

    res.json({
      mensaje: "Pesos de perfiles obtenidos correctamente",
      perfiles,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener pesos de perfiles",
      detalle: error.message,
    });
  }
});

app.get("/api/perfiles/:nombre/pesos", async (req, res) => {
  try {
    const { nombre } = req.params;

    const perfil = await obtenerPesosPerfilPorNombre(nombre);

    res.json({
      mensaje: "Pesos del perfil obtenidos correctamente",
      perfil,
    });
  } catch (error) {
    res.status(404).json({
      mensaje: "Error al obtener pesos del perfil",
      detalle: error.message,
    });
  }
});

// Iniciar servidor

app.listen(PORT, () => {
  console.log(`Servidor SmartPC corriendo en puerto ${PORT}`);
});