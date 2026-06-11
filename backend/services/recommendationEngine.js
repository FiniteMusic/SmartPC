const PESOS_POR_PERFIL = {
  Gaming: {
    cpu: 25,
    ram: 15,
    gpu: 40,
    almacenamiento: 10,
    pantalla: 10,
    bateria: 0,
    portabilidad: 0,
  },

  Programacion: {
    cpu: 35,
    ram: 30,
    almacenamiento: 20,
    pantalla: 10,
    gpu: 5,
    bateria: 0,
    portabilidad: 0,
  },

  Diseno: {
    pantalla: 25,
    gpu: 25,
    cpu: 20,
    ram: 20,
    almacenamiento: 10,
    bateria: 0,
    portabilidad: 0,
  },

  Oficina: {
    cpu: 20,
    ram: 20,
    almacenamiento: 20,
    pantalla: 15,
    bateria: 15,
    portabilidad: 10,
    gpu: 0,
  },
};

const BONOS_POR_PREFERENCIA = {
  portabilidad: {
    campo: "portabilidad",
    puntos: 4,
  },
  bateria: {
    campo: "bateria",
    puntos: 4,
  },

  grafico: {
    campo: "gpu",
    puntos: 4,
  },
  rendimientoGrafico: {
    campo: "gpu",
    puntos: 4,
  },

  almacenamiento: {
    campo: "almacenamiento",
    puntos: 4,
  },

  pantalla: {
    campo: "pantalla",
    puntos: 4,
  },
  pantallaPremium: {
    campo: "pantalla",
    puntos: 4,
  },

  precio: {
    campo: "precio",
    puntos: 4,
  },
  costoBeneficio: {
    campo: "precio",
    puntos: 4,
  },
};
function obtenerScoreComponente(equipo, componente) {
  if (!equipo[componente]) return 0;

  if (typeof equipo[componente].score === "number") {
    return equipo[componente].score;
  }

  return 0;
}

function normalizarPreferencia(preferencia = "") {
  const texto = String(preferencia)
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const mapa = {
    portabilidad: "portabilidad",
    bateria: "bateria",
    grafico: "gpu",
    graficos: "gpu",
    rendimientografico: "gpu",
    almacenamiento: "almacenamiento",
    pantallapremium: "pantalla",
    pantalla: "pantalla",
    precio: "precio",
    costobeneficio: "precio",
  };

  return mapa[texto] || texto;
}

function aplicarPreferenciasAPesos(pesosBase, preferencias = []) {
  const pesos = { ...pesosBase };

  preferencias.forEach((preferencia) => {
    const componente = normalizarPreferencia(preferencia);

    if (componente === "precio") return;

    if (pesos[componente] !== undefined) {
      pesos[componente] += 10;
    }
  });

  const total = Object.values(pesos).reduce(
    (sum, peso) => sum + Number(peso || 0),
    0
  );

  if (total === 0) return pesosBase;

  const pesosNormalizados = {};

  Object.entries(pesos).forEach(([componente, peso]) => {
    pesosNormalizados[componente] = Number(
      ((Number(peso) / total) * 100).toFixed(2)
    );
  });

  return pesosNormalizados;
}

function calcularScoreBase(equipo, perfil, preferencias = []) {
  const pesosBase = PESOS_POR_PERFIL[perfil];

  if (!pesosBase) {
    throw new Error(`Perfil no válido: ${perfil}`);
  }

  const pesosAjustados = aplicarPreferenciasAPesos(pesosBase, preferencias);

  let total = 0;

  Object.entries(pesosAjustados).forEach(([componente, peso]) => {
    const scoreComponente = obtenerScoreComponente(equipo, componente);
    total += scoreComponente * (peso / 100);
  });

  return {
    scoreBase: total,
    pesosBase,
    pesosAjustados,
  };
}

function calcularBonoPreferencias(equipo, preferencias = [], presupuestoMin, presupuestoMax) {
  let bono = 0;

  preferencias.forEach((pref) => {
    const config = BONOS_POR_PREFERENCIA[pref];

    if (!config) return;

    if (config.campo === "precio") {
      const rango = presupuestoMax - presupuestoMin;
      const posicionPrecio = equipo.precio - presupuestoMin;

      if (rango <= 0) return;

      const porcentajePrecio = posicionPrecio / rango;

      if (porcentajePrecio <= 0.4) {
        bono += config.puntos;
      } else if (porcentajePrecio <= 0.7) {
        bono += config.puntos / 2;
      }

      return;
    }

    const score = obtenerScoreComponente(equipo, config.campo);

    if (score >= 85) {
      bono += config.puntos;
    } else if (score >= 70) {
      bono += config.puntos / 2;
    }
  });

  return bono;
}

function calcularPenalizacionPrecio(equipo, presupuestoMin, presupuestoMax) {
  const rango = presupuestoMax - presupuestoMin;

  if (rango <= 0) return 0;

  const posicionPrecio = equipo.precio - presupuestoMin;
  const porcentajePrecio = posicionPrecio / rango;

  if (porcentajePrecio <= 0.7) return 0;

  return (porcentajePrecio - 0.7) * 10;
}

function generarExplicacion(equipo, perfil, preferencias = []) {
  const razones = [];

  if (perfil === "Gaming") {
    razones.push("prioriza el rendimiento gráfico para juegos");
    if (equipo.gpu?.score >= 80) razones.push("cuenta con una GPU fuerte para su rango de precio");
    if (equipo.pantalla?.hz >= 120) razones.push("su pantalla de alta frecuencia mejora la experiencia en juegos");
  }

  if (perfil === "Programacion") {
    razones.push("prioriza CPU, RAM y almacenamiento rápido");
    if (equipo.ram?.capacidadGB >= 16) razones.push("incluye suficiente RAM para multitarea y desarrollo");
    if (equipo.almacenamiento?.tipo?.toLowerCase().includes("nvme")) razones.push("su SSD NVMe ayuda a cargar proyectos con mayor rapidez");
  }

  if (perfil === "Diseno") {
    razones.push("prioriza pantalla, GPU y RAM para trabajo creativo");
    if (equipo.pantalla?.score >= 85) razones.push("ofrece una pantalla de buena calidad visual");
    if (equipo.gpu?.score >= 70) razones.push("su GPU puede apoyar tareas gráficas y edición");
  }

  if (perfil === "Oficina") {
    razones.push("busca equilibrio entre rendimiento, batería y costo");
    if (equipo.bateria?.score >= 75) razones.push("tiene buena autonomía para jornadas de trabajo");
    if (equipo.portabilidad?.score >= 75) razones.push("es fácil de transportar");
  }

  if (preferencias.length > 0) {
    razones.push("también se consideraron tus preferencias adicionales");
  }

  return `Se recomienda ${equipo.nombre} porque ${razones.join(", ")}.`;
}

function adaptarEquipoParaFrontend(equipo, scoreFinal, perfil, preferencias) {
  return {
    id: equipo.id,
    nombre: equipo.nombre,
    precio: equipo.precio,
    marca: equipo.marca,
    categoria: equipo.categoria,

    cpu: equipo.cpu?.modelo || "No especificado",
    ram: equipo.ram?.tipo && equipo.ram.tipo !== "No especificada"
  ? `${equipo.ram.capacidadGB} GB ${equipo.ram.tipo}`
  : `${equipo.ram?.capacidadGB || "?"} GB RAM`,
    gpu: equipo.gpu?.modelo || "No especificado",
    almacenamiento: `${equipo.almacenamiento?.capacidadGB || "?"} GB ${equipo.almacenamiento?.tipo || ""}`.trim(),
    pantalla: `${equipo.pantalla?.tamano || ""} ${equipo.pantalla?.resolucion || ""} ${equipo.pantalla?.hz || ""} Hz ${equipo.pantalla?.tipo || ""}`.trim(),

    descripcion: equipo.descripcion,
    fortalezas: equipo.fortalezas,
    linkTienda: equipo.linkTienda,

    finalScore: Math.round(scoreFinal),
    explicacion: generarExplicacion(equipo, perfil, preferencias),

    detalles: {
      cpu: equipo.cpu,
      ram: equipo.ram,
      gpu: equipo.gpu,
      almacenamiento: equipo.almacenamiento,
      pantalla: equipo.pantalla,
      bateria: equipo.bateria,
      portabilidad: equipo.portabilidad,
    },
  };
}

function normalizarPerfil(perfil) {
  if (!perfil) return "";

  const texto = perfil
    .toString()
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const perfiles = {
    gaming: "Gaming",
    programacion: "Programacion",
    diseno: "Diseno",
    oficina: "Oficina",
  };

  return perfiles[texto] || perfil;
}

function generarRecomendaciones({
  equipos,
  perfil,
  presupuestoMin,
  presupuestoMax,
  preferencias = [],
}) {
  if (!perfil) {
    throw new Error("El perfil es obligatorio");
  }

  const perfilNormalizado = normalizarPerfil(perfil);

  if (!PESOS_POR_PERFIL[perfilNormalizado]) {
    throw new Error(`El perfil recibido no es válido: ${perfil}`);
  }

  const filtrados = equipos.filter((equipo) => {
    return equipo.precio >= presupuestoMin && equipo.precio <= presupuestoMax;
  });

  const ranking = filtrados
    .map((equipo) => {
     const { scoreBase, pesosBase, pesosAjustados } = calcularScoreBase(
        equipo,
        perfilNormalizado,
        preferencias
      );

      const bonoPreferencias = calcularBonoPreferencias(
        equipo,
        preferencias,
        presupuestoMin,
        presupuestoMax
      );

      const penalizacionPrecio = calcularPenalizacionPrecio(
        equipo,
        presupuestoMin,
        presupuestoMax
      );

      const scoreFinal = Math.min(
        100,
        Math.max(0, scoreBase + bonoPreferencias - penalizacionPrecio)
      );

      const recomendado = adaptarEquipoParaFrontend(
        equipo,
        scoreFinal,
        perfilNormalizado,
        preferencias
      );

      return adaptarEquipoParaFrontend(
        equipo,
        scoreFinal,
        perfilNormalizado,
        pesosBase,
        pesosAjustados,
        preferencias
      );
    })
    .sort((a, b) => b.finalScore - a.finalScore);

  return {
    total: ranking.length,
    mejorOpcion: ranking[0] || null,
    ranking,
  };
}

module.exports = {
  generarRecomendaciones,
};