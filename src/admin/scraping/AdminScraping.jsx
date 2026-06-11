import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import "./AdminScraping.css";
import { API_URL } from "../../config/api";

/* ─────────────────────────────────────────────────────
   CONFIG — cambia aquí la URL base del backend
───────────────────────────────────────────────────── */
const API_BASE = `${API_URL}/api/scraping`;

/* ─────────────────────────────────────────────────────
   Helpers
───────────────────────────────────────────────────── */
const formatMXN = (n) =>
  new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(n);

const formatFecha = (iso) => {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatAlmacenamiento = (gb) => {
  if (!gb) return "—";
  return gb >= 1000 ? `${gb / 1000} TB` : `${gb} GB`;
};

/* ─────────────────────────────────────────────────────
   SVG Icons — misma convención que Home.jsx
───────────────────────────────────────────────────── */
const Icon = {
  Refresh: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10" />
      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
    </svg>
  ),
  Check: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  X: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  ArrowRight: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  Undo: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="1 4 1 10 7 10" />
      <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
    </svg>
  ),
  ExternalLink: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  ),
  Package: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  ),
  AlertCircle: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
};

/* ─────────────────────────────────────────────────────
   Componente de estado badge
───────────────────────────────────────────────────── */
function EstadoBadge({ estado }) {
  return (
    <span className={`estado-badge estado-badge--${estado}`}>
      {estado === "pendiente" && "Pendiente"}
      {estado === "aprobado" && "Aprobado"}
      {estado === "descartado" && "Descartado"}
    </span>
  );
}

/* ─────────────────────────────────────────────────────
   Tarjeta de producto individual
───────────────────────────────────────────────────── */
function ProductoCard({ producto, onAccion, loadingId }) {
  const esLoading = loadingId === producto.id;

  return (
    <article className="producto-card">
      <div className={`producto-card__stripe producto-card__stripe--${producto.estado_revision}`} />

      <div className="producto-card__body">
        <div className="producto-card__header">
          <div className="producto-card__header-left">
            <span className="producto-card__tipo">{producto.tipo_producto || "laptop"}</span>

            <h3 className="producto-card__nombre" title={producto.nombre}>
              {producto.nombre}
            </h3>

            <div className="producto-card__meta">
              <span className="producto-card__tienda">{producto.tienda}</span>
              <span className="producto-card__sep">·</span>
              <span className="producto-card__fecha">{formatFecha(producto.fecha_scraping)}</span>
            </div>
          </div>

          <div className="producto-card__header-right">
            <div className="producto-card__precio">{formatMXN(producto.precio)}</div>
            <EstadoBadge estado={producto.estado_revision} />
          </div>
        </div>

        <div className="producto-card__specs">
          <div className="spec-item">
            <span className="spec-item__label">CPU</span>
            <span className="spec-item__value">{producto.cpu_detectado || "—"}</span>
          </div>

          <div className="spec-item">
            <span className="spec-item__label">GPU</span>
            <span className="spec-item__value">{producto.gpu_detectada || "—"}</span>
          </div>

          <div className="spec-item">
            <span className="spec-item__label">RAM</span>
            <span className="spec-item__value">{producto.ram_gb ? `${producto.ram_gb} GB` : "—"}</span>
          </div>

          <div className="spec-item">
            <span className="spec-item__label">Almacenamiento</span>
            <span className="spec-item__value">{formatAlmacenamiento(producto.almacenamiento_gb)}</span>
          </div>

          <div className="spec-item">
            <span className="spec-item__label">Query</span>
            <span className="spec-item__value spec-item__value--query">
              {producto.query_busqueda || "—"}
            </span>
          </div>

          {producto.gama_detectada && (
            <div className="spec-item">
              <span className="spec-item__label">Gama</span>
              <span className="spec-item__value">{producto.gama_detectada}</span>
            </div>
          )}
        </div>

        {producto.observaciones && (
          <div className="producto-card__obs">
            <span className="producto-card__obs-label">Observaciones</span>
            <span className="producto-card__obs-text">{producto.observaciones}</span>
          </div>
        )}

        <div className="producto-card__actions">
          <a
            href={producto.link_tienda}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-action btn-action--ghost"
          >
            <Icon.ExternalLink /> Ver tienda
          </a>

          {producto.estado_revision === "pendiente" && (
            <>
              <button
                className="btn-action btn-action--approve"
                disabled={esLoading}
                onClick={() => onAccion(producto.id, "aprobado", "Producto valido para catalogo")}
              >
                {esLoading ? <span className="spinner" /> : <Icon.Check />}
                Aprobar
              </button>

              <button
                className="btn-action btn-action--discard"
                disabled={esLoading}
                onClick={() => onAccion(producto.id, "descartado", "Producto descartado por revision administrativa")}
              >
                {esLoading ? <span className="spinner" /> : <Icon.X />}
                Descartar
              </button>
            </>
          )}

          {producto.estado_revision === "aprobado" && (
            <button
              className="btn-action btn-action--convert"
              disabled={esLoading}
              onClick={() => onAccion(producto.id, "convertir")}
            >
              {esLoading ? <span className="spinner" /> : <Icon.ArrowRight />}
              Convertir a catálogo
            </button>
          )}

          {producto.estado_revision === "descartado" && (
            <button
              className="btn-action btn-action--restore"
              disabled={esLoading}
              onClick={() => onAccion(producto.id, "pendiente", "Restaurado a pendiente")}
            >
              {esLoading ? <span className="spinner" /> : <Icon.Undo />}
              Restaurar
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

const FILTROS = [
  { key: "", label: "Todos" },
  { key: "pendiente", label: "Pendientes" },
  { key: "aprobado", label: "Aprobados" },
  { key: "descartado", label: "Descartados" },
];

/* ─────────────────────────────────────────────────────
   Componente principal
───────────────────────────────────────────────────── */
export default function AdminScraping() {
  const [productos, setProductos] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pendiente: 0,
    aprobado: 0,
    descartado: 0,
  });

  const [filtroEstado, setFiltroEstado] = useState("");
  const [cargando, setCargando] = useState(false);
  const [ejecutando, setEjecutando] = useState(false);
  const [loadingId, setLoadingId] = useState(null);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);

  // Seguridad básica del panel admin
  const [adminKey, setAdminKey] = useState(
    sessionStorage.getItem("smartpc_admin_key") || ""
  );
  const [inputKey, setInputKey] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(sessionStorage.getItem("smartpc_admin_key"))
  );

  const mostrarToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const handleLoginAdmin = (e) => {
    e.preventDefault();

    if (!inputKey.trim()) {
      setError("Ingresa la clave de administrador.");
      return;
    }

    const key = inputKey.trim();

    sessionStorage.setItem("smartpc_admin_key", key);
    setAdminKey(key);
    setIsAuthenticated(true);
    setError(null);
  };

  const cerrarSesionAdmin = () => {
    sessionStorage.removeItem("smartpc_admin_key");
    setAdminKey("");
    setInputKey("");
    setIsAuthenticated(false);
    setProductos([]);
    setStats({
      total: 0,
      pendiente: 0,
      aprobado: 0,
      descartado: 0,
    });
  };

  const calcularStats = (lista) => {
    const s = {
      total: lista.length,
      pendiente: 0,
      aprobado: 0,
      descartado: 0,
    };

    lista.forEach((p) => {
      if (s[p.estado_revision] !== undefined) {
        s[p.estado_revision]++;
      }
    });

    setStats(s);
  };

  const getAdminHeaders = useCallback(
    (extraHeaders = {}) => ({
      ...extraHeaders,
      "x-admin-key": adminKey,
    }),
    [adminKey]
  );

  const cargarProductos = useCallback(
    async (estado = filtroEstado) => {
      if (!adminKey) return;

      setCargando(true);
      setError(null);

      try {
        const url = estado
          ? `${API_BASE}/productos?estado=${estado}`
          : `${API_BASE}/productos`;

        const res = await fetch(url, {
          headers: getAdminHeaders(),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.detalle || data.mensaje || `Error ${res.status}`);
        }

        setProductos(data.productos || []);

        if (estado) {
          const resAll = await fetch(`${API_BASE}/productos`, {
            headers: getAdminHeaders(),
          });

          const dataAll = await resAll.json();

          if (!resAll.ok) {
            throw new Error(dataAll.detalle || dataAll.mensaje || `Error ${resAll.status}`);
          }

          calcularStats(dataAll.productos || []);
        } else {
          calcularStats(data.productos || []);
        }
      } catch (err) {
        if (String(err.message).includes("Acceso no autorizado") || String(err.message).includes("403")) {
          cerrarSesionAdmin();
          setError("Clave de administrador incorrecta.");
          return;
        }

        setError(err.message || "No se pudo conectar con el backend. Verifica que el servidor esté activo.");
      } finally {
        setCargando(false);
      }
    },
    [filtroEstado, adminKey, getAdminHeaders]
  );

  useEffect(() => {
    if (isAuthenticated && adminKey) {
      cargarProductos(filtroEstado);
    }
  }, [filtroEstado, isAuthenticated, adminKey, cargarProductos]);

  const cambiarEstado = async (id, nuevoEstado, observaciones) => {
    setLoadingId(id);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/productos/${id}/estado`, {
        method: "PATCH",
        headers: getAdminHeaders({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({
          estadoRevision: nuevoEstado,
          observaciones,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detalle || data.mensaje || `Error ${res.status}`);
      }

      mostrarToast(`Producto marcado como "${nuevoEstado}" correctamente.`);
      await cargarProductos(filtroEstado);
    } catch (err) {
      setError(err.message || "No se pudo actualizar el estado del producto.");
    } finally {
      setLoadingId(null);
    }
  };

  const convertirProducto = async (id) => {
    setLoadingId(id);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/productos/${id}/convertir`, {
        method: "POST",
        headers: getAdminHeaders(),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detalle || data.mensaje || `Error ${res.status}`);
      }

      mostrarToast("Producto convertido al catálogo principal.");
      await cargarProductos(filtroEstado);
    } catch (err) {
      setError(err.message || "No se pudo convertir el producto.");
    } finally {
      setLoadingId(null);
    }
  };

  const handleAccion = (id, tipo, observaciones) => {
    if (tipo === "convertir") {
      convertirProducto(id);
    } else {
      cambiarEstado(id, tipo, observaciones);
    }
  };

  const ejecutarScraping = async () => {
    setEjecutando(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/ejecutar`, {
        method: "POST",
        headers: getAdminHeaders(),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detalle || data.mensaje || `Error ${res.status}`);
      }

      mostrarToast("Scraping ejecutado. Recargando productos...");
      await cargarProductos(filtroEstado);
    } catch (err) {
      setError(err.message || "No se pudo ejecutar el scraping. Verifica que el servidor esté activo.");
    } finally {
      setEjecutando(false);
    }
  };

  /* ─────────────────────────────────────────────────
     Pantalla de acceso administrativo
  ───────────────────────────────────────────────── */
  if (!isAuthenticated) {
    return (
      <div className="admin-login-page">
        {/* Panel izquierdo — identidad y módulos */}
        <aside className="admin-login-side">
          <div className="admin-login-side__inner">
            <div className="admin-login-side__brand">
              <span className="admin-login-side__wordmark">
                Smart<em>PC</em>
              </span>
              <span className="admin-login-side__tag">Panel interno</span>
            </div>

            <div className="admin-login-side__headline">
              <h2 className="admin-login-side__title">
                Gestión de productos<br />
                <span className="admin-login-side__title-accent">desde el origen</span>
              </h2>
              <p className="admin-login-side__desc">
                Módulo de administración interno para revisar, aprobar y publicar productos obtenidos mediante scraping automatizado.
              </p>
            </div>

            <ul className="admin-login-modules">
              <li className="admin-login-module">
                <span className="admin-login-module__dot" />
                <div>
                  <span className="admin-login-module__name">Scraping</span>
                  <span className="admin-login-module__sub">Extracción automatizada de tiendas</span>
                </div>
              </li>
              <li className="admin-login-module">
                <span className="admin-login-module__dot" />
                <div>
                  <span className="admin-login-module__name">Revisión</span>
                  <span className="admin-login-module__sub">Aprobación y descarte editorial</span>
                </div>
              </li>
              <li className="admin-login-module">
                <span className="admin-login-module__dot" />
                <div>
                  <span className="admin-login-module__name">Catálogo</span>
                  <span className="admin-login-module__sub">Publicación al recomendador</span>
                </div>
              </li>
            </ul>

            <p className="admin-login-side__footer">
              Acceso restringido para administración del catálogo
            </p>
          </div>
        </aside>

        {/* Panel derecho — formulario */}
        <main className="admin-login-main">
          <div className="admin-login-form-wrap">
            {error && (
              <div className="admin-login-error">
                <Icon.AlertCircle />
                <span>{error}</span>
              </div>
            )}

            <div className="admin-login-form-header">
              <div className="admin-login-form-eyebrow">
                <Icon.Package />
                SmartPC Admin
              </div>
              <h1 className="admin-login-form-title">Acceso administrativo</h1>
              <p className="admin-login-form-subtitle">
                Panel interno para gestión de productos scrapeados.
              </p>
            </div>

            <form onSubmit={handleLoginAdmin} className="admin-login-form">
              <div className="admin-login-field">
                <label className="admin-login-label" htmlFor="admin-key-input">
                  Clave de administrador
                </label>
                <input
                  id="admin-key-input"
                  type="password"
                  value={inputKey}
                  onChange={(e) => setInputKey(e.target.value)}
                  className="admin-login-input"
                  placeholder="••••••••••••"
                  autoComplete="current-password"
                />
              </div>

              <button type="submit" className="admin-login-submit">
                Entrar al panel
                <Icon.ArrowRight />
              </button>
            </form>

            <div className="admin-login-back">
              <Link to="/" className="admin-login-back__link">
                ← Volver al inicio
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  /* ─────────────────────────────────────────────────
     Panel normal
  ───────────────────────────────────────────────── */
  return (
    <div className="admin-root">
      {toast && (
        <div className="admin-toast">
          <Icon.Check /> {toast}
        </div>
      )}

      <header className="admin-header">
        <div className="admin-header__inner">
          <div className="admin-header__text">
            <div className="admin-header__eyebrow">
              <Icon.Package /> Scraping
            </div>

            <h1 className="admin-header__title">Administración de productos</h1>

            <p className="admin-header__subtitle">
              Revisa, aprueba y convierte productos obtenidos mediante scraping.
            </p>
          </div>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button
              className={`btn-scrape${ejecutando ? " btn-scrape--loading" : ""}`}
              onClick={ejecutarScraping}
              disabled={ejecutando}
            >
              {ejecutando ? (
                <>
                  <span className="spinner spinner--sm" /> Ejecutando...
                </>
              ) : (
                <>
                  <Icon.Refresh /> Ejecutar scraping
                </>
              )}
            </button>

            <button
              className="btn-action btn-action--ghost"
              onClick={cerrarSesionAdmin}
              type="button"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      <section className="admin-stats">
        <div className="admin-stats__inner">
          <div className="stat-card">
            <span className="stat-card__num">{stats.total}</span>
            <span className="stat-card__label">Total</span>
          </div>

          <div className="stat-card stat-card--pendiente">
            <span className="stat-card__num">{stats.pendiente}</span>
            <span className="stat-card__label">Pendientes</span>
          </div>

          <div className="stat-card stat-card--aprobado">
            <span className="stat-card__num">{stats.aprobado}</span>
            <span className="stat-card__label">Aprobados</span>
          </div>

          <div className="stat-card stat-card--descartado">
            <span className="stat-card__num">{stats.descartado}</span>
            <span className="stat-card__label">Descartados</span>
          </div>
        </div>
      </section>

      <div className="admin-filtros">
        <div className="admin-filtros__inner">
          {FILTROS.map((f) => (
            <button
              key={f.key}
              className={`filtro-btn${filtroEstado === f.key ? " filtro-btn--active" : ""}`}
              onClick={() => setFiltroEstado(f.key)}
            >
              {f.label}

              {f.key === "" && <span className="filtro-btn__count">{stats.total}</span>}
              {f.key === "pendiente" && <span className="filtro-btn__count">{stats.pendiente}</span>}
              {f.key === "aprobado" && <span className="filtro-btn__count">{stats.aprobado}</span>}
              {f.key === "descartado" && <span className="filtro-btn__count">{stats.descartado}</span>}
            </button>
          ))}
        </div>
      </div>

      <main className="admin-main">
        <div className="admin-main__inner">
          {error && (
            <div className="admin-error">
              <Icon.AlertCircle />

              <div>
                <strong>Algo salió mal</strong>
                <p>{error}</p>
              </div>

              <button className="admin-error__dismiss" onClick={() => setError(null)}>
                <Icon.X />
              </button>
            </div>
          )}

          {cargando && (
            <div className="admin-loading">
              <div className="admin-loading__spinner" />
              <span>Cargando productos...</span>
            </div>
          )}

          {!cargando && !error && productos.length === 0 && (
            <div className="admin-empty">
              <div className="admin-empty__icon">
                <Icon.Package />
              </div>

              <h3 className="admin-empty__title">Sin productos</h3>

              <p className="admin-empty__desc">
                {filtroEstado
                  ? `No hay productos con estado "${filtroEstado}".`
                  : "Ejecuta el scraping para comenzar a obtener productos."}
              </p>

              {!filtroEstado && (
                <button className="btn-scrape" onClick={ejecutarScraping} disabled={ejecutando}>
                  <Icon.Refresh /> Ejecutar scraping
                </button>
              )}
            </div>
          )}

          {!cargando && productos.length > 0 && (
            <div className="productos-grid">
              {productos.map((p) => (
                <ProductoCard
                  key={p.id}
                  producto={p}
                  onAccion={handleAccion}
                  loadingId={loadingId}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}