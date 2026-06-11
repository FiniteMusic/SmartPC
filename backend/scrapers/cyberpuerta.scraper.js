const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");

function limpiarTexto(texto = "") {
  return texto.replace(/\s+/g, " ").trim();
}

function limpiarPrecio(texto = "") {
  const limpio = texto
    .replace(/[$,\s]/g, "")
    .replace(/[^\d.]/g, "");

  const precio = Number(limpio);
  return Number.isNaN(precio) ? null : precio;
}

function completarLink(link) {
  if (!link) return null;

  if (link.startsWith("http")) return link;

  if (link.startsWith("/")) {
    return `https://www.cyberpuerta.mx${link}`;
  }

  return `https://www.cyberpuerta.mx/${link}`;
}

function esResultadoRelevante(nombre, query) {
  const nombreLower = nombre.toLowerCase();
  const queryLower = query.toLowerCase();

  // Si buscamos LOQ, debe contener LOQ
  if (queryLower.includes("loq") && !nombreLower.includes("loq")) {
    return false;
  }

  // Evitar accesorios o productos que no sean laptops
  const palabrasProhibidas = [
    "mochila",
    "cargador",
    "funda",
    "base",
    "mouse",
    "teclado",
    "monitor",
    "memoria usb",
    "disco duro externo",
  ];

  const esAccesorio = palabrasProhibidas.some((palabra) =>
    nombreLower.includes(palabra)
  );

  if (esAccesorio) return false;

  // Debe parecer laptop
  const pareceLaptop =
    nombreLower.includes("laptop") ||
    nombreLower.includes("notebook") ||
    nombreLower.includes("gamer");

  return pareceLaptop;
}

function extraerRAM(nombre) {
  const match = nombre.match(/(\d+)\s*GB/i);
  return match ? Number(match[1]) : null;
}

function extraerAlmacenamiento(nombre) {
  const tbMatch = nombre.match(/(\d+)\s*TB\s*SSD/i);
  if (tbMatch) return Number(tbMatch[1]) * 1024;

  const gbMatch = nombre.match(/(\d+)\s*GB\s*SSD/i);
  if (gbMatch) return Number(gbMatch[1]);

  return null;
}

function extraerGPU(nombre) {
  const match = nombre.match(/RTX\s?\d{4}|GTX\s?\d{4}|Intel Iris Xe|Radeon/i);
  return match ? match[0].toUpperCase().replace(/\s+/g, " ") : null;
}

function extraerCPU(nombre) {
  const patrones = [
    /Intel Core i[3579]-\d+[A-Z]*/i,
    /AMD Ryzen [3579] \d+[A-Z]*/i,
    /Apple M[1234]/i,
  ];

  for (const patron of patrones) {
    const match = nombre.match(patron);
    if (match) return match[0];
  }

  return null;
}


async function buscarCyberpuerta(query, limite = 10) {
  const url = `https://www.cyberpuerta.mx/index.php?cl=search&searchparam=${encodeURIComponent(
    query
  )}`;

  const { data } = await axios.get(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
      "Accept-Language": "es-MX,es;q=0.9",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    },
    timeout: 30000,
  });

  const debugPath = path.join(__dirname, "../debug-cyberpuerta.html");
  fs.writeFileSync(debugPath, data, "utf8");

  console.log("URL consultada:", url);
  console.log("HTML guardado en:", debugPath);
  console.log("Tamaño del HTML:", data.length);

  const $ = cheerio.load(data);
  const resultados = [];

  const items = $(".cpd-product-card-catalog-list");

  console.log("Items detectados:", items.length);

  items.each((index, element) => {
    if (resultados.length >= limite) return false;

    const card = $(element);

    const enlaceProducto = card.find("a.cp-product-info-dne").first();

    const nombre = limpiarTexto(
      enlaceProducto.attr("title") ||
        enlaceProducto.find(".cp-product-info-dne__name").text() ||
        enlaceProducto.text()
    );

    const link = completarLink(enlaceProducto.attr("href"));

    const precioTexto = limpiarTexto(
      card.find(".cp-price").first().text() ||
        card.find(".cp-text--price-total").first().text() ||
        card.find(".cp-text--price-offer").first().text() ||
        card.find(".cp-text--price-to-bold").last().text()
    );

    const precio = limpiarPrecio(precioTexto);

    if (!nombre || !link || !precio) return;

    if (!esResultadoRelevante(nombre, query)) return;

    resultados.push({
        nombre,
        precio,
        tienda: "Cyberpuerta",
        linkTienda: link,
        queryBusqueda: query,
        specsDetectadas: {
        cpu: extraerCPU(nombre),
        gpu: extraerGPU(nombre),
        ramGB: extraerRAM(nombre),
        almacenamientoGB: extraerAlmacenamiento(nombre),
        },
    });
  });

  return resultados;
}



module.exports = {
  buscarCyberpuerta,
};