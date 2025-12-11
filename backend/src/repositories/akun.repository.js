const Akun = require("../models/Akun");

class AkunRepository {
    async findByUsername(username) {
        return await Akun.findOne({ username });
    }

    async findByUserId(userId) {
        return await Akun.findOne({ user_id: userId });
    }

    async createAkun(data) {
        return await Akun.create(data);
    }

    async deleteById(id) {
        return await Akun.findByIdAndDelete(id);
    }

    async deleteByUserId(userId) {
        return Akun.findOneAndDelete({ user_id: userId });
    }

}

module.exports = new AkunRepository();
