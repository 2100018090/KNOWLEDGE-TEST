const userRepository = require('../repositories/user.repository');
const akunRepository = require('../repositories/akun.repository');
const User = require('../models/user.model'); // pastikan path sesuai
const Akun = require('../models/Akun'); // juga untuk Akun
const bcrypt = require('bcrypt');


class UserService {

    async addUser({ nama, email, jenis_kelamin, username, password }) {
        try {
            // 1. Cek email sudah ada
            const emailExist = await User.findOne({ email });
            if (emailExist) {
                throw new Error("Email sudah digunakan");
            }

            // 2. Cek username sudah ada
            const usernameExist = await Akun.findOne({ username });
            if (usernameExist) {
                throw new Error("Username sudah digunakan");
            }

            // 3. Buat User
            const newUser = await User.create({ nama, email, jenis_kelamin });

            // 4. Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // 5. Buat Akun
            const akun = await Akun.create({
                user_id: newUser._id,
                username,
                password: hashedPassword
            });

            return { user: newUser, akun }; // hanya return data, tanpa token
        } catch (err) {
            throw err;
        }
    }

    async getAllUsers() {
        return await User.find().sort({ createdAt: -1 }).lean(); // terbaru di atas
    }

    async updateUser(id, { nama, email, jenis_kelamin, username, password }) {
        const user = await User.findById(id);
        if (!user) throw new Error("User tidak ditemukan");

        user.nama = nama;
        user.email = email;
        user.jenis_kelamin = jenis_kelamin;
        await user.save();

        const akun = await Akun.findOne({ user_id: id });
        if (username) akun.username = username;
        if (password) akun.password = await bcrypt.hash(password, 10);
        await akun.save();

        return { user, akun };
    }

    async deleteUser(id) {
        const user = await User.findById(id);
        if (!user) throw new Error("User tidak ditemukan");

        await Akun.deleteOne({ user_id: id });
        await User.deleteOne({ _id: id });
        return true;
    }
}

module.exports = new UserService();
