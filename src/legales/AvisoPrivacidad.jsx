import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AvisoPrivacidad.css";

/* ─── Datos de las secciones ─────────────────────── */
const SECTIONS = [
  {
    id: "responsable",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M3 17c0-3.314 3.134-6 7-6s7 2.686 7 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Identidad del responsable",
    body: (
      <>
        <p>
          SmartPC es un sistema de recomendación de computadoras diseñado para ayudar a
          los usuarios a comparar y seleccionar equipos de acuerdo con su perfil de uso,
          presupuesto y preferencias. Se trata de un prototipo funcional desarrollado con
          fines académicos y de demostración tecnológica.
        </p>
        <p>
          Responsable del sistema: <span className="ap-placeholder">Equipo de Desarrollo SmartPC</span>
          <br />
          Contacto: <span className="ap-placeholder">Marc_lio@outlook.com</span>
        </p>
      </>
    ),
  },
  {
    id: "informacion-usada",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M7 10h6M7 13h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M7 7h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Información que utiliza SmartPC",
    body: (
      <>
        <p>
          Para generar recomendaciones, SmartPC puede utilizar la siguiente información
          proporcionada voluntariamente por el usuario durante el uso del sistema:
        </p>
        <ul className="ap-list">
          <li>Perfil de uso seleccionado (Gaming, Programación, Diseño u Oficina).</li>
          <li>Rango de presupuesto mínimo y máximo indicado.</li>
          <li>Preferencias adicionales seleccionadas (rendimiento gráfico, almacenamiento, pantalla premium, costo-beneficio, batería o portabilidad).</li>
          <li>Equipos marcados para comparar dentro del sistema.</li>
          <li>Datos técnicos de los equipos consultados en el catálogo interno.</li>
          <li>Interacciones necesarias para generar y ordenar el ranking de resultados.</li>
        </ul>
        <p>
          Toda esta información se utiliza de forma temporal y con el único propósito de
          calcular y mostrar recomendaciones relevantes para el usuario.
        </p>
      </>
    ),
  },
  {
    id: "no-solicitamos",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M7 10h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Información que no solicitamos",
    body: (
      <>
        <p>
          SmartPC <strong>no solicita, recopila ni almacena</strong> ninguno de los
          siguientes datos:
        </p>
        <ul className="ap-list ap-list--no">
          <li>Nombre completo o apellidos.</li>
          <li>Dirección postal o domicilio.</li>
          <li>Número telefónico.</li>
          <li>Información bancaria o financiera de cualquier tipo.</li>
          <li>Contraseñas de tiendas externas o cuentas de usuario.</li>
          <li>Datos personales sensibles (salud, origen étnico, etc.).</li>
          <li>Datos de pago, tarjetas o cuentas de débito/crédito.</li>
        </ul>
        <p>
          El sistema puede usarse de forma completamente anónima, sin necesidad de crear
          una cuenta o proporcionar datos de identificación personal.
        </p>
      </>
    ),
  },
  {
    id: "finalidad",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 3v14M3 10h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    title: "Finalidad del uso de la información",
    body: (
      <>
        <p>La información que el usuario ingresa en SmartPC se utiliza exclusivamente para:</p>
        <ul className="ap-list">
          <li>Generar recomendaciones de equipos personalizadas según el perfil seleccionado.</li>
          <li>Filtrar el catálogo de computadoras dentro del rango de presupuesto indicado.</li>
          <li>Comparar hasta tres dispositivos en paralelo según las preferencias del usuario.</li>
          <li>Mejorar la comprensión técnica del usuario mediante información clara sobre los componentes.</li>
          <li>Mostrar enlaces a tiendas externas donde fue localizado el producto.</li>
        </ul>
      </>
    ),
  },
  {
    id: "tiendas-externas",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.5 3H5a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M12 3h5v5M17 3l-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Enlaces a tiendas externas",
    body: (
      <>
        <p>
          SmartPC <strong>no vende directamente equipos de cómputo</strong> ni procesa
          pagos de ningún tipo. Algunos botones como "Ver en tienda" redirigen al usuario
          a sitios web externos donde fue localizado el producto.
        </p>
        <p>
          Al acceder a esos enlaces, el usuario está saliendo de SmartPC e ingresando a
          plataformas de terceros, sobre las cuales SmartPC no tiene control ni
          responsabilidad respecto a:
        </p>
        <ul className="ap-list ap-list--no">
          <li>Precios finales y disponibilidad del producto.</li>
          <li>Promociones, descuentos o condiciones comerciales.</li>
          <li>Métodos de pago aceptados.</li>
          <li>Garantías, tiempos de envío y políticas de devolución.</li>
        </ul>
        <p>
          Se recomienda al usuario revisar los términos y condiciones de cada tienda
          antes de realizar cualquier compra.
        </p>
      </>
    ),
  },
  {
    id: "almacenamiento",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="10" cy="6" rx="7" ry="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M3 6v4c0 1.657 3.134 3 7 3s7-1.343 7-3V6" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M3 10v4c0 1.657 3.134 3 7 3s7-1.343 7-3v-4" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    title: "Uso de almacenamiento del navegador",
    body: (
      <>
        <p>
          SmartPC puede utilizar almacenamiento temporal del navegador
          (<code>sessionStorage</code> o <code>localStorage</code>) para mantener ciertas
          preferencias durante la sesión activa, como el estado de navegación o el acceso
          a funciones de administración interna.
        </p>
        <p>
          Esta información es de carácter operativo y <strong>no constituye datos
          bancarios, contraseñas ni credenciales de tiendas externas</strong>. Al cerrar
          el navegador o limpiar los datos del sitio, esta información se elimina
          automáticamente.
        </p>
        <p>
          SmartPC no utiliza cookies de rastreo ni servicios de analítica de terceros.
        </p>
      </>
    ),
  },
  {
    id: "conservacion",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 6v4l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Conservación de la información",
    body: (
      <>
        <p>
          La información ingresada en SmartPC se conserva únicamente el tiempo necesario
          para operar el sistema y completar la sesión de recomendación activa. Una vez
          cerrada la sesión o el navegador, no se mantiene ningún registro persistente
          asociado al usuario.
        </p>
        <p>
          En caso de que en versiones futuras se implemente un sistema de historial o
          cuenta de usuario, esta política será actualizada para reflejar los nuevos
          plazos de conservación y las opciones de eliminación disponibles.
        </p>
      </>
    ),
  },
  {
    id: "seguridad",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 2.5L4 5v5c0 3.5 2.667 6.167 6 7 3.333-.833 6-3.5 6-7V5L10 2.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M7.5 10l1.5 1.5 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Seguridad",
    body: (
      <>
        <p>
          SmartPC adopta medidas razonables orientadas a proteger la información que
          circula dentro del sistema durante su uso. Sin embargo, al tratarse de un
          prototipo funcional, no se garantiza un nivel de seguridad equivalente al de
          sistemas de producción certificados.
        </p>
        <p>
          El usuario es responsable de revisar las condiciones de seguridad, privacidad y
          protección de datos de las tiendas externas antes de ingresar cualquier dato
          personal o financiero en dichos sitios.
        </p>
      </>
    ),
  },
  {
    id: "derechos",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="5" width="14" height="11" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M7 5V4a3 3 0 016 0v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M10 11v2M10 9v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Derechos del usuario",
    body: (
      <>
        <p>
          Aunque SmartPC no almacena datos personales de forma permanente, el usuario
          tiene derecho a solicitar aclaraciones sobre el uso de su información, así como
          la eliminación de cualquier dato asociado a su sesión en caso de que existiera
          almacenamiento vinculado al sistema.
        </p>
        <p>
          Para ejercer este derecho o plantear cualquier duda relacionada con el manejo de
          información, puede contactar al equipo responsable en:
        </p>
        <p className="ap-contact">
          <span className="ap-contact__label">Correo de contacto</span>
          <span className="ap-placeholder">Marc_lio@outlook.com</span>
        </p>
      </>
    ),
  },
  {
    id: "cambios",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 10a6 6 0 1110.472-4M14 6l.5-3.5L18 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 10a6 6 0 11-10.472 4M6 14l-.5 3.5L2 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Cambios a este aviso",
    body: (
      <>
        <p>
          SmartPC puede actualizar este aviso de privacidad cuando existan modificaciones
          relevantes en sus funciones, fuentes de datos, catálogo de productos o forma de
          operar. Los cambios entrarán en vigencia a partir de su publicación en esta
          misma página.
        </p>
        <p>
          Se recomienda revisar periódicamente este aviso para mantenerse informado sobre
          cómo SmartPC gestiona la información generada durante su uso.
        </p>
      </>
    ),
  },
];

/* ─── Resumen rápido ────────────────────────────── */
const QUICK = [
  {
    icon: (
      <svg viewBox="0 0 18 18" fill="none">
        <path d="M9 2a5 5 0 100 10A5 5 0 009 2zM4.5 14.5c0-1.38 2.015-2.5 4.5-2.5s4.5 1.12 4.5 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    text: "Puedes usar SmartPC sin crear cuenta ni proporcionar datos personales.",
  },
  {
    icon: (
      <svg viewBox="0 0 18 18" fill="none">
        <rect x="2.5" y="4.5" width="13" height="9" rx="2" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M6 4.5V3.5a1 1 0 011-1h4a1 1 0 011 1v1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    text: "Solo se utiliza tu perfil, presupuesto y preferencias para generar recomendaciones.",
  },
  {
    icon: (
      <svg viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M6 9h6M9 6v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    text: "SmartPC no solicita información bancaria ni datos de pago de ningún tipo.",
  },
  {
    icon: (
      <svg viewBox="0 0 18 18" fill="none">
        <path d="M7.5 2.5H4a1.5 1.5 0 00-1.5 1.5v10A1.5 1.5 0 004 15.5h10a1.5 1.5 0 001.5-1.5v-3.5M10.5 2.5h5v5M15.5 2.5l-6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    text: "Los botones \"Ver en tienda\" redirigen a sitios externos. SmartPC no vende directamente.",
  },
  {
    icon: (
      <svg viewBox="0 0 18 18" fill="none">
        <path d="M9 2.5v13M2.5 9h13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.4"/>
      </svg>
    ),
    text: "Los precios y disponibilidad en tiendas externas pueden cambiar sin previo aviso.",
  },
];

/* ─── Componente principal ───────────────────────── */
export default function AvisoPrivacidad() {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="ap-root">
      {/* ── Nav ── */}
      <nav className={`ap-nav${scrolled ? " ap-nav--scrolled" : ""}`}>
        <div className="ap-nav__inner">
          <a href="#" className="nav__logo">
            <img
              src="/logo_only.svg"
              alt="SmartPC"
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
            <span className="nav__logo-text">Smart<em>PC</em></span>
          </a>

          <ul className="ap-nav__links">
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/recomendador">Recomendador</Link></li>
            <li><Link to="/glosario">Glosario técnico</Link></li>
          </ul>

          <div className="ap-nav__right">
            <Link to="/recomendador" className="ap-nav__cta">
              <svg viewBox="0 0 12 12" fill="none">
                <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Buscar equipo
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <header className="ap-hero" id="rec-hero">
        <div className="ap-hero__bg-grid" aria-hidden />
        <div className="ap-hero__content">
          <span className="ap-hero__tag">
            <svg viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="5.25" stroke="currentColor" strokeWidth="1.3"/>
              <path d="M6 5v3M6 3.5v.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            SmartPC
          </span>
          <h1 className="ap-hero__title">
            Aviso de <em>privacidad</em>
          </h1>
          <p className="ap-hero__sub">
            Esta página describe cómo SmartPC utiliza la información necesaria para
            generar recomendaciones de equipos. No recopilamos datos personales ni
            procesamos pagos.
          </p>
          <span className="ap-hero__date">
            <svg viewBox="0 0 14 14" fill="none">
              <rect x="1.5" y="2.5" width="11" height="10" rx="2" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M1.5 5.5h11M4.5 1v3M9.5 1v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            Última actualización: Junio 2026
          </span>
        </div>
      </header>

      {/* ── Resumen rápido ── */}
      <section className="ap-summary">
        <div className="ap-summary__inner">
          <p className="ap-summary__eyebrow">En resumen</p>
          <h2 className="ap-summary__title">Lo esencial, de forma clara</h2>
          <div className="ap-summary__grid">
            {QUICK.map((q, i) => (
              <div className="ap-quick-card" key={i}>
                <span className="ap-quick-card__icon">{q.icon}</span>
                <p className="ap-quick-card__text">{q.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Secciones detalladas ── */}
      <section className="ap-content">
        <div className="ap-content__inner">

          {/* índice lateral */}
          <aside className="ap-sidebar">
            <p className="ap-sidebar__label">Contenido</p>
            <nav className="ap-sidebar__nav">
              {SECTIONS.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={`ap-sidebar__link${activeId === s.id ? " ap-sidebar__link--active" : ""}`}
                  onClick={() => setActiveId(s.id)}
                >
                  {s.title}
                </a>
              ))}
            </nav>
          </aside>

          {/* cuerpo de secciones */}
          <div className="ap-sections">
            {SECTIONS.map((s) => (
              <article
                key={s.id}
                id={s.id}
                className="ap-section"
                onMouseEnter={() => setActiveId(s.id)}
              >
                <div className="ap-section__header">
                  <span className="ap-section__icon">{s.icon}</span>
                  <h3 className="ap-section__title">{s.title}</h3>
                </div>
                <div className="ap-section__body">{s.body}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA final ── */}
      <section className="ap-cta">
        <div className="ap-cta__inner">
          <p className="ap-cta__eyebrow">SmartPC</p>
          <h2 className="ap-cta__title">
            Encuentra tu <em>equipo ideal</em>
          </h2>
          <p className="ap-cta__desc">
            Usa el recomendador para comparar equipos según tu perfil y presupuesto,
            o revisa el glosario técnico para entender mejor cada componente.
          </p>
          <div className="ap-cta__actions">
            <Link to="/recomendador" className="ap-btn-primary">
              <svg viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Ir al recomendador
            </Link>
            <Link to="/glosario" className="ap-btn-ghost">
              Consultar glosario técnico
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
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
              <div>
                <p className="footer__col-title">Plataforma</p>
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
            <span className="footer__copy">
              © {new Date().getFullYear()} SmartPC. Todos los derechos reservados.
            </span>
            <div className="footer__legal">
              <a href="#rec-hero">Aviso de privacidad</a>
              <span className="footer__legal-sep" />
              <Link to="/terminos-uso">Términos de uso</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}