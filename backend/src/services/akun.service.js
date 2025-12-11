const akunRepository = require("../repositories/akun.repository");
const bcrypt = require("bcrypt");

class AkunService {

    async register({ user_id, username, password }) {

        const exists = await akunRepository.findByUsername(username);
        if (exists) throw new Error("Username sudah digunakan");

        const hash = await bcrypt.hash(password, 10);

        const akun = await akunRepository.createAkun({
            user_id,
            username,
            password: hash
        });

        akun.password = undefined;
        return akun;
    }

    async login({ username, password }) {

        const akun = await akunRepository.findByUsername(username);
        if (!akun) throw new Error("Username tidak ditemukan");

        const match = await bcrypt.compare(password, akun.password);
        if (!match) throw new Error("Password salah");

        akun.password = undefined;

        return akun;
    }

    async delete(id) {
        const deleted = await akunRepository.deleteById(id);
        if (!deleted) throw new Error("Akun tidak ditemukan");
        return deleted;
    }

    async getByUserId(user_id) {
        return await akunRepository.findByUserId(user_id);
    }

}

module.exports = new AkunService();
