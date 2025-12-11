const express = require("express");
const cors = require("cors");
const path = require("path");

const userRoutes = require("./routes/user.routes");
const akunRoutes = require("./routes/akun.routes");
const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");

const app = express();
app.use(cors());
app.use(express.json());

// akses gambar
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/akun", akunRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

module.exports = app;
