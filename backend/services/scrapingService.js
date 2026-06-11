const pool = require("../database/connection");

async function buscarProductoPorLink(linkTienda) {
  const [rows] = await pool.query(
    `
    SELECT id
    FROM productos_scraping
    WHERE link_tienda = ?
    LIMIT 1
    `,
    [linkTienda]
  );

  return rows[0] || null;
}

async function guardarResultadosScraping(resultados) {
  let guardados = 0;
  let actualizados = 0;

  for (const item of resultados) {
    const existente = await buscarProductoPorLink(item.linkTienda);

    if (existente) {
      await pool.query(
        `
        UPDATE productos_scraping
        SET 
          precio = ?,
          tienda = ?,
          cpu_detectado = ?,
          gpu_detectada = ?,
          ram_gb = ?,
          almacenamiento_gb = ?,
          query_busqueda = ?,
          fecha_scraping = CURRENT_TIMESTAMP
        WHERE id = ?
        `,
        [
          item.precio,
          item.tienda,
          item.specsDetectadas?.cpu || null,
          item.specsDetectadas?.gpu || "Integrada",
          item.specsDetectadas?.ramGB || null,
          item.specsDetectadas?.almacenamientoGB || null,
          item.queryBusqueda,
          existente.id,
        ]
      );

      actualizados++;
      continue;
    }

    await pool.query(
      `
      INSERT INTO productos_scraping (
        nombre,
        precio,
        tienda,
        link_tienda,
        disponible,
        query_busqueda,
        cpu_detectado,
        gpu_detectada,
        ram_gb,
        almacenamiento_gb,
        estado_revision
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        item.nombre,
        item.precio,
        item.tienda,
        item.linkTienda,
        true,
        item.queryBusqueda,
        item.specsDetectadas?.cpu || null,
        item.specsDetectadas?.gpu || "Integrada",
        item.specsDetectadas?.ramGB || null,
        item.specsDetectadas?.almacenamientoGB || null,
        "pendiente",
      ]
    );

    guardados++;
  }

  return {
    guardados,
    actualizados,
  };
}


async function obtenerProductosScraping(estado = null) {
  let query = `
    SELECT 
      id,
      nombre,
      precio,
      tienda,
      link_tienda,
      cpu_detectado,
      gpu_detectada,
      ram_gb,
      almacenamiento_gb,
      query_busqueda,
      estado_revision,
      observaciones,
      tipo_producto,
      gama_detectada,
      fecha_scraping
    FROM productos_scraping
  `;

  const params = [];

  if (estado) {
    query += ` WHERE estado_revision = ?`;
    params.push(estado);
  }

  query += ` ORDER BY fecha_scraping DESC`;

  const [rows] = await pool.query(query, params);

  return rows;
}

async function actualizarEstadoProductoScraping(id, estadoRevision, observaciones = null) {
  const estadosValidos = ["pendiente", "aprobado", "descartado"];

  if (!estadosValidos.includes(estadoRevision)) {
    throw new Error("Estado de revisión no válido");
  }

  const [result] = await pool.query(
    `
    UPDATE productos_scraping
    SET 
      estado_revision = ?,
      observaciones = ?
    WHERE id = ?
    `,
    [estadoRevision, observaciones, id]
  );

  return result.affectedRows > 0;
}

async function obtenerProductoScrapingPorId(id) {
  const [rows] = await pool.query(
    `
    SELECT 
      id,
      nombre,
      precio,
      tienda,
      link_tienda,
      cpu_detectado,
      gpu_detectada,
      ram_gb,
      almacenamiento_gb,
      query_busqueda,
      estado_revision,
      observaciones,
      tipo_producto,
      gama_detectada,
      fecha_scraping
    FROM productos_scraping
    WHERE id = ?
    LIMIT 1
    `,
    [id]
  );

  return rows[0] || null;
}
module.exports = {
  guardarResultadosScraping,
  obtenerProductosScraping,
  actualizarEstadoProductoScraping,
  obtenerProductoScrapingPorId,
};