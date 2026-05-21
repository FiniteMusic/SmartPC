import { useState, useEffect } from "react";

// ─── SmartPC Color Palette (from logo: teal #2EC4C4, dark navy #0D1F3C) ───
const COLORS = {
  teal: "#2EC4C4",
  tealDark: "#1FA8A8",
  tealLight: "#5DDADA",
  navy: "#0D1F3C",
  navyLight: "#162D55",
  white: "#FFFFFF",
  gray: "#F4F8F9",
  grayMid: "#A0B4BE",
  text: "#1C2B3A",
};

// ─── STYLES ───
const styles = {
  root: {
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    color: COLORS.text,
    background: COLORS.white,
    overflowX: "hidden",
  },
  // NAV
  nav: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 5%",
    height: 72,
    background: "rgba(13,31,60,0.96)",
    backdropFilter: "blur(12px)",
    boxShadow: "0 2px 20px rgba(0,0,0,0.18)",
  },
  navLogo: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    textDecoration: "none",
  },
  navLogoText: {
    fontSize: 22,
    fontWeight: 800,
    color: COLORS.white,
    letterSpacing: "-0.5px",
  },
  navLogoAccent: { color: COLORS.teal },
  navLinks: {
    display: "flex",
    gap: 32,
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  navLink: {
    color: COLORS.grayMid,
    textDecoration: "none",
    fontSize: 15,
    fontWeight: 500,
    transition: "color 0.2s",
    cursor: "pointer",
  },
  navCta: {
    background: COLORS.teal,
    color: COLORS.navy,
    border: "none",
    borderRadius: 8,
    padding: "9px 22px",
    fontWeight: 700,
    fontSize: 14,
    cursor: "pointer",
    transition: "background 0.2s, transform 0.15s",
  },
  // HERO
  hero: {
    minHeight: "100vh",
    background: `linear-gradient(135deg, ${COLORS.navy} 0%, #0a2744 55%, #0e3550 100%)`,
    display: "flex",
    alignItems: "center",
    padding: "90px 5% 60px",
    position: "relative",
    overflow: "hidden",
  },
  heroGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 60,
    alignItems: "center",
    maxWidth: 1200,
    margin: "0 auto",
    width: "100%",
  },
  heroBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: "rgba(46,196,196,0.15)",
    border: `1px solid rgba(46,196,196,0.35)`,
    borderRadius: 20,
    padding: "6px 16px",
    fontSize: 13,
    color: COLORS.teal,
    fontWeight: 600,
    marginBottom: 20,
    letterSpacing: "0.3px",
  },
  heroDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: COLORS.teal,
    animation: "pulse 2s infinite",
  },
  heroTitle: {
    fontSize: "clamp(36px, 4.5vw, 60px)",
    fontWeight: 900,
    color: COLORS.white,
    lineHeight: 1.1,
    margin: "0 0 20px",
    letterSpacing: "-1.5px",
  },
  heroTitleAccent: {
    color: COLORS.teal,
    display: "block",
  },
  heroSubtitle: {
    fontSize: 17,
    color: COLORS.grayMid,
    lineHeight: 1.7,
    margin: "0 0 36px",
    maxWidth: 480,
  },
  heroActions: {
    display: "flex",
    gap: 16,
    flexWrap: "wrap",
  },
  btnPrimary: {
    background: COLORS.teal,
    color: COLORS.navy,
    border: "none",
    borderRadius: 10,
    padding: "14px 32px",
    fontWeight: 800,
    fontSize: 16,
    cursor: "pointer",
    transition: "all 0.2s",
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
  },
  btnOutline: {
    background: "transparent",
    color: COLORS.white,
    border: `2px solid rgba(255,255,255,0.25)`,
    borderRadius: 10,
    padding: "14px 32px",
    fontWeight: 700,
    fontSize: 16,
    cursor: "pointer",
    transition: "all 0.2s",
  },
  heroVisual: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  heroCard: {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(46,196,196,0.2)",
    borderRadius: 20,
    padding: 28,
    width: "100%",
    maxWidth: 440,
    backdropFilter: "blur(10px)",
  },
  heroCardTitle: {
    color: COLORS.teal,
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 16,
  },
  profileChips: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 24,
  },
  chip: (active) => ({
    padding: "8px 16px",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    border: active ? `2px solid ${COLORS.teal}` : "2px solid rgba(255,255,255,0.12)",
    background: active ? "rgba(46,196,196,0.2)" : "rgba(255,255,255,0.05)",
    color: active ? COLORS.teal : COLORS.grayMid,
    transition: "all 0.2s",
  }),
  budgetLabel: {
    color: COLORS.grayMid,
    fontSize: 13,
    marginBottom: 8,
  },
  budgetSlider: {
    width: "100%",
    accentColor: COLORS.teal,
    cursor: "pointer",
  },
  budgetDisplay: {
    color: COLORS.white,
    fontWeight: 800,
    fontSize: 22,
    marginTop: 6,
  },
  heroCardBtn: {
    marginTop: 20,
    width: "100%",
    background: COLORS.teal,
    color: COLORS.navy,
    border: "none",
    borderRadius: 10,
    padding: "13px 0",
    fontWeight: 800,
    fontSize: 15,
    cursor: "pointer",
    transition: "background 0.2s",
  },
  // SECTION SHARED
  section: (bg) => ({
    padding: "90px 5%",
    background: bg || COLORS.white,
  }),
  sectionInner: {
    maxWidth: 1200,
    margin: "0 auto",
  },
  sectionLabel: {
    color: COLORS.teal,
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 12,
  },
  sectionTitle: (light) => ({
    fontSize: "clamp(28px, 3vw, 42px)",
    fontWeight: 900,
    color: light ? COLORS.white : COLORS.navy,
    margin: "0 0 14px",
    letterSpacing: "-1px",
    lineHeight: 1.15,
  }),
  sectionDesc: (light) => ({
    fontSize: 17,
    color: light ? COLORS.grayMid : "#4A6070",
    maxWidth: 560,
    lineHeight: 1.7,
    margin: "0 0 56px",
  }),
  // FEATURES
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 28,
  },
  featureCard: {
    background: COLORS.gray,
    borderRadius: 16,
    padding: 32,
    border: "1px solid #E0EDF2",
    transition: "transform 0.2s, box-shadow 0.2s",
    cursor: "default",
  },
  featureIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    background: `linear-gradient(135deg, ${COLORS.teal}22, ${COLORS.teal}44)`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
    marginBottom: 18,
    border: `1px solid ${COLORS.teal}33`,
  },
  featureTitle: {
    fontWeight: 800,
    fontSize: 18,
    color: COLORS.navy,
    marginBottom: 10,
  },
  featureDesc: {
    color: "#5C7A8A",
    fontSize: 15,
    lineHeight: 1.65,
  },
  // HOW IT WORKS
  stepsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: 0,
    position: "relative",
  },
  stepItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: "0 20px",
    position: "relative",
  },
  stepNumber: {
    width: 56,
    height: 56,
    borderRadius: "50%",
    background: COLORS.teal,
    color: COLORS.navy,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 900,
    fontSize: 22,
    marginBottom: 18,
    boxShadow: `0 0 0 8px rgba(46,196,196,0.15)`,
    position: "relative",
    zIndex: 1,
  },
  stepTitle: {
    fontWeight: 800,
    fontSize: 17,
    color: COLORS.white,
    marginBottom: 10,
  },
  stepDesc: {
    color: COLORS.grayMid,
    fontSize: 14,
    lineHeight: 1.6,
  },
  stepLine: {
    position: "absolute",
    top: 28,
    left: "50%",
    right: "-50%",
    height: 2,
    background: `linear-gradient(to right, ${COLORS.teal}, rgba(46,196,196,0.1))`,
    zIndex: 0,
  },
  // PERFILES
  profilesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
    gap: 24,
  },
  profileCard: (active) => ({
    borderRadius: 16,
    padding: 28,
    border: active ? `2px solid ${COLORS.teal}` : "2px solid #E0EDF2",
    background: active ? `linear-gradient(135deg, ${COLORS.teal}18, ${COLORS.teal}05)` : COLORS.white,
    cursor: "pointer",
    transition: "all 0.25s",
    textAlign: "center",
    boxShadow: active ? `0 8px 32px ${COLORS.teal}22` : "none",
  }),
  profileEmoji: {
    fontSize: 40,
    marginBottom: 14,
    display: "block",
  },
  profileName: (active) => ({
    fontWeight: 800,
    fontSize: 18,
    color: active ? COLORS.navy : COLORS.navy,
    marginBottom: 8,
  }),
  profileDesc: {
    fontSize: 14,
    color: "#5C7A8A",
    lineHeight: 1.55,
  },
  // CTA BANNER
  ctaBanner: {
    background: `linear-gradient(135deg, ${COLORS.navy} 0%, #0a2744 60%, ${COLORS.tealDark} 100%)`,
    borderRadius: 24,
    padding: "60px 48px",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
    margin: "0 5% 80px",
    boxShadow: `0 20px 60px rgba(13,31,60,0.3)`,
  },
  // FOOTER
  footer: {
    background: COLORS.navy,
    padding: "48px 5% 28px",
    color: COLORS.grayMid,
  },
  footerInner: {
    maxWidth: 1200,
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 20,
    borderTop: "1px solid rgba(255,255,255,0.08)",
    paddingTop: 28,
  },
  footerLogo: {
    fontSize: 20,
    fontWeight: 800,
    color: COLORS.white,
  },
  footerText: { fontSize: 13, color: COLORS.grayMid },
  footerLinks: {
    display: "flex",
    gap: 20,
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  footerLink: { color: COLORS.grayMid, fontSize: 13, cursor: "pointer" },
};

// ─── DATA ───
const features = [
  { icon: "🎯", title: "Recomendación Personalizada", desc: "Nuestro motor evalúa procesador, RAM, almacenamiento y GPU para entregarte el equipo ideal según tu perfil." },
  { icon: "💰", title: "Filtro por Presupuesto", desc: "Establece tu rango de inversión y solo verás opciones que realmente puedas adquirir." },
  { icon: "⚖️", title: "Comparador Visual", desc: "Analiza múltiples equipos lado a lado con sus especificaciones en formato claro y visual." },
  { icon: "📖", title: "Glosario Técnico", desc: "Entende qué es RAM, GPU o SSD con explicaciones simples. Sin jerga, sin confusión." },
  { icon: "🏆", title: "Ranking Inteligente", desc: "Los equipos se ordenan por ajuste a tus necesidades, destacando siempre la mejor opción." },
  { icon: "🛒", title: "Acceso Directo a Tiendas", desc: "Enlaces directos a plataformas de venta para que puedas comprar en minutos." },
];

const steps = [
  { n: "1", title: "Define tu perfil", desc: "Cuéntanos para qué usarás tu computadora: gaming, programación, diseño u oficina." },
  { n: "2", title: "Ingresa tu presupuesto", desc: "Establece el rango de precio que tienes disponible." },
  { n: "3", title: "Obtén tu ranking", desc: "El sistema genera una lista ordenada de los mejores equipos para ti." },
  { n: "4", title: "Compara y decide", desc: "Usa el comparador visual y compra directamente desde la plataforma." },
];

const profiles = [
  { emoji: "🎮", name: "Gaming", desc: "Alta GPU, procesadores de alto rendimiento y refrigeración eficiente." },
  { emoji: "💻", name: "Programación", desc: "Gran RAM, CPU multihilo y almacenamiento rápido en SSD." },
  { emoji: "🎨", name: "Diseño Gráfico", desc: "Pantalla de calidad, GPU dedicada y procesamiento visual potente." },
  { emoji: "📋", name: "Oficina", desc: "Eficiencia energética, portabilidad y herramientas de productividad." },
];

// ─── COMPONENT ───
export default function Home() {
  const [activeProfile, setActiveProfile] = useState(0);
  const [budget, setBudget] = useState(15000);
  const [selectedChip, setSelectedChip] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const formatBudget = (v) =>
    v >= 1000 ? `$${(v / 1000).toFixed(v % 1000 === 0 ? 0 : 1)}k MXN` : `$${v} MXN`;

  return (
    <div style={styles.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.6;transform:scale(1.3)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        .feature-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(46,196,196,0.12); }
        .btn-primary:hover { background: ${COLORS.tealLight}; transform: translateY(-2px); }
        .btn-outline:hover { border-color: rgba(255,255,255,0.6); color: #fff; }
        .nav-link:hover { color: ${COLORS.teal} !important; }
        .profile-card:hover { transform: translateY(-3px); }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{
        ...styles.nav,
        background: scrolled ? "rgba(13,31,60,0.98)" : "rgba(13,31,60,0.85)",
      }}>
        <a href="#" style={styles.navLogo}>
          <div style={{
            width: 36, height: 36, borderRadius: 8,
            background: COLORS.teal,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18, fontWeight: 900, color: COLORS.navy,
          }}>SP</div>
          <span style={styles.navLogoText}>
            Smart<span style={styles.navLogoAccent}>PC</span>
          </span>
        </a>

        <ul style={styles.navLinks}>
          {["Funciones", "Cómo funciona", "Perfiles", "Comparador"].map((l) => (
            <li key={l}>
              <a href={`#${l.toLowerCase().replace(/\s/g, "-")}`}
                 className="nav-link" style={styles.navLink}>{l}</a>
            </li>
          ))}
        </ul>

        <button className="btn-primary" style={styles.navCta}>
          Comenzar ahora →
        </button>
      </nav>

      {/* ── HERO ── */}
      <section style={styles.hero} id="hero">
        {/* Decorative circles */}
        <div style={{
          position: "absolute", top: -80, right: -80,
          width: 500, height: 500, borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.teal}18 0%, transparent 70%)`,
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: -120, left: "30%",
          width: 400, height: 400, borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.teal}10 0%, transparent 70%)`,
          pointerEvents: "none",
        }} />

        <div style={styles.heroGrid}>
          {/* Left: Copy */}
          <div>
            <div style={styles.heroBadge}>
              <span style={styles.heroDot} />
              Sistema web de recomendación inteligente
            </div>
            <h1 style={styles.heroTitle}>
              Tu asesor de
              <span style={styles.heroTitleAccent}>cómputo</span>
              inteligente
            </h1>
            <p style={styles.heroSubtitle}>
              SmartPC analiza tu perfil de uso y presupuesto para recomendarte
              el equipo ideal. Sin tecnicismos, sin confusión.
            </p>
            <div style={styles.heroActions}>
              <button className="btn-primary" style={styles.btnPrimary}>
                ✦ Encontrar mi PC
              </button>
              <button className="btn-outline" style={styles.btnOutline}>
                Ver cómo funciona
              </button>
            </div>

            {/* Stats row */}
            <div style={{ display: "flex", gap: 36, marginTop: 48 }}>
              {[["4", "Perfiles de uso"], ["100+", "Equipos en catálogo"], ["98%", "Precisión"]].map(([val, label]) => (
                <div key={label}>
                  <div style={{ fontSize: 26, fontWeight: 900, color: COLORS.teal }}>{val}</div>
                  <div style={{ fontSize: 13, color: COLORS.grayMid, marginTop: 2 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Interactive card */}
          <div style={styles.heroVisual}>
            <div style={{ ...styles.heroCard, animation: "float 5s ease-in-out infinite" }}>
              <div style={styles.heroCardTitle}>🎯 Configurador rápido</div>

              <div style={{ color: COLORS.grayMid, fontSize: 13, marginBottom: 10 }}>
                ¿Para qué usarás tu equipo?
              </div>
              <div style={styles.profileChips}>
                {["Gaming", "Programación", "Diseño", "Oficina"].map((p, i) => (
                  <button key={p}
                    style={styles.chip(selectedChip === i)}
                    onClick={() => setSelectedChip(i)}
                  >{p}</button>
                ))}
              </div>

              <div style={styles.budgetLabel}>Presupuesto disponible</div>
              <input
                type="range" min={5000} max={60000} step={1000}
                value={budget} onChange={e => setBudget(+e.target.value)}
                style={styles.budgetSlider}
              />
              <div style={styles.budgetDisplay}>{formatBudget(budget)}</div>

              <button style={styles.heroCardBtn}
                onMouseOver={e => e.target.style.background = COLORS.tealLight}
                onMouseOut={e => e.target.style.background = COLORS.teal}
              >
                Ver recomendaciones →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="funciones" style={styles.section(COLORS.white)}>
        <div style={styles.sectionInner}>
          <div style={styles.sectionLabel}>Funcionalidades</div>
          <h2 style={styles.sectionTitle(false)}>Todo lo que necesitas para elegir bien</h2>
          <p style={styles.sectionDesc(false)}>
            Un conjunto de herramientas diseñadas para que la decisión de comprar
            una computadora sea clara, rápida y confiable.
          </p>
          <div style={styles.featuresGrid}>
            {features.map((f) => (
              <div key={f.title} className="feature-card" style={styles.featureCard}>
                <div style={styles.featureIcon}>{f.icon}</div>
                <div style={styles.featureTitle}>{f.title}</div>
                <div style={styles.featureDesc}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="cómo-funciona"
        style={{ ...styles.section(`linear-gradient(135deg, ${COLORS.navy} 0%, #0a2744 100%)`), padding: "90px 5%" }}>
        <div style={styles.sectionInner}>
          <div style={styles.sectionLabel}>Proceso</div>
          <h2 style={styles.sectionTitle(true)}>En 4 pasos encuentras tu PC ideal</h2>
          <p style={styles.sectionDesc(true)}>
            Sin crear cuentas, sin complicaciones. Solo responde algunas preguntas
            y deja que SmartPC trabaje por ti.
          </p>
          <div style={styles.stepsGrid}>
            {steps.map((s, i) => (
              <div key={s.n} style={styles.stepItem}>
                {i < steps.length - 1 && <div style={styles.stepLine} />}
                <div style={styles.stepNumber}>{s.n}</div>
                <div style={styles.stepTitle}>{s.title}</div>
                <div style={styles.stepDesc}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROFILES ── */}
      <section id="perfiles" style={styles.section(COLORS.gray)}>
        <div style={styles.sectionInner}>
          <div style={styles.sectionLabel}>Perfiles de uso</div>
          <h2 style={styles.sectionTitle(false)}>¿Cuál es tu tipo de usuario?</h2>
          <p style={styles.sectionDesc(false)}>
            SmartPC adapta cada recomendación al perfil de uso que mejor te describe.
            Selecciona el tuyo para ver qué características priorizamos.
          </p>
          <div style={styles.profilesGrid}>
            {profiles.map((p, i) => (
              <div key={p.name}
                className="profile-card"
                style={styles.profileCard(activeProfile === i)}
                onClick={() => setActiveProfile(i)}
              >
                <span style={styles.profileEmoji}>{p.emoji}</span>
                <div style={styles.profileName(activeProfile === i)}>{p.name}</div>
                <div style={styles.profileDesc}>{p.desc}</div>
                {activeProfile === i && (
                  <div style={{
                    marginTop: 16, fontSize: 13, fontWeight: 700,
                    color: COLORS.teal, display: "flex", alignItems: "center",
                    justifyContent: "center", gap: 4,
                  }}>
                    ✓ Perfil seleccionado
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <div style={styles.ctaBanner}>
        <div style={{
          position: "absolute", top: -60, right: -60,
          width: 300, height: 300, borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.teal}22 0%, transparent 70%)`,
          pointerEvents: "none",
        }} />
        <div style={{ position: "relative" }}>
          <div style={{ ...styles.sectionLabel, textAlign: "center", marginBottom: 16 }}>
            Empieza gratis hoy
          </div>
          <h2 style={{ ...styles.sectionTitle(true), textAlign: "center", marginBottom: 16 }}>
            Encuentra tu PC ideal en minutos
          </h2>
          <p style={{ ...styles.sectionDesc(true), textAlign: "center", margin: "0 auto 32px" }}>
            Sin registro, sin complicaciones. Responde el cuestionario y recibe
            tu recomendación personalizada ahora mismo.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
            <button className="btn-primary" style={{ ...styles.btnPrimary, fontSize: 17, padding: "16px 36px" }}>
              ✦ Iniciar cuestionario
            </button>
            <button className="btn-outline" style={{ ...styles.btnOutline, fontSize: 17, padding: "16px 36px" }}>
              Ver comparador
            </button>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer style={styles.footer}>
        <div style={{ maxWidth: 1200, margin: "0 auto", marginBottom: 28 }}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 40 }}>
            <div>
              <div style={{ ...styles.footerLogo, marginBottom: 10 }}>
                Smart<span style={{ color: COLORS.teal }}>PC</span>
              </div>
              <div style={{ color: COLORS.grayMid, fontSize: 14, maxWidth: 260 }}>
                Tu asesor de cómputo inteligente. Proyecto académico — IPN ESCOM.
              </div>
            </div>
            <div style={{ display: "flex", gap: 60, flexWrap: "wrap" }}>
              {[
                { title: "Sistema", links: ["Inicio", "Funciones", "Comparador", "Glosario"] },
                { title: "Perfiles", links: ["Gaming", "Programación", "Diseño", "Oficina"] },
              ].map(col => (
                <div key={col.title}>
                  <div style={{ color: COLORS.white, fontWeight: 700, fontSize: 14, marginBottom: 14 }}>
                    {col.title}
                  </div>
                  {col.links.map(l => (
                    <div key={l} style={{ color: COLORS.grayMid, fontSize: 14, marginBottom: 9, cursor: "pointer" }}>
                      {l}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={styles.footerInner}>
          <span style={styles.footerText}>© 2025 SmartPC — IPN ESCOM. Proyecto académico.</span>
          <span style={styles.footerText}>Desarrollado con React + Vite</span>
        </div>
      </footer>
    </div>
  );
}