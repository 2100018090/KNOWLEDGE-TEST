const mongoose = require("mongoose");
const User = require("../models/user.model");
const Akun = require("../models/Akun");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { hashPassword, comparePassword } = require("../utils/hash");
const { generateToken } = require("../utils/jwt");

class AuthService {

  async register({ nama, email, jenis_kelamin, username, password }) {
    try {
      // 1. Cek email sudah ada atau belum
      const emailExist = await User.findOne({ email });
      if (emailExist) {
        throw new Error("Email sudah digunakan");
      }

      // 2. Cek username sudah ada atau belum
      const usernameExist = await Akun.findOne({ username });
      if (usernameExist) {
        throw new Error("Username sudah digunakan");
      }

      // 3. Buat User
      const newUser = await User.create({
        nama,
        email,
        jenis_kelamin
      });

      // 4. Hash password pakai helper
      const hashed = await hashPassword(password);

      // 5. Buat Akun
      const akun = await Akun.create({
        user_id: newUser._id,
        username,
        password: hashed
      });

      return {
        message: "Registrasi berhasil",
        user: newUser,
        akun
      };

    } catch (err) {
      throw err;
    }
  }

  async login({ username, password }) {
    try {
      // 1. Cek apakah username ada di database
      const akun = await Akun.findOne({ username });
      if (!akun) {
        throw new Error("Username tidak ditemukan");
      }

      // 2. Cek password
      const validPassword = await comparePassword(password, akun.password);
      if (!validPassword) {
        throw new Error("Password salah");
      }

      // 3. Ambil data user berdasarkan user_id
      const user = await User.findById(akun.user_id);
      if (!user) {
        throw new Error("Data user tidak ditemukan");
      }

      // 4. Generate token menggunakan helper
      const token = generateToken({
        user_id: user._id,
        akun_id: akun._id,
        nama: user.nama,
        email: user.email
      });

      return {
        message: "Login berhasil",
        token,
        user
      };

    } catch (err) {
      throw err;
    }
  }

  // ============= LOGOUT =============
  async logout() {
    // Untuk aplikasi tanpa refresh token, logout hanya dilakukan di frontend.
    return { message: "Logout berhasil" };
  }

  async getProfile(userId) {
    // Ambil data user
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User tidak ditemukan");
    }

    // Ambil akun
    const akun = await Akun.findOne({ user_id: user._id });

    return {
      user,
      akun
    };
  }

}

module.exports = new AuthService();
