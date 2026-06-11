const { buscarCyberpuerta } = require("../scrapers/cyberpuerta.scraper");

async function main() {
  try {
    const query = "laptop lenovo loq";
    const resultados = await buscarCyberpuerta(query, 5);

    console.log("Resultados encontrados:");
    console.log(JSON.stringify(resultados, null, 2));
  } catch (error) {
    console.error("Error al ejecutar scraper de Cyberpuerta:");
    console.error(error.message);
  }
}

main();