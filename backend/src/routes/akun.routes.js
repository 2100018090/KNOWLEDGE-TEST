const express = require("express");
const router = express.Router();
const akunController = require("../controllers/akun.controller");

// REGISTER AKUN
router.post("/register", akunController.register);

// LOGIN
router.post("/login", akunController.login);

// DELETE AKUN
router.delete("/:id", akunController.delete);

module.exports = router;
