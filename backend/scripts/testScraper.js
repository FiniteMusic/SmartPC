const { buscarMercadoLibre } = require("../scrapers/mercadolibre.scraper");

async function main() {
  try {
    const query = "laptop lenovo loq";
    const resultados = await buscarMercadoLibre(query, 5);

    console.log("Resultados encontrados:");
    console.log(JSON.stringify(resultados, null, 2));
  } catch (error) {
    console.error("Error al ejecutar scraper:");
    console.error(error.message);
  }
}

main();