const authService = require('../services/auth.service');
const tokenBlacklist = require('../utils/jwt'); // lihat bagian utils di bawah

class AuthController {
  async register(req, res) {
    try {
      const result = await authService.register(req.body);
      res.status(201).json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async login(req, res) {
    try {
      const result = await authService.login(req.body);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async logout(req, res) {
    try {
      const result = await authService.logout();
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async getProfile(req, res) {
    try {
      const userId = req.user.user_id; // data dari token

      const profile = await authService.getProfile(userId);

      return res.json({
        message: "Berhasil mengambil data user",
        data: profile
      });

    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

module.exports = new AuthController();
