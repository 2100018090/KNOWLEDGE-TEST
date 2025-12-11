const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const productController = require("../controllers/product.controller");

// konfigurasi multer untuk upload gambar
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads")); // folder src/uploads
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // nama file unik
  }
});

const upload = multer({ storage });

router.get("/latest", productController.getLatest);
router.get("/top", productController.getTopByPilihan);
router.get('/totals', productController.getTotals);
// CRUD routes
router.post("/", upload.single("gambar"), productController.create);
router.get("/", productController.getAll);
router.get("/:id", productController.getById);
router.put("/:id", upload.single("gambar"), productController.update);
router.delete("/:id", productController.delete);


module.exports = router;
