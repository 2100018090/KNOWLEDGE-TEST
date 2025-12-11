const akunService = require("../services/akun.service");

class AkunController {

    async register(req, res) {
        try {
            const akun = await akunService.register(req.body);
            res.status(201).json({
                message: "Akun berhasil dibuat",
                akun
            });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async login(req, res) {
        try {
            const akun = await akunService.login(req.body);
            res.json({
                message: "Login akun berhasil",
                akun
            });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async delete(req, res) {
        try {
            const deleted = await akunService.delete(req.params.id);
            res.json({
                message: "Akun berhasil dihapus",
                deleted
            });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async getByUserId(req, res) {
        try {
            const akun = await akunService.getByUserId(req.params.user_id);
            res.json(akun);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

}

module.exports = new AkunController();
