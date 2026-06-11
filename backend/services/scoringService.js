function calcularScoreCPU(cpu) {
  if (!cpu) return 50;

  const text = String(cpu).toLowerCase();

  if (text.includes("apple m4")) return 92;
  if (text.includes("apple m3")) return 88;
  if (text.includes("apple m2")) return 82;
  if (text.includes("apple m1")) return 76;

  if (text.includes("i9") || text.includes("ryzen 9")) return 95;
  if (text.includes("i7") || text.includes("ryzen 7")) return 85;
  if (text.includes("i5") || text.includes("ryzen 5")) return 75;
  if (text.includes("i3") || text.includes("ryzen 3")) return 55;

  return 60;
}


function calcularScoreGPU(gpu) {
  if (!gpu) return 40;

  const text = String(gpu).toLowerCase();

  if (text.includes("apple m4")) return 78;
  if (text.includes("apple m3")) return 72;
  if (text.includes("apple m2")) return 68;
  if (text.includes("apple m1")) return 62;

  if (text.includes("iris xe")) return 55;
  if (text.includes("radeon")) return 50;
  if (text.includes("intel uhd")) return 40;
  if (text.includes("integrada")) return 40;

  if (text.includes("rtx 5070")) return 96;
  if (text.includes("rtx 5060")) return 92;
  if (text.includes("rtx 5050")) return 88;
  if (text.includes("rtx 4070")) return 95;
  if (text.includes("rtx 4060")) return 88;
  if (text.includes("rtx 4050")) return 78;
  if (text.includes("rtx 3050")) return 65;
  if (text.includes("gtx 1650")) return 55;

  return 50;
}

function calcularScoreRAM(ramGB) {
  const ram = Number(ramGB);

  if (!ram) return 40;
  if (ram >= 32) return 95;
  if (ram >= 24) return 90;
  if (ram >= 16) return 85;
  if (ram >= 8) return 55;

  return 35;
}

function calcularScoreAlmacenamiento(almacenamientoGB) {
  const gb = Number(almacenamientoGB);

  if (!gb) return 40;
  if (gb >= 1024) return 92;
  if (gb >= 512) return 80;
  if (gb >= 256) return 58;

  return 35;
}

function calcularScorePantalla(nombre) {
  if (!nombre) return 65;

  const text = String(nombre).toLowerCase();

  if (text.includes("2560x1600") || text.includes("wqxga")) return 90;
  if (text.includes("1920x1200") || text.includes("wuxga")) return 82;
  if (text.includes("1920x1080") || text.includes("full hd")) return 72;
  if (text.includes("1366x768") || text.includes("hd")) return 50;

  return 65;
}

function detectarCategoria(gpu, nombre) {
  const text = `${gpu || ""} ${nombre || ""}`.toLowerCase();

  if (
    text.includes("rtx") ||
    text.includes("gamer") ||
    text.includes("gaming")
  ) {
    return "Gaming";
  }

  return "Oficina";
}


function detectarGama(precio) {
  const p = Number(precio);

  if (p >= 35000) return "Alta";
  if (p >= 20000) return "Media-alta";
  if (p >= 12000) return "Media";
  return "Entrada";
}

function generarScoresProducto(producto) {
  return {
    cpuScore: calcularScoreCPU(producto.cpu_detectado),
    gpuScore: calcularScoreGPU(producto.gpu_detectada),
    ramScore: calcularScoreRAM(producto.ram_gb),
    almacenamientoScore: calcularScoreAlmacenamiento(producto.almacenamiento_gb),
    pantallaScore: calcularScorePantalla(producto.nombre),
    bateriaScore: 60,
    portabilidadScore: 65,
    categoria: detectarCategoria(producto.gpu_detectada, producto.nombre),
    gama: detectarGama(producto.precio),
  };
}

module.exports = {
  generarScoresProducto,
};