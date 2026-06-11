const cron = require("node-cron");
const { buscarCyberpuerta } = require("../scrapers/cyberpuerta.scraper");
const { guardarResultadosScraping } = require("./scrapingService");

const GRUPOS_BUSQUEDA = {
  gaming: [
    { query: "laptop gamer rtx 3050", limite: 4 },
    { query: "laptop gamer rtx 4050", limite: 4 },
    { query: "laptop gamer rtx 4060", limite: 4 },
    { query: "laptop lenovo loq", limite: 4 },
    { query: "laptop hp victus", limite: 4 },
  ],

  productividad: [
    { query: "laptop core i5 16gb ssd", limite: 4 },
    { query: "laptop ryzen 5 16gb ssd", limite: 4 },
    { query: "laptop core i7 16gb ssd", limite: 3 },
    { query: "laptop ryzen 7 16gb ssd", limite: 3 },
  ],

  oficina: [
    { query: "laptop core i3 8gb ssd", limite: 3 },
    { query: "laptop ryzen 3 8gb ssd", limite: 3 },
    { query: "laptop 8gb 512gb ssd", limite: 3 },
  ],

  apple: [
    { query: "macbook air m1", limite: 3 },
    { query: "macbook air m2", limite: 3 },
    { query: "macbook air m3", limite: 3 },
    { query: "macbook pro m3", limite: 3 },
  ],

  diseno: [
    { query: "laptop oled 16gb", limite: 3 },
    { query: "laptop rtx 4060 32gb", limite: 3 },
  ],
};

function obtenerGrupoDelDia() {
  const grupos = Object.keys(GRUPOS_BUSQUEDA);
  const dia = new Date().getDay();

  return grupos[dia % grupos.length];
}


async function ejecutarScrapingProgramado(grupoManual = null) {
  const grupoSeleccionado = grupoManual || obtenerGrupoDelDia();
  const busquedas = GRUPOS_BUSQUEDA[grupoSeleccionado] || GRUPOS_BUSQUEDA.gaming;

  console.log(`Iniciando scraping programado...`);
  console.log(`Grupo seleccionado: ${grupoSeleccionado}`);

  let totalEncontrados = 0;
  let totalGuardados = 0;
  let totalActualizados = 0;
  let totalErrores = 0;

  for (const busqueda of busquedas) {
    try {
      const query = busqueda.query;
      const limite = busqueda.limite || 3;

      console.log(`Buscando: ${query}`);

      const resultados = await buscarCyberpuerta(query, limite);
      const resumen = await guardarResultadosScraping(resultados);

      totalEncontrados += resultados.length;
      totalGuardados += resumen.guardados;
      totalActualizados += resumen.actualizados;

      console.log(
        `Query: ${query} | Limite: ${limite} | Encontrados: ${resultados.length} | Nuevos: ${resumen.guardados} | Actualizados: ${resumen.actualizados}`
      );

      await new Promise((resolve) => setTimeout(resolve, 8000));
    } catch (error) {
      totalErrores++;

      console.error(`Error en query "${busqueda.query}":`, error.message);

      if (error.response?.status === 429) {
        console.warn("Cyberpuerta respondió 429. Se detiene esta corrida para evitar más bloqueos.");
        break;
      }

      await new Promise((resolve) => setTimeout(resolve, 12000));
    }
  }

  console.log("Scraping programado finalizado:", {
    grupoSeleccionado,
    totalEncontrados,
    totalGuardados,
    totalActualizados,
    totalErrores,
    fecha: new Date().toLocaleString("es-MX"),
  });
}

function iniciarSchedulerScraping() {
  // Cada 24 horas a las 3:00 AM
  cron.schedule("0 3 * * *", async () => {
    await ejecutarScrapingProgramado();
  });

  console.log("Scheduler de scraping iniciado. Frecuencia: cada 24 horas a las 3:00 AM.");
}

module.exports = {
  iniciarSchedulerScraping,
  ejecutarScrapingProgramado,
};