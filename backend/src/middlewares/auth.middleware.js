const { verifyToken } = require("../utils/jwt");

module.exports = function (req, res, next) {
  try {
    const header = req.headers.authorization;

    if (!header) {
      return res.status(401).json({ error: "Token tidak ditemukan" });
    }

    const token = header.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Token tidak valid" });
    }

    const decoded = verifyToken(token);

    req.user = decoded; // simpan payload ke request
    next();

  } catch (err) {
    return res.status(401).json({ error: "Token tidak valid atau expired" });
  }
};
