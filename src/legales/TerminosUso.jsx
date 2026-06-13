import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./TerminosUso.css";

/* ─── Iconos SVG inline ──────────────────────────── */
const ArrowIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 8h12M8 2l6 6-6 6"/>
  </svg>
);

/* ─── Secciones del aviso ─────────────────────────── */
const SECTIONS = [
  {
    id: "aceptacion",
    icon: (
      <svg viewBox="0 0 20 20" fill="none">
        <path d="M10 2.5L4 5v5c0 3.5 2.667 6.167 6 7 3.333-.833 6-3.5 6-7V5L10 2.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M7.5 10l1.5 1.5 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Aceptación de los términos",
    body: (
      <>
        <p>
          Al acceder y utilizar SmartPC, el usuario acepta de forma voluntaria los presentes
          términos de uso y se compromete a cumplirlos durante toda su interacción con el
          sistema.
        </p>
        <p>
          Si el usuario no está de acuerdo con alguna de las condiciones descritas en esta
          página, puede dejar de utilizar SmartPC en cualquier momento sin ninguna
          consecuencia. El uso continuado del sistema implica la aceptación de estos términos.
        </p>
      </>
    ),
  },
  {
    id: "descripcion",
    icon: (
      <svg viewBox="0 0 20 20" fill="none">
        <rect x="3" y="3" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M7 10h6M7 13h4M7 7h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Descripción del servicio",
    body: (
      <>
        <p>
          SmartPC es un sistema web de recomendación de computadoras orientado a ayudar
          a los usuarios a comparar y seleccionar equipos de cómputo de acuerdo con su
          perfil de uso, presupuesto y preferencias. El sistema ofrece:
        </p>
        <ul className="tu-list">
          <li>Recomendación de computadoras según perfil de uso y presupuesto.</li>
          <li>Comparación simultánea de hasta tres equipos.</li>
          <li>Explicación técnica de los componentes de cada dispositivo.</li>
          <li>Glosario interactivo con términos de hardware y software.</li>
          <li>Enlaces externos hacia tiendas donde fue localizado el producto.</li>
        </ul>
        <p>
          SmartPC es un prototipo funcional desarrollado con propósitos académicos y de
          demostración tecnológica.
        </p>
      </>
    ),
  },
  {
    id: "recomendaciones",
    icon: (
      <svg viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 6v4l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Naturaleza de las recomendaciones",
    body: (
      <>
        <p>
          Las recomendaciones generadas por SmartPC son de carácter <strong>orientativo</strong>.
          El sistema calcula un ranking de equipos considerando múltiples factores, entre ellos:
        </p>
        <ul className="tu-list">
          <li>El perfil de uso seleccionado por el usuario (Gaming, Programación, Diseño u Oficina).</li>
          <li>El rango de presupuesto indicado.</li>
          <li>Las preferencias adicionales elegidas.</li>
          <li>Los datos técnicos disponibles en el catálogo del sistema.</li>
          <li>Las ponderaciones asignadas a cada componente según el perfil activo.</li>
          <li>La disponibilidad de información obtenida o registrada para cada equipo.</li>
        </ul>
        <p>
          Los resultados reflejan el mejor cruce posible entre las necesidades del usuario
          y el catálogo disponible en el momento de la consulta. Sin embargo,{" "}
          <strong>las recomendaciones no sustituyen la revisión final del usuario</strong>{" "}
          antes de tomar una decisión de compra.
        </p>
      </>
    ),
  },
  {
    id: "precios",
    icon: (
      <svg viewBox="0 0 20 20" fill="none">
        <path d="M8.5 3H5a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M12 3h5v5M17 3l-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Precios, disponibilidad y enlaces externos",
    body: (
      <>
        <p>
          SmartPC puede mostrar precios y referencias obtenidas de tiendas externas al momento
          de registrar o actualizar el catálogo. Estos datos tienen carácter informativo y
          pueden haber cambiado desde su última actualización.
        </p>
        <p>
          SmartPC no controla ni garantiza ninguno de los siguientes aspectos en las tiendas
          externas a las que enlaza:
        </p>
        <ul className="tu-list tu-list--no">
          <li>Precio final del producto al momento de la compra.</li>
          <li>Existencias o disponibilidad en tienda.</li>
          <li>Promociones, descuentos o condiciones especiales.</li>
          <li>Métodos de pago aceptados.</li>
          <li>Costos, tiempos y condiciones de envío.</li>
          <li>Garantías del fabricante o del vendedor.</li>
          <li>Políticas de devolución y cambio.</li>
          <li>Condiciones generales de compra del sitio externo.</li>
        </ul>
        <p>
          El usuario es responsable de verificar todos estos aspectos directamente en la
          tienda correspondiente antes de realizar cualquier compra.
        </p>
      </>
    ),
  },
  {
    id: "no-vende",
    icon: (
      <svg viewBox="0 0 20 20" fill="none">
        <path d="M3 5h14l-1.5 8H4.5L3 5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <circle cx="7.5" cy="16" r="1.2" stroke="currentColor" strokeWidth="1.2"/>
        <circle cx="13.5" cy="16" r="1.2" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M7 5l1-3h4l1 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "SmartPC no vende directamente",
    body: (
      <>
        <p>
          SmartPC <strong>no es una tienda en línea</strong>. El sistema no vende
          directamente los equipos mostrados, no procesa pagos, no gestiona envíos y no
          ofrece garantías comerciales sobre los productos del catálogo.
        </p>
        <p>
          El botón "Ver en tienda" redirige al usuario a sitios web externos donde el
          producto puede estar publicado. Cualquier compra realizada se lleva a cabo
          directamente entre el usuario y la tienda correspondiente, sin intervención
          alguna de SmartPC en la transacción.
        </p>
        <p>
          SmartPC no recibe comisiones, pagos ni beneficio económico alguno por los
          enlaces mostrados a tiendas externas.
        </p>
      </>
    ),
  },
  {
    id: "responsabilidad-usuario",
    icon: (
      <svg viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M3 17c0-3.314 3.134-6 7-6s7 2.686 7 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Responsabilidad del usuario",
    body: (
      <>
        <p>
          Antes de realizar cualquier compra a partir de una recomendación de SmartPC,
          el usuario debe:
        </p>
        <ul className="tu-list">
          <li>Revisar la ficha del producto directamente en la tienda externa.</li>
          <li>Confirmar el precio y la disponibilidad actuales del equipo.</li>
          <li>Verificar los métodos de pago disponibles y sus condiciones.</li>
          <li>Revisar las políticas de garantía, envío y devolución de la tienda.</li>
          <li>Confirmar que el equipo cumple con sus necesidades específicas de uso.</li>
        </ul>
        <p>
          SmartPC facilita la comparación y orientación técnica, pero la decisión final de
          compra y la relación con la tienda son responsabilidad exclusiva del usuario.
        </p>
      </>
    ),
  },
  {
    id: "exactitud",
    icon: (
      <svg viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 6v4M10 13.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Exactitud de la información",
    body: (
      <>
        <p>
          SmartPC busca mostrar información técnica útil, organizada y lo más actualizada
          posible. Sin embargo, pueden existir diferencias entre los datos del catálogo y
          la información actual de las tiendas externas, derivadas de:
        </p>
        <ul className="tu-list">
          <li>Cambios de precio posteriores al registro del producto.</li>
          <li>Actualizaciones de especificaciones por parte del fabricante.</li>
          <li>Variaciones en el inventario disponible.</li>
          <li>Retrasos en la actualización del catálogo interno.</li>
        </ul>
        <p>
          Esta transparencia no implica que el sistema sea inexacto en su función
          principal: comparar y recomendar equipos según los datos disponibles en el momento
          de la consulta. La información puede no reflejar siempre el estado en tiempo real
          de cada producto en cada tienda.
        </p>
      </>
    ),
  },
  {
    id: "uso-permitido",
    icon: (
      <svg viewBox="0 0 20 20" fill="none">
        <rect x="3" y="5" width="14" height="11" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M7 5V4a3 3 0 016 0v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M10 11v2M10 9v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Uso permitido",
    body: (
      <>
        <p>
          El usuario puede utilizar SmartPC para fines personales, académicos, informativos
          o de comparación de equipos. Está permitido consultar el catálogo, obtener
          recomendaciones, comparar dispositivos y acceder al glosario técnico de forma libre.
        </p>
        <p>Queda fuera del uso permitido cualquier acción que busque:</p>
        <ul className="tu-list tu-list--no">
          <li>Manipular el sistema de puntuación o los resultados del recomendador.</li>
          <li>Acceder a paneles administrativos sin autorización explícita.</li>
          <li>Extraer información del catálogo de forma masiva o automatizada sin consentimiento.</li>
          <li>Afectar la disponibilidad, estabilidad o funcionamiento del sistema.</li>
        </ul>
      </>
    ),
  },
  {
    id: "propiedad",
    icon: (
      <svg viewBox="0 0 20 20" fill="none">
        <path d="M10 2l2.09 6.26H18l-5 3.64 1.91 6.1L10 14.27l-4.91 3.73L7 11.9 2 8.26h5.91L10 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Propiedad intelectual",
    body: (
      <>
        <p>
          El diseño visual, la estructura, los textos, los elementos gráficos y la
          marca SmartPC forman parte de este proyecto y no pueden ser reproducidos,
          copiados o distribuidos sin autorización del equipo responsable.
        </p>
        <p>
          Los datos técnicos de los equipos mostrados provienen de fuentes públicas
          como tiendas en línea y especificaciones de fabricantes. SmartPC no reclama
          propiedad sobre dichos datos, sino únicamente sobre la forma en que los
          organiza, presenta y pondera dentro del sistema.
        </p>
      </>
    ),
  },
  {
    id: "modificaciones",
    icon: (
      <svg viewBox="0 0 20 20" fill="none">
        <path d="M4 10a6 6 0 1110.472-4M14 6l.5-3.5L18 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 10a6 6 0 11-10.472 4M6 14l-.5 3.5L2 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Modificaciones al servicio",
    body: (
      <>
        <p>
          SmartPC puede evolucionar con el tiempo. El equipo responsable se reserva el
          derecho de modificar las funciones del sistema, actualizar el catálogo de
          productos, ajustar las ponderaciones del motor de recomendación, cambiar las
          fuentes de información o rediseñar la interfaz sin previo aviso.
        </p>
        <p>
          Asimismo, estos términos de uso pueden actualizarse para reflejar cambios en
          el sistema. La versión vigente siempre estará disponible en esta página.
        </p>
      </>
    ),
  },
  {
    id: "limitacion",
    icon: (
      <svg viewBox="0 0 20 20" fill="none">
        <path d="M10 2.5L4 5v5c0 3.5 2.667 6.167 6 7 3.333-.833 6-3.5 6-7V5L10 2.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M8 10h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Limitación de responsabilidad",
    body: (
      <>
        <p>
          SmartPC proporciona información técnica y recomendaciones como herramienta
          de orientación. El sistema no asume responsabilidad por:
        </p>
        <ul className="tu-list tu-list--no">
          <li>Compras realizadas por el usuario en tiendas externas.</li>
          <li>Cambios de precio o falta de stock ocurridos después de la consulta.</li>
          <li>Fallas, defectos o comportamiento del producto adquirido.</li>
          <li>Garantías, soporte técnico o servicio post-venta de la tienda.</li>
          <li>Problemas derivados del proceso de envío o entrega.</li>
          <li>Pérdidas económicas asociadas a una decisión de compra basada en el sistema.</li>
        </ul>
        <p>
          La responsabilidad de SmartPC se limita a ofrecer la mejor recomendación posible
          con base en la información disponible en su catálogo al momento de la consulta.
        </p>
      </>
    ),
  },
  {
    id: "contacto",
    icon: (
      <svg viewBox="0 0 20 20" fill="none">
        <rect x="2.5" y="5" width="15" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M2.5 7.5l7.5 4.5 7.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Contacto",
    body: (
      <>
        <p>
          Si tienes dudas sobre estos términos de uso o sobre el funcionamiento del sistema,
          puedes comunicarte con el equipo responsable a través del siguiente medio:
        </p>
        <div className="tu-contact">
          <span className="tu-contact__label">Correo de contacto</span>
          <span className="tu-placeholder">Marc_lio@outlook.com</span>
        </div>
      </>
    ),
  },
];

/* ─── Resumen rápido ────────────────────────────── */
const QUICK = [
  {
    icon: (
      <svg viewBox="0 0 18 18" fill="none">
        <path d="M9 2a5.5 5.5 0 100 11A5.5 5.5 0 009 2zM4.5 15c0-1.38 2.015-2.5 4.5-2.5s4.5 1.12 4.5 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    label: "Sin registro necesario",
    text: "Puedes usar SmartPC libremente, sin crear cuenta ni proporcionar datos personales.",
  },
  {
    icon: (
      <svg viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M9 5.5v4l2.5 1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: "Recomendaciones orientativas",
    text: "Los resultados ayudan a comparar equipos, pero la decisión final es tuya.",
  },
  {
    icon: (
      <svg viewBox="0 0 18 18" fill="none">
        <path d="M6 2.5H3.5a1 1 0 00-1 1v11a1 1 0 001 1H14.5a1 1 0 001-1v-11a1 1 0 00-1-1H12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <rect x="6" y="1.5" width="6" height="3" rx="1" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M6.5 9.5l1.5 1.5 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: "Sin ventas directas",
    text: "SmartPC no vende equipos ni procesa pagos. Los enlaces llevan a tiendas de terceros.",
  },
  {
    icon: (
      <svg viewBox="0 0 18 18" fill="none">
        <path d="M9 2.5v13M2.5 9h13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.4"/>
      </svg>
    ),
    label: "Precios pueden cambiar",
    text: "Los precios y disponibilidad en tiendas externas pueden variar sin previo aviso.",
  },
  {
    icon: (
      <svg viewBox="0 0 18 18" fill="none">
        <path d="M15 9A6 6 0 113 9M9 3v6l3 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: "Verifica antes de comprar",
    text: "Siempre revisa la ficha del producto en la tienda antes de tomar tu decisión.",
  },
];

/* ─── Componente principal ───────────────────────── */
export default function TerminosUso() {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="tu-root">

      {/* ── Nav ── */}
      <nav className={`tu-nav${scrolled ? " tu-nav--scrolled" : ""}`}>
        <div className="tu-nav__inner">
          <Link to="/" className="tu-nav__logo">
            <span className="tu-nav__logo-text">Smart<em>PC</em></span>
          </Link>

          <ul className="tu-nav__links">
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/recomendador">Recomendador</Link></li>
            <li><Link to="/glosario">Glosario técnico</Link></li>
          </ul>

          <div className="tu-nav__right">
            <Link to="/recomendador" className="tu-nav__cta">
              <ArrowIcon />
              Buscar equipo
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <header className="tu-hero" id="rec-hero">
        <div className="tu-hero__bg-grid" aria-hidden />
        <div className="tu-hero__content">
          <span className="tu-hero__tag">
            <svg viewBox="0 0 12 12" fill="none">
              <path d="M6 1L2 3v3c0 2.5 1.9 4.4 4 5 2.1-.6 4-2.5 4-5V3L6 1z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
            </svg>
            SmartPC
          </span>
          <h1 className="tu-hero__title">
            Términos de <em>uso</em>
          </h1>
          <p className="tu-hero__sub">
            Estas condiciones describen el alcance, los límites y las responsabilidades
            de quienes utilizan SmartPC. Leer esta página te ayudará a entender cómo
            funciona el sistema y qué esperar de él.
          </p>
          <span className="tu-hero__date">
            <svg viewBox="0 0 14 14" fill="none">
              <rect x="1.5" y="2.5" width="11" height="10" rx="2" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M1.5 5.5h11M4.5 1v3M9.5 1v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            Última actualización: Junio 2026
          </span>
        </div>
      </header>

      {/* ── Resumen rápido ── */}
      <section className="tu-summary">
        <div className="tu-summary__inner">
          <p className="tu-summary__eyebrow">Antes de continuar</p>
          <h2 className="tu-summary__title">Lo esencial en un vistazo</h2>
          <div className="tu-quick-grid">
            {QUICK.map((q, i) => (
              <div className="tu-quick-card" key={i}>
                <span className="tu-quick-card__icon">{q.icon}</span>
                <div className="tu-quick-card__body">
                  <strong className="tu-quick-card__label">{q.label}</strong>
                  <p className="tu-quick-card__text">{q.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contenido detallado ── */}
      <section className="tu-content">
        <div className="tu-content__inner">

          {/* Sidebar de índice */}
          <aside className="tu-sidebar">
            <p className="tu-sidebar__label">Contenido</p>
            <nav className="tu-sidebar__nav">
              {SECTIONS.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={`tu-sidebar__link${activeId === s.id ? " tu-sidebar__link--active" : ""}`}
                  onClick={() => setActiveId(s.id)}
                >
                  {s.title}
                </a>
              ))}
            </nav>
          </aside>

          {/* Secciones */}
          <div className="tu-sections">
            {SECTIONS.map((s) => (
              <article
                key={s.id}
                id={s.id}
                className="tu-section"
                onMouseEnter={() => setActiveId(s.id)}
              >
                <div className="tu-section__header">
                  <span className="tu-section__icon">{s.icon}</span>
                  <h3 className="tu-section__title">{s.title}</h3>
                </div>
                <div className="tu-section__body">{s.body}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA final ── */}
      <section className="cta-section">
        <div className="cta-inner">
          <div className="section__eyebrow section__eyebrow--centered">SmartPC</div>
          <h2 className="cta-title">
            Encuentra tu equipo,<br /><i>con confianza</i>
          </h2>
          <p className="cta-desc">
            Usa el recomendador para comparar equipos según tu perfil y presupuesto,
            o revisa el aviso de privacidad para conocer cómo gestionamos tu información.
          </p>
          <div className="cta-actions">
            <Link to="/recomendador" className="btn-primary btn-primary--cta">
              Usar recomendador <ArrowIcon />
            </Link>
            <Link to="/aviso-privacidad" className="btn-ghost btn-ghost--cta">
              Ver aviso de privacidad
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer — igual al del Home ── */}
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
                  <Link to="/recomendador">Recomendador</Link>
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
              <a href="#rec-hero">Términos de uso</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}