const axios = require("axios");
const cheerio = require("cheerio");

const fs = require("fs");
const path = require("path");

function limpiarPrecio(texto) {
  if (!texto) return null;

  const limpio = texto
    .replace(/[$,\s]/g, "")
    .replace(/[^\d.]/g, "");

  const precio = Number(limpio);

  return Number.isNaN(precio) ? null : precio;
}

async function buscarMercadoLibre(query, limite = 10) {
  const url = `https://listado.mercadolibre.com.mx/${encodeURIComponent(query)}`;

  const { data } = await axios.get(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
      "Accept-Language": "es-MX,es;q=0.9",
    },
    timeout: 15000,
  });



    const debugPath = path.join(__dirname, "../debug-mercadolibre.html");
        fs.writeFileSync(debugPath, data, "utf8");
        console.log("HTML guardado en:", debugPath);
        console.log("Tamaño del HTML:", data.length);



  const $ = cheerio.load(data);
  const resultados = [];

  $(".ui-search-result__wrapper").each((index, element) => {
    if (resultados.length >= limite) return false;

    const nombre =
      $(element).find(".poly-component__title").text().trim() ||
      $(element).find(".ui-search-item__title").text().trim();

    const link =
      $(element).find("a.poly-component__title").attr("href") ||
      $(element).find("a.ui-search-link").attr("href") ||
      $(element).find("a").attr("href");

    const precioTexto =
      $(element).find(".andes-money-amount__fraction").first().text().trim();

    const precio = limpiarPrecio(precioTexto);

    if (!nombre || !link || !precio) return;

    resultados.push({
      nombre,
      precio,
      tienda: "Mercado Libre",
      linkTienda: link,
      queryBusqueda: query,
    });
  });

  return resultados;
}

module.exports = {
  buscarMercadoLibre,
};