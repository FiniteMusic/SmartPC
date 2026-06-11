const { buscarCyberpuerta } = require("../scrapers/cyberpuerta.scraper");
const { guardarResultadosScraping } = require("../services/scrapingService");

async function main() {
  try {
    const busquedas = [
      "laptop lenovo loq",
      "laptop gamer rtx 4050",
      "laptop gamer rtx 3050",
      "laptop intel core i5 16gb ssd",
    ];

    for (const query of busquedas) {
      console.log(`Buscando: ${query}`);

      const resultados = await buscarCyberpuerta(query, 5);

      console.log(`Resultados encontrados: ${resultados.length}`);

      const resumen = await guardarResultadosScraping(resultados);

        console.log(`Guardados: ${resumen.guardados}`);
        console.log(`Omitidos por duplicado: ${resumen.omitidos}`);
    }

    console.log("Scraping finalizado correctamente.");
    process.exit(0);
  } catch (error) {
    console.error("Error en actualización de scraping:");
    console.error(error);
    process.exit(1);
  }
}

main();