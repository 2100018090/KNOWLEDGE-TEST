const userService = require('../services/user.service');

class UserController {
    
    async getAllUsers(req, res) {
        try {
            const users = await userService.getAllUsers();
            res.json(users);
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    }

    async updateUser(req, res) {
        try {
            const result = await userService.updateUser(req.params.id, req.body);
            res.json({ success: true, data: result });
        } catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    }

    async deleteUser(req, res) {
        try {
            await userService.deleteUser(req.params.id);
            res.json({ success: true, message: "User berhasil dihapus" });
        } catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    }

    async addUser(req, res) {
        try {
            const { nama, email, jenis_kelamin, username, password } = req.body;
            const result = await userService.addUser({ nama, email, jenis_kelamin, username, password });

            res.status(201).json({
                success: true,
                message: "User + Akun berhasil dibuat",
                data: result
            });
        } catch (err) {
            console.error(err);
            res.status(400).json({
                success: false,
                message: err.message || "Gagal menambah user + akun"
            });
        }
    }

    async getTotalUsers(req, res) {
        try {
            const total = await userService.getTotalUsers();
            res.status(200).json({ total });
        } catch (error) {
            console.error("Gagal mengambil total user:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}

module.exports = new UserController();
