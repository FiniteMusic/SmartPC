import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

/* ─────────────────────────────────────────────────────
   SVG Icons — vectorial, sin emojis
───────────────────────────────────────────────────── */
const Icon = {
  Arrow: () => (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 8h12M8 2l6 6-6 6"/>
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
  Brain: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.14Z"/>
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.14Z"/>
    </svg>
  ),
  Chart: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/>
      <line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/>
      <line x1="2" y1="20" x2="22" y2="20"/>
    </svg>
  ),
  Book: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>
  ),
  Target: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
    </svg>
  ),
  Filter: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
    </svg>
  ),
  Zap: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  Config: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
    </svg>
  ),
  Shield: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  Check: () => (
    <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1.5 5l2.5 2.5L8.5 2"/>
    </svg>
  ),
  ChevronDown: () => (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 6l4 4 4-4"/>
    </svg>
  ),
};

/* ─────────────────────────────────────────────────────
   Data
───────────────────────────────────────────────────── */
const PROFILES = [
  { icon: "Gaming",  label: "Gaming",       hint: "Alto rendimiento" },
  { icon: "Code",    label: "Programación", hint: "Productividad" },
  { icon: "Design",  label: "Diseño",       hint: "Color preciso" },
  { icon: "Office",  label: "Oficina",      hint: "Uso cotidiano" },
];

const FEATURES = [
  { icon: "Brain",  title: "Motor de recomendación",   desc: "Algoritmo de puntuación ponderada que cruza tu perfil de uso con el catálogo disponible para encontrar el equipo más adecuado.", wide: true, tag: "Core" },
  { icon: "Chart",  title: "Comparador visual",        desc: "Contrasta especificaciones técnicas entre equipos de forma clara y sin tecnicismos.", wide: false },
  { icon: "Book",   title: "Glosario interactivo",     desc: "CPU, GPU, RAM, SSD: explicamos cada concepto en lenguaje sencillo para que tomes decisiones informadas.", wide: false },
  { icon: "Target", title: "Perfiles personalizados",  desc: "Cada perfil prioriza las métricas que realmente impactan en tu tipo de uso.", wide: false },
  { icon: "Filter", title: "Filtrado por presupuesto", desc: "Ajusta tu rango y el sistema actualiza en tiempo real los equipos alcanzables.", wide: false },
  { icon: "Zap",    title: "Resultados instantáneos",  desc: "Sin registro, sin formularios largos. Responde algunas preguntas y recibe tu recomendación al momento.", wide: false },
];

const STEPS = [
  { n: "01", title: "Define tu perfil",     desc: "Dinos para qué usarás el equipo: gaming, trabajo, diseño u oficina." },
  { n: "02", title: "Establece tu rango",   desc: "Indica cuánto puedes invertir, desde setups básicos hasta estaciones de trabajo." },
  { n: "03", title: "Análisis inteligente", desc: "El motor pondera tus necesidades y las cruza con las especificaciones del catálogo." },
  { n: "04", title: "Tu recomendación",     desc: "Recibe una lista ordenada de equipos ideales con justificación técnica clara." },
];

const PROFILE_DETAILS = [
  { icon: "Gaming",  name: "Gaming",       desc: "GPU de alto rendimiento, frecuencia de refresco elevada y refrigeración eficiente." },
  { icon: "Code",    name: "Programación", desc: "CPU multinúcleo, RAM abundante y almacenamiento rápido para compilar sin esperas." },
  { icon: "Design",  name: "Diseño",       desc: "Pantalla de alta fidelidad cromática, GPU estable y procesador confiable." },
  { icon: "Office",  name: "Oficina",      desc: "Batería extendida, portabilidad y rendimiento suficiente para el trabajo diario." },
];

const MOCK_SCORES = [
  { name: "Rendimiento",     pct: 91 },
  { name: "Compatibilidad",  pct: 87 },
  { name: "Relación precio", pct: 78 },
  { name: "Durabilidad",     pct: 85 },
];

const MOCK_SPECS = ["Intel Core i7-13700H", "RTX 4060 8 GB", "16 GB DDR5", "512 GB NVMe", "144 Hz IPS"];

const formatMXN = (n) =>
  new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(n);

const normalizeLink = (text) => {
  const map = { á: "a", é: "e", í: "i", ó: "o", ú: "u" };
  return text.toLowerCase().replace(/\s+/g, "-").replace(/[áéíóú]/g, (c) => map[c]);
};

/* ─────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────── */
export default function Home() {
  const [selProfile, setSelProfile]       = useState(0);
  const [budget, setBudget]               = useState(18000);
  const [activeProfile, setActiveProfile] = useState(null);
  const [scrolled, setScrolled]           = useState(false);

  const budgetPct = ((budget - 5000) / (60000 - 5000)) * 100;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="page-root">

      {/* ══════════════════════════════
          NAVBAR — Tesla-inspired, single row, full-width
      ══════════════════════════════ */}
      <nav className={`nav${scrolled ? " nav--scrolled" : ""}`}>
        <div className="nav__inner">
          <a href="#" className="nav__logo">
            <img
              src="/logo_only.svg"
              alt="SmartPC"
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
            <span className="nav__logo-text">Smart<em>PC</em></span>
          </a>

          <ul className="nav__links">
            {["Inicio", "Funciones", "Cómo funciona", "Perfiles"].map((l) => (
              <li key={l}>
                <a href={`#${normalizeLink(l)}`}>{l}</a>
              </li>
            ))}
          </ul>

          <div className="nav__right">
           <Link to="/recomendador" className="nav__cta">
              Comenzar <Icon.Arrow />
            </Link>
          </div>
        </div>
      </nav>

      {/* ══════════════════════════════
          HERO — Tesla full-screen, centered, dominant
      ══════════════════════════════ */}
      <section className="hero" id="inicio">
        <div className="hero__bg-grid" />
        <div className="hero__bg-glow-left" />
        <div className="hero__bg-glow-right" />

        {/* Centro: headline + CTAs */}
        <div className="hero__center anim">
          <div className="hero__tag">
            <span className="hero__tag-dot" />
            <span>Asesor inteligente de cómputo</span>
          </div>

          <h1 className="hero__headline anim d1">
            Encuentra la computadora<br />
            que <i>realmente</i> necesitas
          </h1>

          <p className="hero__sub anim d2">
            SmartPC analiza tu perfil y presupuesto para recomendarte<br className="hero__br" />
            el equipo ideal. Sin tecnicismos, sin confusión.
          </p>

          <div className="hero__actions anim d3">
            <Link to="/recomendador" className="btn-primary btn-primary--hero">
               Encontrar mi PC <Icon.Arrow />
            </Link>

            <a href="#como-funciona" className="btn-ghost btn-ghost--hero">
             Ver cómo funciona
            </a>
          </div>
        </div>

        {/* Panel inferior: configurador + resultado */}
        <div className="hero__panel-row anim d4">
          {/* Config panel */}
          <div className="config-panel">
            <div className="config-panel__top-stripe" />
            <div className="config-panel__hd">
              <div className="config-panel__hd-icon"><Icon.Config /></div>
              <div>
                <div className="config-panel__title">Configurador rápido</div>
                <div className="config-panel__subtitle">Empieza tu búsqueda aquí</div>
              </div>
            </div>

            <div className="profile-label">¿Para qué usarás tu equipo?</div>
            <div className="profile-grid">
              {PROFILES.map((p, i) => {
                const Ic = Icon[p.icon];
                return (
                  <button
                    key={p.label}
                    className={`profile-btn${selProfile === i ? " active" : ""}`}
                    onClick={() => setSelProfile(i)}
                  >
                    <div className="profile-btn__icon">{Ic && <Ic />}</div>
                    <span className="profile-btn__name">{p.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="profile-label">Presupuesto disponible</div>
            <div className="budget-row">
              <span className="budget-amount">{formatMXN(budget)}</span>
              <span className="budget-range">$5K — $60K MXN</span>
            </div>
            <input
              type="range"
              className="slider"
              min={5000} max={60000} step={500}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              style={{
                background: `linear-gradient(to right, var(--c-teal) ${budgetPct}%, var(--bd-2) ${budgetPct}%)`,
              }}
            />

            <button className="config-panel__cta">
              Ver recomendaciones <Icon.Arrow />
            </button>
          </div>

          {/* Result mockup panel */}
          <div className="result-panel">
            <div className="result-panel__header">
              <span className="result-panel__label">Tu PC recomendada</span>
              <div className="result-panel__badge">
                <span className="result-panel__badge-dot" />
                Análisis activo
              </div>
            </div>

            <div className="result-panel__model">ASUS VivoBook Pro 15</div>
            <div className="result-panel__profile">
              Perfil: {PROFILES[selProfile].label} · {formatMXN(budget)}
            </div>

            <div className="score-bar-list">
              {MOCK_SCORES.map((s) => (
                <div className="score-bar-item" key={s.name}>
                  <div className="score-bar__top">
                    <span className="score-bar__name">{s.name}</span>
                    <span className="score-bar__val">{s.pct}%</span>
                  </div>
                  <div className="score-bar__track">
                    <div className="score-bar__fill" style={{ width: `${s.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="spec-chips">
              {MOCK_SPECS.map((sp, i) => (
                <span key={sp} className={`spec-chip${i < 2 ? " spec-chip--highlight" : ""}`}>
                  {sp}
                </span>
              ))}
            </div>
          </div>

          {/* Benefits strip */}
          <div className="hero__benefits">
            {[
              { icon: "Shield", title: "Sin datos inventados", sub: "Recomendaciones basadas en tu perfil real" },
              { icon: "Target", title: "Explicación incluida",  sub: "Sabrás por qué te recomendamos cada equipo" },
              { icon: "Zap",    title: "Sin registro",          sub: "Resultados al instante, sin formularios" },
            ].map((b) => {
              const BenefitIcon = Icon[b.icon];
              return (
                <div className="hero__benefit" key={b.title}>
                  <div className="hero__benefit-icon">
                    {BenefitIcon && <BenefitIcon />}
                  </div>
                  <div className="hero__benefit-text">
                    <strong>{b.title}</strong>
                    {b.sub}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          FEATURES
      ══════════════════════════════ */}
      <section className="section section--alt" id="funciones">
        <div className="section__inner">
          <div className="section__eyebrow">Funcionalidades</div>
          <h2 className="section__title">Todo lo que necesitas para <i>elegir bien</i></h2>
          <p className="section__desc">
            Un conjunto de herramientas diseñadas para que la decisión de comprar
            una computadora sea clara, rápida y sin estrés.
          </p>
          <div className="features-layout">
            {FEATURES.map((f) => {
              const Ic = Icon[f.icon];
              return (
                <div key={f.title} className={`feature-card${f.wide ? " feature-card--wide" : ""}`}>
                  {f.tag && <span className="feature-card__tag">{f.tag}</span>}
                  <div className="feature-card__icon">{Ic && <Ic />}</div>
                  <div className="feature-card__title">{f.title}</div>
                  <div className="feature-card__desc">{f.desc}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          HOW IT WORKS
      ══════════════════════════════ */}
      <section className="section section--dark" id="como-funciona">
        <div className="section__inner">
          <div className="section__eyebrow">Proceso</div>
          <h2 className="section__title">En 4 pasos encuentras tu <i>PC ideal</i></h2>
          <p className="section__desc">
            Sin crear cuenta, sin complicaciones. Responde unas preguntas
            y deja que SmartPC trabaje por ti.
          </p>
          <div className="steps-grid">
            {STEPS.map((s) => (
              <div className="step-item" key={s.n}>
                <div className="step-num">{s.n}</div>
                <div className="step-title">{s.title}</div>
                <div className="step-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          PROFILES
      ══════════════════════════════ */}
      <section className="section section--white" id="perfiles">
        <div className="section__inner">
          <div className="section__eyebrow">Perfiles de uso</div>
          <h2 className="section__title">¿Cuál es tu <i>tipo de usuario?</i></h2>
          <p className="section__desc">
            Cada perfil prioriza las especificaciones que realmente importan
            para tu forma de trabajar o jugar.
          </p>
          <div className="profiles-grid">
            {PROFILE_DETAILS.map((p, i) => {
              const Ic = Icon[p.icon];
              return (
                <div
                  key={p.name}
                  className={`profile-card${activeProfile === i ? " active" : ""}`}
                  onClick={() => setActiveProfile(activeProfile === i ? null : i)}
                >
                  <div className="profile-card__icon-box">{Ic && <Ic />}</div>
                  <div className="profile-card__name">{p.name}</div>
                  <div className="profile-card__desc">{p.desc}</div>
                  {activeProfile === i && (
                    <div className="profile-card__active-tag">
                      <Icon.Check /> Seleccionado
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          CTA
      ══════════════════════════════ */}
      <section className="cta-section">
        <div className="cta-inner">
          <div className="section__eyebrow section__eyebrow--centered">
            Empieza hoy
          </div>
          <h2 className="cta-title">
            Tu siguiente equipo,<br /><i>a un paso</i>
          </h2>
          <p className="cta-desc">
            Sin registro, sin complicaciones. Responde el cuestionario
            y recibe tu recomendación personalizada en minutos.
          </p>
          <div className="cta-actions">
            <Link to="/recomendador" className="btn-primary btn-primary--cta">
               Iniciar mi cuestionario <Icon.Arrow />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          FOOTER — corporativo, full-width
      ══════════════════════════════ */}
      <footer className="footer">
        <div className="footer__inner">
          <div className="footer__top">
            {/* Brand column */}
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

            {/* Link columns */}
            <div className="footer__cols">
              <div className="footer__col">
                <div className="footer__col-title">Plataforma</div>
                <div className="footer__col-links">
                  {["Inicio", "Funciones", "Comparador de equipos", "Glosario técnico"].map((l) => (
                    <a key={l} href="#">{l}</a>
                  ))}
                </div>
              </div>
              <div className="footer__col">
                <div className="footer__col-title">Perfiles</div>
                <div className="footer__col-links">
                  {["Gaming", "Programación", "Diseño", "Oficina"].map((l) => (
                    <a key={l} href="#">{l}</a>
                  ))}
                </div>
              </div>
              <div className="footer__col">
                <div className="footer__col-title">Soporte</div>
                <div className="footer__col-links">
                  {["Guía de compra", "Recomendaciones inteligentes", "Contacto", "Ayuda"].map((l) => (
                    <a key={l} href="#">{l}</a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="footer__divider" />

          <div className="footer__bottom">
            <span className="footer__copy">© 2026 SmartPC. Todos los derechos reservados.</span>
            <div className="footer__legal">
              <a href="#">Aviso de privacidad</a>
              <span className="footer__legal-sep" />
              <a href="#">Términos de uso</a>
              <span className="footer__legal-sep" />
              <a href="#">Soporte</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}