const jwt = require("jsonwebtoken");

module.exports = {
  
  // Generate Token
  generateToken(payload) {
    return jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || "1d" }
    );
  },

  // Verifikasi Token
  verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }

};
