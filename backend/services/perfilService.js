const pool = require("../database/connection");

function normalizarNombrePerfil(nombre = "") {
  return String(nombre)
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

async function obtenerPesosPerfiles() {
  const [rows] = await pool.query(`
    SELECT 
      p.id AS perfil_id,
      p.nombre AS perfil,
      pp.tipo_componente,
      pp.peso
    FROM perfiles p
    JOIN perfil_pesos pp ON pp.perfil_id = p.id
    ORDER BY p.nombre, pp.peso DESC
  `);

  const perfiles = {};

  rows.forEach((row) => {
    const key = normalizarNombrePerfil(row.perfil);

    if (!perfiles[key]) {
      perfiles[key] = {
        id: row.perfil_id,
        nombre: row.perfil,
        pesos: {},
      };
    }

    perfiles[key].pesos[row.tipo_componente] = Number(row.peso);
  });

  return perfiles;
}

async function obtenerPesosPerfilPorNombre(nombrePerfil) {
  const nombreNormalizado = normalizarNombrePerfil(nombrePerfil);

  const perfiles = await obtenerPesosPerfiles();

  const perfil = perfiles[nombreNormalizado];

  if (!perfil) {
    throw new Error("Perfil no encontrado");
  }

  return perfil;
}

module.exports = {
  obtenerPesosPerfiles,
  obtenerPesosPerfilPorNombre,
};