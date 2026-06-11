import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Recomendador.css";

/* ─────────────────────────────────────────────────────
   SVG Icons
───────────────────────────────────────────────────── */
const Icon = {
  Arrow: () => (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 8h12M8 2l6 6-6 6"/>
    </svg>
  ),
  ArrowLeft: () => (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 8H2M8 14l-6-6 6-6"/>
    </svg>
  ),
  Gaming: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="3"/>
      <path d="M6 12h4M8 10v4M15 11h2M15 13h2"/>
    </svg>
  ),
  Code: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
  Design: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
    </svg>
  ),
  Office: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
    </svg>
  ),
  Check: () => (
    <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1.5 5l2.5 2.5L8.5 2"/>
    </svg>
  ),
  Cpu: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2"/>
      <rect x="9" y="9" width="6" height="6"/>
      <path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2"/>
    </svg>
  ),
  Ram: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="10" rx="2"/>
      <path d="M6 7V5M10 7V5M14 7V5M18 7V5M6 17v2M10 17v2M14 17v2M18 17v2"/>
    </svg>
  ),
  Gpu: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="6" width="22" height="12" rx="2"/>
      <path d="M6 10h2v4H6zM11 10h2v4h-2zM16 10h2v4h-2zM22 9v6"/>
    </svg>
  ),
  Storage: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3"/>
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
    </svg>
  ),
  Screen: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/>
      <path d="M8 21h8M12 17v4"/>
    </svg>
  ),
  Star: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  ),
  External: () => (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3H3a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-3"/>
      <path d="M10 2h4v4M14 2l-7 7"/>
    </svg>
  ),
  Close: () => (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M3 3l10 10M13 3L3 13"/>
    </svg>
  ),
  Compare: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="9" height="18" rx="2"/>
      <rect x="13" y="3" width="9" height="18" rx="2"/>
    </svg>
  ),
  Info: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 16v-4M12 8h.01"/>
    </svg>
  ),
  Sparkle: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4L12 2z"/>
    </svg>
  ),
  Loader: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
    </svg>
  ),
};

/* ─────────────────────────────────────────────────────
   Mock data
───────────────────────────────────────────────────── */
const formatMXN = (n) =>
  new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(n);

const API_BASE = "http://localhost:3001/api";

const normalizarNombrePerfil = (nombre = "") =>
  String(nombre)
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const normalizarComponente = (componente = "") => {
  const key = String(componente).trim().toLowerCase();

  const mapa = {
    cpu: "cpu",
    ram: "ram",
    gpu: "gpu",
    almacenamiento: "almacenamiento",
    pantalla: "pantalla",
    bateria: "bateria",
    batería: "bateria",
    portabilidad: "portabilidad",
  };

  return mapa[key] || key;
};

const normalizarPesosFrontend = (pesos = {}) => {
  const normalizados = {};

  Object.entries(pesos).forEach(([componente, peso]) => {
    normalizados[normalizarComponente(componente)] = Number(peso);
  });

  return normalizados;
};

const formatearComponente = (tipo) => {
  const nombres = {
    cpu: "CPU",
    ram: "RAM",
    gpu: "GPU",
    almacenamiento: "Almacenamiento",
    pantalla: "Pantalla",
    bateria: "Batería",
    portabilidad: "Portabilidad",
  };

  return nombres[tipo] || tipo;
};



const PROFILES_CONFIG = [
  {
    key: "Gaming",
    icon: "Gaming",
    label: "Gaming",
    hint: "Alto rendimiento gráfico",
    pesos: { GPU: 40, CPU: 25, RAM: 20, Almacenamiento: 10, Pantalla: 5 },
    prioridades: ["GPU de alto rendimiento", "Alta frecuencia de refresco", "RAM DDR5 velocidad"],
  },
  {
    key: "Programacion",
    icon: "Code",
    label: "Programación",
    hint: "CPU y RAM prioritarios",
    pesos: { CPU: 35, RAM: 30, Almacenamiento: 20, GPU: 10, Pantalla: 5 },
    prioridades: ["CPU multinúcleo rápido", "RAM abundante (16+ GB)", "SSD NVMe veloz"],
  },
  {
    key: "Diseno",
    icon: "Design",
    label: "Diseño",
    hint: "Color preciso y GPU",
    pesos: { Pantalla: 30, GPU: 30, RAM: 25, CPU: 10, Almacenamiento: 5 },
    prioridades: ["Pantalla de alta fidelidad", "GPU para renders", "RAM para proyectos grandes"],
  },
  {
    key: "Oficina",
    icon: "Office",
    label: "Oficina",
    hint: "Eficiencia y portabilidad",
    pesos: { CPU: 30, RAM: 25, Almacenamiento: 20, Pantalla: 15, GPU: 10 },
    prioridades: ["Batería extendida", "Portabilidad ligera", "Costo-beneficio óptimo"],
  },
];

const PREFS_OPTIONS = [
  { key: "portabilidad",   label: "Portabilidad",       desc: "Peso y tamaño compacto" },
  { key: "bateria",        label: "Batería larga",      desc: "Autonomía extendida" },
  { key: "grafico",        label: "Rendimiento gráfico", desc: "GPU dedicada potente" },
  { key: "almacenamiento", label: "Gran almacenamiento", desc: "1 TB o más" },
  { key: "pantalla",       label: "Pantalla premium",   desc: "Alta resolución o color" },
  { key: "precio",         label: "Costo-beneficio",    desc: "Máximo rendimiento por MXN" },
];

const GLOSARIO = {
  CPU: {
    titulo: "CPU — Procesador",
    desc: "El cerebro del equipo. Ejecuta todas las instrucciones del sistema y las aplicaciones. Más núcleos y mayor frecuencia significan más velocidad para multitarea y compilación.",
    ejemplo: "Intel Core i7 o AMD Ryzen 7 son opciones de gama alta.",
  },
  RAM: {
    titulo: "RAM — Memoria",
    desc: "Espacio de trabajo temporal. Más RAM permite tener más programas abiertos simultáneamente sin lentitud. Para uso profesional, 16 GB es el mínimo recomendable.",
    ejemplo: "16 GB es ideal para desarrollo; 32 GB para diseño avanzado.",
  },
  GPU: {
    titulo: "GPU — Tarjeta gráfica",
    desc: "Procesa gráficos, renderizados y cargas paralelas. Esencial para gaming, diseño 3D y machine learning. Puede ser integrada (en el CPU) o dedicada (tarjeta independiente).",
    ejemplo: "NVIDIA RTX 4060 ofrece ray tracing en tiempo real.",
  },
  SSD: {
    titulo: "SSD — Almacenamiento",
    desc: "Disco de estado sólido, mucho más rápido que un HDD tradicional. Determina qué tan rápido inicia el sistema, cargan los programas y se transfieren archivos.",
    ejemplo: "NVMe es el tipo más rápido; velocidades de 3000+ MB/s.",
  },
};
/*   Rangos Minimos y Maximos */
const B_MIN = 1000;
const B_MAX = 80000;
const B_STEP = 500;

  const clampBudget = (value, min, max) => {
  const numberValue = Number(value);

  if (Number.isNaN(numberValue)) return min;

  return Math.min(Math.max(numberValue, min), max);
};

/* ─────────────────────────────────────────────────────
   Main Component
───────────────────────────────────────────────────── */
export default function Recomendador() {
  /* Nav scroll */
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
  async function cargarPesosPerfiles() {
    setCargandoPesos(true);

    try {
      const res = await fetch(`${API_BASE}/perfiles/pesos`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detalle || data.mensaje || "No se pudieron cargar los pesos.");
      }

      setPesosPerfiles(data.perfiles || {});
    } catch (error) {
      console.error("Error al cargar pesos de perfiles:", error);
      setPesosPerfiles({});
    } finally {
      setCargandoPesos(false);
    }
  }

  cargarPesosPerfiles();
}, []);
  

  /* Config state */
  const [step,         setStep]         = useState(1);   // 1-3
  const [profile,      setProfile]      = useState(null);
  const [budgetMin,    setBudgetMin]     = useState(10000);
  const [budgetMax,    setBudgetMax]     = useState(30000);
  const [prefs,        setPrefs]        = useState([]);
  
  const [budgetMinInput, setBudgetMinInput] = useState(String(budgetMin));
const [budgetMaxInput, setBudgetMaxInput] = useState(String(budgetMax));
const [budgetMessage, setBudgetMessage] = useState("");

const mostrarMensajePresupuesto = (mensaje) => {
  setBudgetMessage(mensaje);

  window.clearTimeout(window.smartpcBudgetMsgTimeout);
  window.smartpcBudgetMsgTimeout = window.setTimeout(() => {
    setBudgetMessage("");
  }, 3500);
};

const normalizarPresupuesto = (valor) => {
  const limpio = String(valor).replace(/[^\d]/g, "");
  return limpio === "" ? null : Number(limpio);
};

const validarBudgetMin = () => {
  const valor = normalizarPresupuesto(budgetMinInput);

  if (valor === null) {
    setBudgetMinInput(String(budgetMin));
    return;
  }

  if (valor < B_MIN) {
    setBudgetMin(B_MIN);
    setBudgetMinInput(String(B_MIN));
    mostrarMensajePresupuesto(`El presupuesto mínimo no puede ser menor a ${formatMXN(B_MIN)}.`);
    return;
  }

  if (valor > B_MAX) {
    setBudgetMin(B_MAX);
    setBudgetMinInput(String(B_MAX));
    setBudgetMax(B_MAX);
    setBudgetMaxInput(String(B_MAX));
    mostrarMensajePresupuesto(`El presupuesto mínimo no puede superar ${formatMXN(B_MAX)}.`);
    return;
  }

  if (valor > budgetMax) {
    setBudgetMin(valor);
    setBudgetMax(valor);
    setBudgetMinInput(String(valor));
    setBudgetMaxInput(String(valor));
    mostrarMensajePresupuesto("El mínimo no puede ser mayor que el máximo. Ajustamos ambos valores.");
    return;
  }

  setBudgetMin(valor);
  setBudgetMinInput(String(valor));
};

const validarBudgetMax = () => {
  const valor = normalizarPresupuesto(budgetMaxInput);

  if (valor === null) {
    setBudgetMaxInput(String(budgetMax));
    return;
  }

  if (valor > B_MAX) {
    setBudgetMax(B_MAX);
    setBudgetMaxInput(String(B_MAX));
    mostrarMensajePresupuesto(`El presupuesto máximo no puede ser mayor a ${formatMXN(B_MAX)}.`);
    return;
  }

  if (valor < B_MIN) {
    setBudgetMax(B_MIN);
    setBudgetMaxInput(String(B_MIN));
    setBudgetMin(B_MIN);
    setBudgetMinInput(String(B_MIN));
    mostrarMensajePresupuesto(`El presupuesto máximo no puede ser menor a ${formatMXN(B_MIN)}.`);
    return;
  }

  if (valor < budgetMin) {
    setBudgetMax(valor);
    setBudgetMin(valor);
    setBudgetMaxInput(String(valor));
    setBudgetMinInput(String(valor));
    mostrarMensajePresupuesto("El máximo no puede ser menor que el mínimo. Ajustamos ambos valores.");
    return;
  }

  setBudgetMax(valor);
  setBudgetMaxInput(String(valor));
};


useEffect(() => {
  setBudgetMinInput(String(budgetMin));
}, [budgetMin]);

useEffect(() => {
  setBudgetMaxInput(String(budgetMax));
}, [budgetMax]);

  /* Results state */
  const [state,        setState]        = useState("idle");   // idle | loading | results | empty
  const [results,      setResults]      = useState([]);
  const [compareList,  setCompareList]  = useState([]);
  const [compareOpen,  setCompareOpen]  = useState(false);
  const [detailEquip,  setDetailEquip]  = useState(null);
  const [tooltip,      setTooltip]      = useState(null);
  const [pesosPerfiles, setPesosPerfiles] = useState({});
  const [cargandoPesos, setCargandoPesos] = useState(false);

  const resultsRef = useRef(null);

  /* Budget slider logic */
  const minPct = ((budgetMin - B_MIN) / (B_MAX - B_MIN)) * 100;
  const maxPct = ((budgetMax - B_MIN) / (B_MAX - B_MIN)) * 100;

  const handleMinSlider = (e) => {
    const v = Math.min(Number(e.target.value), budgetMax - 2000);
    setBudgetMin(v);
  };
  const handleMaxSlider = (e) => {
    const v = Math.max(Number(e.target.value), budgetMin + 2000);
    setBudgetMax(v);
  };

  /* Prefs toggle */
  const togglePref = (key) =>
    setPrefs((p) => p.includes(key) ? p.filter((k) => k !== key) : [...p, key]);

  /* Generate */
  const generate = async () => {
  if (!profile) return;

  setState("loading");
  setResults([]);

  try {
    const response = await fetch("http://localhost:3001/api/recomendaciones", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        perfil: profile,
        presupuestoMin: budgetMin,
        presupuestoMax: budgetMax,
        preferencias: prefs,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Error del backend:", data);
      setState("empty");
      return;
    }

    if (!data.ranking || data.ranking.length === 0) {
      setState("empty");
      return;
    }

    setResults(data.ranking);
    setState("results");

    setTimeout(() => {
      resultsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 80);
  } catch (error) {
    console.error("Error al conectar con el backend:", error);
    setState("empty");
  }
};

  /* Compare */
  const toggleCompare = (equip) => {
    setCompareList((prev) => {
      if (prev.find((e) => e.id === equip.id)) return prev.filter((e) => e.id !== equip.id);
      if (prev.length >= 3) return prev; // silently ignore
      return [...prev, equip];
    });
  };
  const inCompare = (id) => compareList.some((e) => e.id === id);
  const compareBlocked = (id) => compareList.length >= 3 && !inCompare(id);

  const toNumberOrNull = (value) => {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
};

const extraerGB = (texto = "") => {
  const match = String(texto).match(/(\d+(?:\.\d+)?)\s*(TB|GB)/i);

  if (!match) return null;

  const valor = Number(match[1]);
  const unidad = match[2].toUpperCase();

  if (!Number.isFinite(valor)) return null;

  return unidad === "TB" ? valor * 1024 : valor;
};

const obtenerGanadorUnico = (items, extractor, modo = "max") => {
  const valores = items.map((item, index) => ({
    index,
    valor: extractor(item),
  }));

  const validos = valores.filter(
    (item) =>
      item.valor !== null &&
      item.valor !== undefined &&
      Number.isFinite(Number(item.valor))
  );

  if (validos.length < 2) return null;

  const valoresNumericos = validos.map((item) => Number(item.valor));

  const valorGanador =
    modo === "min"
      ? Math.min(...valoresNumericos)
      : Math.max(...valoresNumericos);

  const ganadores = validos.filter(
    (item) => Number(item.valor) === valorGanador
  );

  // Si hay empate, no se pinta ninguno
  if (ganadores.length !== 1) return null;

  return ganadores[0].index;
};

const obtenerValorComparacion = (equipo, key) => {
  switch (key) {
    case "precio":
      return toNumberOrNull(equipo.precio);

    case "finalScore":
      return toNumberOrNull(equipo.finalScore);

    case "cpu":
      return toNumberOrNull(equipo.detalles?.cpu?.score);

    case "ram":
      return (
        toNumberOrNull(equipo.detalles?.ram?.capacidadGB) ??
        extraerGB(equipo.ram)
      );

    case "gpu":
      return toNumberOrNull(equipo.detalles?.gpu?.score);

    case "almacenamiento":
      return (
        toNumberOrNull(equipo.detalles?.almacenamiento?.capacidadGB) ??
        extraerGB(equipo.almacenamiento)
      );

    case "pantalla":
      return toNumberOrNull(equipo.detalles?.pantalla?.score);

    default:
      return null;
  }
};

  /* Profile config object */
  /* Profile config object */
const profileCfg = PROFILES_CONFIG.find((p) => p.key === profile);

const perfilKey = normalizarNombrePerfil(profile || "");
const pesosDesdeBD = pesosPerfiles[perfilKey]?.pesos;
const pesosFallback = normalizarPesosFrontend(profileCfg?.pesos || {});

const pesosActuales =
  pesosDesdeBD && Object.keys(pesosDesdeBD).length > 0
    ? pesosDesdeBD
    : pesosFallback;

const pesosOrdenados = Object.entries(pesosActuales)
  .filter(([, peso]) => Number(peso) > 0)
  .sort((a, b) => Number(b[1]) - Number(a[1]));

  /* ── Render ── */
  return (
    <div className="rec-root">

      {/* ══════════════════
          NAVBAR
      ══════════════════ */}
      <nav className={`rec-nav${scrolled ? " rec-nav--scrolled" : ""}`}>
        <div className="rec-nav__inner">
          <a href="#" className="nav__logo">
            <img
              src="/logo_only.svg"
              alt="SmartPC"
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
            <span className="nav__logo-text">Smart<em>PC</em></span>
          </a>

          <ul className="rec-nav__links">
            {[
              { label: "Inicio",        to: "/" },
              { label: "Recomendador",  to: "/recomendador" },
              { label: "Glosario técnico",      to: "/glosario" },
            ].map((l) => (
              <li key={l.label}>
                {l.to.startsWith("/") && !l.to.startsWith("/#") ? (
                  <Link to={l.to} className={l.to === "/recomendador" ? "rec-nav__link--active" : ""}>{l.label}</Link>
                ) : (
                  <a href={l.to}>{l.label}</a>
                )}
              </li>
            ))}
          </ul>

          <div className="rec-nav__right">
            <Link to="/" className="rec-nav__back">
              <Icon.ArrowLeft /> Volver al inicio
            </Link>
          </div>
        </div>
      </nav>

      {/* ══════════════════
          HERO SOBRIO
      ══════════════════ */}
      <section className="rec-hero" id="rec-hero">
        <div className="rec-hero__bg-grid" />
        <div className="rec-hero__content">
          <div className="rec-hero__tag">
            <Icon.Sparkle />
            Recomendador inteligente
          </div>
          <h1 className="rec-hero__title">
            Encuentra tu<br /><em>computadora ideal</em>
          </h1>
          <p className="rec-hero__sub">
            El sistema analiza tu perfil de uso, presupuesto y preferencias
            para generar un ranking personalizado de equipos.
          </p>
        </div>
      </section>

      {/* ══════════════════
          MAIN LAYOUT — 2 cols
      ══════════════════ */}
      <section className="rec-main" >

        {/* ── LEFT: Config panel ── */}
        <div className="rec-config">

          {/* Progress */}
          <div className="rec-progress">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className={`rec-progress__step${step === n ? " active" : ""}${step > n ? " done" : ""}`}
                onClick={() => n < step && setStep(n)}
              >
                <div className="rec-progress__dot">
                  {step > n ? <Icon.Check /> : n}
                </div>
                <span>{["Perfil de uso", "Presupuesto", "Preferencias"][n - 1]}</span>
              </div>
            ))}
            <div className="rec-progress__track">
              <div className="rec-progress__fill" style={{ width: `${((step - 1) / 2) * 100}%` }} />
            </div>
          </div>

          {/* Step 1 — Profile */}
          {step === 1 && (
            <div className="rec-step rec-step--profile">
              <div className="rec-step__header">
                <div className="rec-step__num">01</div>
                <div>
                  <div className="rec-step__title">Perfil de uso</div>
                  <div className="rec-step__sub">¿Para qué usarás principalmente el equipo?</div>
                </div>
              </div>
              <div className="rec-profile-grid">
                {PROFILES_CONFIG.map((p) => {
                  const Ic = Icon[p.icon];
                  return (
                    <button
                      key={p.key}
                      className={`rec-profile-card${profile === p.key ? " selected" : ""}`}
                      onClick={() => setProfile(p.key)}
                    >
                      <div className="rec-profile-card__icon">{Ic && <Ic />}</div>
                      <div className="rec-profile-card__label">{p.label}</div>
                      <div className="rec-profile-card__hint">{p.hint}</div>
                      {profile === p.key && (
                        <div className="rec-profile-card__check"><Icon.Check /></div>
                      )}
                    </button>
                  );
                })}
              </div>
              <button
                className={`rec-btn-primary${!profile ? " disabled" : ""}`}
                onClick={() => profile && setStep(2)}
                disabled={!profile}
              >
                Continuar <Icon.Arrow />
              </button>
            </div>
          )}

          {/* Step 2 — Budget */}
          {step === 2 && (
            <div className="rec-step">
              <div className="rec-step__header">
                <div className="rec-step__num">02</div>
                <div>
                  <div className="rec-step__title">Rango de presupuesto</div>
                  <div className="rec-step__sub">Arrastra los controles para definir tu rango</div>
                </div>
              </div>

              <div className="rec-budget">
                <div className="rec-budget__labels">
                  <div className="rec-budget__val">
                    <label className="rec-budget__val-label" htmlFor="budget-min">
                      Mínimo
                    </label>

                    <div className="rec-budget__input-wrap">
                      <span>$</span>
                      <input
                          id="budget-min"
                          className="rec-budget__input-number"
                          type="text"
                          inputMode="numeric"
                          value={budgetMinInput}
                          onChange={(e) => {
                            const value = e.target.value.replace(/[^\d]/g, "");
                            setBudgetMinInput(value);
                          }}
                          onBlur={validarBudgetMin}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.currentTarget.blur();
                            }
                          }}
                        />
                    </div>
                  </div>
                  <div className="rec-budget__sep">—</div>
                  <div className="rec-budget__val">
                    <label className="rec-budget__val-label" htmlFor="budget-max">
                      Máximo
                    </label>

                    <div className="rec-budget__input-wrap">
                      <span>$</span>
                      <input
                        id="budget-max"
                        className="rec-budget__input-number"
                        type="text"
                        inputMode="numeric"
                        value={budgetMaxInput}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^\d]/g, "");
                          setBudgetMaxInput(value);
                        }}
                        onBlur={validarBudgetMax}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.currentTarget.blur();
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
                {budgetMessage && (
                  <div className="rec-budget__message">
                    {budgetMessage}
                  </div>
                )}
                <div className="rec-budget__slider-wrap">
                  <div className="rec-budget__track">
                    <div
                      className="rec-budget__range"
                      style={{ left: `${minPct}%`, width: `${maxPct - minPct}%` }}
                    />
                  </div>
                  <input
                    type="range"
                    min={B_MIN} max={B_MAX} step={B_STEP}
                    value={budgetMin}
                    onChange={handleMinSlider}
                    className="rec-budget__input rec-budget__input--min"
                  />
                  <input
                    type="range"
                    min={B_MIN} max={B_MAX} step={B_STEP}
                    value={budgetMax}
                    onChange={handleMaxSlider}
                    className="rec-budget__input rec-budget__input--max"
                  />
                </div>

                <div className="rec-budget__extremes">
                  <span>{formatMXN(B_MIN)}</span>
                  <span>{formatMXN(B_MAX)}</span>
                </div>
              </div>

              <div className="rec-step__nav">
                <button className="rec-btn-ghost" onClick={() => setStep(1)}>
                  <Icon.ArrowLeft /> Atrás
                </button>
                <button className="rec-btn-primary" onClick={() => setStep(3)}>
                  Continuar <Icon.Arrow />
                </button>
              </div>
            </div>
          )}

          {/* Step 3 — Prefs */}
          {step === 3 && (
            <div className="rec-step">
              <div className="rec-step__header">
                <div className="rec-step__num">03</div>
                <div>
                  <div className="rec-step__title">Preferencias adicionales</div>
                  <div className="rec-step__sub">Opcional — selecciona lo que más valoras</div>
                </div>
              </div>

              <div className="rec-prefs-grid">
                {PREFS_OPTIONS.map((pref) => (
                  <button
                    key={pref.key}
                    className={`rec-pref-chip${prefs.includes(pref.key) ? " selected" : ""}`}
                    onClick={() => togglePref(pref.key)}
                  >
                    {prefs.includes(pref.key) && <span className="rec-pref-chip__check"><Icon.Check /></span>}
                    <span className="rec-pref-chip__label">{pref.label}</span>
                    <span className="rec-pref-chip__desc">{pref.desc}</span>
                  </button>
                ))}
              </div>

              <div className="rec-step__nav">
                <button className="rec-btn-ghost" onClick={() => setStep(2)}>
                  <Icon.ArrowLeft /> Atrás
                </button>
                <button
                  className={`rec-btn-primary rec-btn-primary--generate${state === "loading" ? " loading" : ""}`}
                  onClick={generate}
                  disabled={state === "loading"}
                >
                  {state === "loading" ? (
                    <><span className="rec-spin"><Icon.Loader /></span> Analizando...</>
                  ) : (
                    <>Generar recomendación <Icon.Sparkle /></>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── RIGHT: Summary panel ── */}
        <div className="rec-summary">
          <div className="rec-summary__header">Resumen de configuración</div>

          <div className="rec-summary__block">
            <div className="rec-summary__label">Perfil seleccionado</div>
            {profile ? (
            <div className="rec-summary__profile-badge">
              {(() => { const Ic = Icon[PROFILES_CONFIG.find(p=>p.key===profile)?.icon]; return Ic && <Ic />; })()}
                <span>{profileCfg?.label || profile}</span>
            </div>
            ) : (
              <div className="rec-summary__empty">Sin seleccionar</div>
              )}
          </div>

          <div className="rec-summary__block">
            <div className="rec-summary__label">Presupuesto</div>
            {budgetMin && budgetMax ? (
              <div className="rec-summary__budget-range">
                <span>{formatMXN(budgetMin)}</span>
                <span className="rec-summary__budget-sep">–</span>
                <span>{formatMXN(budgetMax)}</span>
              </div>
            ) : (
              <div className="rec-summary__empty">Sin definir</div>
            )}
          </div>

          {profileCfg && (
            <div className="rec-summary__block">
              <div className="rec-summary__label">Prioridades del perfil</div>
              <ul className="rec-summary__prios">
                {profileCfg.prioridades.map((p) => (
                  <li key={p}>
                    <span className="rec-summary__prio-dot" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {prefs.length > 0 && (
            <div className="rec-summary__block">
              <div className="rec-summary__label">Preferencias</div>
              <div className="rec-summary__chips">
                {prefs.map((k) => (
                  <span key={k} className="rec-summary__chip">
                    {PREFS_OPTIONS.find(p=>p.key===k)?.label}
                  </span>
                ))}
              </div>
            </div>
          )}

         {profileCfg && (
            <div className="rec-summary__pesos-block">
              <div className="rec-summary__label">Ponderación de componentes</div>

              {cargandoPesos && (
                <div className="rec-summary__empty">
                  Cargando pesos del perfil...
                </div>
              )}

              {!cargandoPesos && pesosOrdenados.length > 0 && (
                <>
                  {pesosOrdenados.map(([comp, pct]) => (
                    <div className="rec-summary__peso-row" key={comp}>
                      <span className="rec-summary__peso-label">
                        {formatearComponente(comp)}
                      </span>

                      <div className="rec-summary__peso-bar-wrap">
                        <div
                          className="rec-summary__peso-bar"
                          style={{ width: `${Number(pct)}%` }}
                        />
                      </div>

                      <span className="rec-summary__peso-pct">
                        {Number(pct)}%
                      </span>
                    </div>
                  ))}
                </>
              )}

              {!cargandoPesos && pesosOrdenados.length === 0 && (
                <div className="rec-summary__empty">
                  No hay ponderaciones disponibles para este perfil.
                </div>
              )}
            </div>
          )}

          {!profileCfg && (
            <div className="rec-summary__idle">
              <Icon.Info />
              <p>Selecciona un perfil para ver cómo se ponderan los componentes según tu uso.</p>
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════
          RESULTS
      ══════════════════ */}
      <div ref={resultsRef} id="resultados">

        {/* Loading */}
        {state === "loading" && (
          <section className="rec-loading">
            <div className="rec-loading__spinner"><Icon.Loader /></div>
            <div className="rec-loading__text">Analizando especificaciones y ponderando componentes…</div>
          </section>
        )}

        {/* Empty */}
        {state === "empty" && (
          <section className="rec-empty">
            <div className="rec-empty__icon"><Icon.Info /></div>
            <div className="rec-empty__title">Sin resultados en tu presupuesto</div>
            <p className="rec-empty__desc">
              No encontramos equipos en el rango {formatMXN(budgetMin)} – {formatMXN(budgetMax)}.
              Intenta ampliar tu presupuesto o ajustar preferencias.
            </p>
            <button className="rec-btn-ghost" onClick={() => { setState("idle"); setStep(2); }}>
              <Icon.ArrowLeft /> Ajustar presupuesto
            </button>
          </section>
        )}

        {/* Results */}
        {state === "results" && results.length > 0 && (
          <section className="rec-results">
            <div className="rec-results__header">
              <div className="rec-results__eyebrow">Análisis completado</div>
              <h2 className="rec-results__title">Recomendaciones para ti</h2>
              <p className="rec-results__sub">
                {results.length} equipo{results.length > 1 ? "s" : ""} dentro de tu presupuesto,
                ordenados por compatibilidad con tu perfil <strong>{profileCfg?.label || profile}</strong>.
              </p>
            </div>

            {/* Best pick */}
            <div className="rec-best">
              <div className="rec-best__badge">
                <Icon.Star /> Mejor opción
              </div>
              <div className="rec-best__body">
                <div className="rec-best__left">
                  <div className="rec-best__name">{results[0].nombre}</div>
                  <div className="rec-best__price">{formatMXN(results[0].precio)}</div>
                  <div className="rec-best__desc">{results[0].descripcion}</div>
                  <ul className="rec-best__fortalezas">
                    {results[0].fortalezas.map((f) => (
                      <li key={f}><Icon.Check />{f}</li>
                    ))}
                  </ul>
                  <div className="rec-best__actions">
                    <button className="rec-btn-primary" onClick={() => setDetailEquip(results[0])}>
                      Ver detalles <Icon.Arrow />
                    </button>
                    <button
                      className={`rec-btn-ghost${inCompare(results[0].id) ? " active" : ""}${compareBlocked(results[0].id) ? " blocked" : ""}`}
                      onClick={() => !compareBlocked(results[0].id) && toggleCompare(results[0])}
                      title={compareBlocked(results[0].id) ? "Máximo 3 equipos en comparación" : ""}
                    >
                      <Icon.Compare />
                      {inCompare(results[0].id) ? "En comparación" : "Comparar"}
                    </button>
                    <a
                      className="rec-btn-ghost"
                      href={results[0].linkTienda}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon.External /> Ver tienda
                    </a>
                  </div>
                </div>
                <div className="rec-best__right">
                  <div className="rec-best__score-ring">
                    <svg viewBox="0 0 80 80">
                      <circle cx="40" cy="40" r="34" fill="none" stroke="var(--c-teal-10)" strokeWidth="6"/>
                      <circle
                        cx="40" cy="40" r="34" fill="none"
                        stroke="var(--c-teal)" strokeWidth="6"
                        strokeDasharray={`${(results[0].finalScore / 100) * 213.6} 213.6`}
                        strokeLinecap="round"
                        transform="rotate(-90 40 40)"
                      />
                    </svg>
                    <div className="rec-best__score-val">{results[0].finalScore}</div>
                    <div className="rec-best__score-label">score</div>
                  </div>
                  <div className="rec-best__specs">
                    {[
                      { icon: "Cpu",     val: results[0].cpu },
                      { icon: "Ram",     val: results[0].ram },
                      { icon: "Gpu",     val: results[0].gpu },
                      { icon: "Storage", val: results[0].almacenamiento },
                      { icon: "Screen",  val: results[0].pantalla },
                    ].map(({ icon, val }) => {
                      const Ic = Icon[icon];
                      return (
                        <div className="rec-best__spec-row" key={icon}>
                          <span className="rec-best__spec-icon">{Ic && <Ic />}</span>
                          <span className="rec-best__spec-val">{val}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Ranking */}
            {results.length > 1 && (
              <div className="rec-ranking">
                <div className="rec-ranking__title">Ranking completo</div>
                <div className="rec-ranking__list">
                  {results.map((eq, idx) => (
                    <div className="rec-ranking-card" key={eq.id}>
                      <div className="rec-ranking-card__pos">#{idx + 1}</div>
                      <div className="rec-ranking-card__main">
                        <div className="rec-ranking-card__name">{eq.nombre}</div>
                        <div className="rec-ranking-card__specs-row">
                          <span>{eq.cpu}</span>
                          <span className="rec-dot"/>
                          <span>{eq.ram}</span>
                          <span className="rec-dot"/>
                          <span>{eq.gpu}</span>
                        </div>
                      </div>
                      <div className="rec-ranking-card__right">
                        <div className="rec-ranking-card__price">{formatMXN(eq.precio)}</div>
                        <div className="rec-ranking-card__score">
                          <div className="rec-score-bar">
                            <div className="rec-score-bar__fill" style={{ width: `${eq.finalScore}%` }}/>
                          </div>
                          <span>{eq.finalScore}</span>
                        </div>
                        <div className="rec-ranking-card__actions">
                          <button className="rec-btn-xs" onClick={() => setDetailEquip(eq)}>
                            Detalles
                          </button>
                          <button
                            className={`rec-btn-xs rec-btn-xs--outline${inCompare(eq.id) ? " active" : ""}${compareBlocked(eq.id) ? " blocked" : ""}`}
                            onClick={() => !compareBlocked(eq.id) && toggleCompare(eq)}
                            title={compareBlocked(eq.id) ? "Máximo 3 equipos" : ""}
                          >
                            {inCompare(eq.id) ? "✓ Comparar" : "Comparar"}
                          </button>
                          <a
                            className="rec-btn-xs rec-btn-xs--outline"
                            href={eq.linkTienda}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Ver en tienda
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Compare float bar */}
            {compareList.length > 0 && (
              <div className="rec-compare-bar">
                <div className="rec-compare-bar__label">
                  <Icon.Compare />
                  Comparando {compareList.length}/3
                </div>
                <div className="rec-compare-bar__chips">
                  {compareList.map((e) => (
                    <div className="rec-compare-bar__chip" key={e.id}>
                      <span>{e.nombre}</span>
                      <button onClick={() => toggleCompare(e)}><Icon.Close /></button>
                    </div>
                  ))}
                </div>
                <div className="rec-compare-bar__actions">
                  {compareList.length >= 2 && (
                    <button
                      className="rec-btn-primary rec-btn-primary--sm"
                      onClick={() => setCompareOpen(true)}
                    >
                      Ver comparación <Icon.Arrow />
                    </button>
                  )}
                  <button className="rec-btn-ghost rec-btn-ghost--sm" onClick={() => setCompareList([])}>
                    Limpiar
                  </button>
                </div>
              </div>
            )}
          </section>
        )}
      </div>

      {/* ══════════════════
          COMPARADOR MODAL
      ══════════════════ */}
      {compareOpen && compareList.length >= 2 && (
        <div className="rec-modal-overlay" onClick={() => setCompareOpen(false)}>
          <div className="rec-modal" onClick={(e) => e.stopPropagation()}>
            <div className="rec-modal__header">
              <h3 className="rec-modal__title">Comparación de equipos</h3>
              <button className="rec-modal__close" onClick={() => setCompareOpen(false)}>
                <Icon.Close />
              </button>
            </div>
            <div className="rec-compare-table-wrap">
              <table className="rec-compare-table">
                <thead>
                  <tr>
                    <th className="rec-compare-table__attr">Especificación</th>
                    {compareList.map((e) => (
                      <th key={e.id}>{e.nombre}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                {[
                  {
                    label: "Precio",
                    key: "precio",
                    modo: "min",
                    fmt: (v) => formatMXN(v),
                  },
                  {
                    label: "Score",
                    key: "finalScore",
                    modo: "max",
                    fmt: (v) => `${v} / 100`,
                  },
                  {
                    label: "CPU",
                    key: "cpu",
                    modo: "max",
                  },
                  {
                    label: "RAM",
                    key: "ram",
                    modo: "max",
                  },
                  {
                    label: "GPU",
                    key: "gpu",
                    modo: "max",
                  },
                  {
                    label: "Almacenamiento",
                    key: "almacenamiento",
                    modo: "max",
                  },
                  {
                    label: "Pantalla",
                    key: "pantalla",
                    modo: "max",
                  },
                ].map((row) => {
                  const ganadorIndex = obtenerGanadorUnico(
                    compareList,
                    (equipo) => obtenerValorComparacion(equipo, row.key),
                    row.modo
                  );

                  return (
                    <tr key={row.key}>
                      <td className="rec-compare-table__attr">{row.label}</td>

                      {compareList.map((equipo, index) => {
                        const esMejor = ganadorIndex === index;

                        return (
                          <td
                            key={equipo.id}
                            className={esMejor ? "rec-compare-table__best" : ""}
                          >
                            {row.fmt ? row.fmt(equipo[row.key]) : equipo[row.key]}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
              </table>
            </div>
            <div className="rec-modal__footer">
              <button className="rec-btn-ghost" onClick={() => setCompareOpen(false)}>Cerrar</button>
              <button className="rec-btn-ghost rec-btn-ghost--danger" onClick={() => { setCompareList([]); setCompareOpen(false); }}>
                Limpiar comparación
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════
          DETALLE MODAL
      ══════════════════ */}
      {detailEquip && (
  <div className="rec-modal-overlay" onClick={() => setDetailEquip(null)}>
    <div className="rec-modal rec-modal--detail" onClick={(e) => e.stopPropagation()}>
      <div className="rec-modal__header">
        <div>
          <h3 className="rec-modal__title">{detailEquip.nombre}</h3>
          <div className="rec-modal__price">{formatMXN(detailEquip.precio)}</div>
        </div>
        <button className="rec-modal__close" onClick={() => setDetailEquip(null)}>
          <Icon.Close />
        </button>
      </div>

      <div className="rec-detail-body">
        {/* Specs */}
        <div className="rec-detail-specs">
          <div className="rec-detail-specs__title">Especificaciones</div>
          <div className="rec-detail-specs__grid">
            {[
              { icon: "Cpu",     label: "Procesador",      val: detailEquip.cpu,             glosKey: "CPU" },
              { icon: "Ram",     label: "Memoria RAM",     val: detailEquip.ram,             glosKey: "RAM" },
              { icon: "Gpu",     label: "Tarjeta gráfica", val: detailEquip.gpu,             glosKey: "GPU" },
              { icon: "Storage", label: "Almacenamiento",  val: detailEquip.almacenamiento,  glosKey: "SSD" },
              { icon: "Screen",  label: "Pantalla",        val: detailEquip.pantalla,        glosKey: null },
            ].map(({ icon, label, val, glosKey }) => {
              const Ic = Icon[icon];
              return (
                <div className="rec-detail-spec-card" key={label}>
                  <div className="rec-detail-spec-card__icon">{Ic && <Ic />}</div>
                  <div className="rec-detail-spec-card__info">
                    <div className="rec-detail-spec-card__label">
                      {label}
                      {glosKey && (
                        <button
                          className="rec-tooltip-trigger"
                          onMouseEnter={() => setTooltip(glosKey)}
                          onMouseLeave={() => setTooltip(null)}
                        >
                          <Icon.Info />
                        </button>
                      )}
                    </div>

                    <div className="rec-detail-spec-card__val">{val}</div>

                    {tooltip === glosKey && glosKey && (
                      <div className="rec-tooltip">
                        <div className="rec-tooltip__title">{GLOSARIO[glosKey].titulo}</div>
                        <div className="rec-tooltip__desc">{GLOSARIO[glosKey].desc}</div>
                        <div className="rec-tooltip__ej">Ej: {GLOSARIO[glosKey].ejemplo}</div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Análisis SmartPC */}
        <div className="rec-detail-analysis">
          <div className="rec-detail-analysis__title">Análisis SmartPC</div>
          <p className="rec-detail-analysis__text">
            {generarAnalisisEquipo(detailEquip)}
          </p>
        </div>

        {/* Puntos personalizados */}
        <div className="rec-detail-insights">
          <div className="rec-detail-insights__group">
            <div className="rec-detail-insights__title">Puntos destacados</div>

            <ul className="rec-detail-list rec-detail-list--positive">
              {generarPuntosDestacados(detailEquip).map((punto) => (
                <li key={punto}>
                  <Icon.Check />
                  <span>{punto}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rec-detail-insights__group">
            <div className="rec-detail-insights__title">Puntos a considerar</div>

            <ul className="rec-detail-list rec-detail-list--warning">
              {generarPuntosConsiderar(detailEquip).map((punto) => (
                <li key={punto}>
                  <Icon.Info />
                  <span>{punto}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Acceso al glosario */}
        <div className="rec-detail-glossary-link">
          <div>
            <strong>¿No entiendes algún componente?</strong>
            <p>
              Consulta el glosario técnico para conocer qué significa CPU, GPU, RAM,
              SSD, resolución, frecuencia de pantalla y otros conceptos importantes.
            </p>
          </div>

          <Link to="/glosario" className="rec-detail-glossary-link__btn">
            Ver glosario técnico
          </Link>
        </div>
      </div>

      <div className="rec-modal__footer">
        <button className="rec-btn-ghost" onClick={() => setDetailEquip(null)}>
          Cerrar
        </button>

        <a
          className="rec-btn-primary"
          href={detailEquip.linkTienda}
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver en tienda <Icon.External />
        </a>
      </div>
    </div>
  </div>
)}

      {/* ══════════════════
          FOOTER
      ══════════════════ */}
      <footer className="footer">
        <div className="footer__inner">
          <div className="footer__top">
            <div className="footer__brand">
              <div className="footer__logo">
                <img
                  src="/logo.svg"
                  alt="SmartPC"
                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                />
                <span className="footer__logo-text">Smart<em>PC</em></span>
              </div>
              <p className="footer__tagline">
                Tu asesor de cómputo inteligente.<br />
                Recomendaciones personalizadas,<br />resultados precisos.
              </p>
            </div>
            <div className="footer__cols">
              <div className="footer__col">
                <div className="footer__col-title">Plataforma</div>
                <div className="footer__col-links">
                  <Link to="/">Inicio</Link>
                  <a href="#rec-hero">Recomendador</a>
                  <Link to="/glosario">Glosario técnico</Link>
                </div>
              </div>
              
            </div>
          </div>
          <div className="footer__divider" />
          <div className="footer__bottom">
            <span className="footer__copy">© {new Date().getFullYear()} SmartPC. Todos los derechos reservados.</span>
            <div className="footer__legal">
              <Link to="/aviso-privacidad">Aviso de privacidad</Link>
              <span className="footer__legal-sep" />
              <Link to="/terminos-uso">Términos de uso</Link>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

/* ─── GlosarioItem accordion ── */
function GlosarioItem({ g }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`rec-glos-item${open ? " open" : ""}`}>
      <button className="rec-glos-item__trigger" onClick={() => setOpen(!open)}>
        <span>{g.titulo}</span>
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="rec-glos-item__chevron">
          <path d="M4 6l4 4 4-4"/>
        </svg>
      </button>
      {open && (
        <div className="rec-glos-item__body">
          <p>{g.desc}</p>
          <div className="rec-glos-item__ej">Ejemplo: {g.ejemplo}</div>
        </div>
      )}
    </div>
  );
}

/* ─── Funciones de Análisis de equipos ── */

function generarAnalisisEquipo(equipo) {
  const cpu = equipo.detalles?.cpu;
  const gpu = equipo.detalles?.gpu;
  const ram = equipo.detalles?.ram;
  const almacenamiento = equipo.detalles?.almacenamiento;
  const pantalla = equipo.detalles?.pantalla;

  const cpuModelo = cpu?.modelo || equipo.cpu || "procesador no especificado";
  const gpuModelo = gpu?.modelo || equipo.gpu || "gráficos no especificados";
  const ramGB = ram?.capacidadGB;
  const almacenamientoGB = almacenamiento?.capacidadGB;
  const pantallaTexto = equipo.pantalla || "pantalla no especificada";

  const partes = [];

  // CPU + GPU como lectura principal
  if ((gpu?.score || 0) >= 85 && (cpu?.score || 0) >= 80) {
    partes.push(
      `Este equipo destaca por la combinación de ${cpuModelo} con ${gpuModelo}, lo que lo hace una opción fuerte para gaming, diseño, renderizado y tareas gráficas exigentes`
    );
  } else if ((gpu?.score || 0) >= 75) {
    partes.push(
      `Su ${gpuModelo} le da una ventaja clara en tareas gráficas, juegos y software que aprovecha aceleración por GPU`
    );
  } else if ((cpu?.score || 0) >= 80) {
    partes.push(
      `Su ${cpuModelo} es uno de sus puntos más fuertes, ideal para multitarea, programación, edición ligera y trabajo exigente`
    );
  } else {
    partes.push(
      `Este equipo ofrece una configuración equilibrada para uso general, estudio, oficina y tareas cotidianas`
    );
  }

  // RAM
  if (ramGB >= 32) {
    partes.push(
      `Sus ${ramGB} GB de RAM son una ventaja importante para multitarea pesada, proyectos grandes, edición y trabajo creativo`
    );
  } else if (ramGB >= 16) {
    partes.push(
      `Sus ${ramGB} GB de RAM son adecuados para la mayoría de usos actuales, incluyendo multitarea, gaming y productividad`
    );
  } else if (ramGB) {
    partes.push(
      `Sus ${ramGB} GB de RAM son suficientes para tareas básicas, aunque pueden quedarse cortos para multitarea pesada o software exigente`
    );
  }

  // Almacenamiento
  if (almacenamientoGB >= 1024) {
    partes.push(
      `El almacenamiento de 1 TB permite guardar más juegos, programas y archivos pesados sin depender tan pronto de una expansión`
    );
  } else if (almacenamientoGB >= 512) {
    partes.push(
      `El SSD de 512 GB es rápido y funcional, aunque puede quedarse corto si instalas muchos juegos o manejas archivos grandes`
    );
  }

  // Pantalla
  if ((pantalla?.score || 0) >= 80) {
    partes.push(
      `Su pantalla (${pantallaTexto}) es mejor que el promedio del catálogo y aporta más comodidad visual`
    );
  } else if (pantallaTexto && pantallaTexto.includes("60 Hz")) {
    partes.push(
      `Su pantalla (${pantallaTexto}) cumple para uso general, aunque no destaca especialmente para gaming competitivo`
    );
  }

  return `${partes.join(". ")}.`;
}

/*   Puntos Destacados   */

function generarPuntosDestacados(equipo) {
  const puntos = [];

  const cpu = equipo.detalles?.cpu;
  const gpu = equipo.detalles?.gpu;
  const ram = equipo.detalles?.ram;
  const almacenamiento = equipo.detalles?.almacenamiento;
  const pantalla = equipo.detalles?.pantalla;

  if ((gpu?.score || 0) >= 85) {
    puntos.push(`${gpu.modelo} ofrece rendimiento gráfico alto para gaming, diseño o renderizado.`);
  } else if ((gpu?.score || 0) >= 75) {
    puntos.push(`${gpu.modelo} es una GPU dedicada competente para juegos y tareas gráficas.`);
  }

  if ((cpu?.score || 0) >= 85) {
    puntos.push(`${cpu.modelo} aporta buen rendimiento para cargas pesadas y multitarea.`);
  } else if ((cpu?.score || 0) >= 75) {
    puntos.push(`${cpu.modelo} ofrece rendimiento sólido para uso diario, estudio y productividad.`);
  }

  if ((ram?.capacidadGB || 0) >= 32) {
    puntos.push(`${ram.capacidadGB} GB de RAM ayudan mucho en multitarea avanzada y proyectos grandes.`);
  } else if ((ram?.capacidadGB || 0) >= 16) {
    puntos.push(`${ram.capacidadGB} GB de RAM son adecuados para la mayoría de usuarios actuales.`);
  }

  if ((almacenamiento?.capacidadGB || 0) >= 1024) {
    puntos.push(`1 TB de almacenamiento permite instalar más programas, juegos y guardar archivos pesados.`);
  }

  if ((pantalla?.score || 0) >= 80) {
    puntos.push(`La pantalla tiene mejor resolución/calidad que otras opciones del catálogo.`);
  }

  if (puntos.length === 0) {
    puntos.push("Configuración suficiente para tareas generales y uso cotidiano.");
  }

  return puntos;
}


/*   Puntos a considerar   */

function generarPuntosConsiderar(equipo) {
  const puntos = [];

  const gpu = equipo.detalles?.gpu;
  const ram = equipo.detalles?.ram;
  const almacenamiento = equipo.detalles?.almacenamiento;
  const pantalla = equipo.detalles?.pantalla;

  if ((ram?.capacidadGB || 0) < 16) {
    puntos.push("La RAM puede quedarse corta para multitarea pesada, edición o juegos recientes.");
  }

  if ((almacenamiento?.capacidadGB || 0) < 1024) {
    puntos.push("El almacenamiento de 512 GB puede llenarse rápido si instalas varios juegos o trabajas con archivos grandes.");
  }

  if ((gpu?.score || 0) < 70) {
    puntos.push("No es la mejor opción para gaming exigente, renderizado avanzado o tareas gráficas pesadas.");
  }

  if ((pantalla?.hz || 60) <= 60) {
    puntos.push("La pantalla de 60 Hz cumple, pero no destaca para gaming competitivo.");
  }

  if ((pantalla?.score || 0) < 70) {
    puntos.push("La pantalla es funcional, pero no es ideal si buscas alta fidelidad visual o mucha área de trabajo.");
  }

  if (Number(equipo.precio) >= 22000) {
    puntos.push("Su precio es alto, por lo que conviene si realmente necesitas su rendimiento.");
  }

  if (puntos.length === 0) {
    puntos.push("No presenta limitaciones importantes dentro de su rango de precio.");
  }

  return puntos;
}