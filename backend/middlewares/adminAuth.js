function verificarAdmin(req, res, next) {
  const adminKey = req.headers["x-admin-key"];

  if (!adminKey || adminKey !== process.env.ADMIN_KEY) {
    return res.status(403).json({
      mensaje: "Acceso no autorizado",
    });
  }

  next();
}

module.exports = {
  verificarAdmin,
};