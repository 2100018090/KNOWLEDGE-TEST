const productService = require("../services/Product.service");

class ProductController {
  async create(req, res) {
    try {
      const { file } = req;
      const data = req.body;
      if (file) data.gambar = `/uploads/${file.filename}`;
      // convert pilihan ke boolean
      if (data.pilihan !== undefined) data.pilihan = data.pilihan === 'true' || data.pilihan === true;
      const product = await productService.createProduct(data);
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const products = await productService.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const product = await productService.getProductById(req.params.id);
      if (!product) return res.status(404).json({ message: "Product not found" });
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const { file } = req;
      const { nama, harga, kategori, pilihan } = req.body;

      // Ambil data yang akan diupdate
      const data = {};

      if (nama) data.nama = nama;
      if (harga) data.harga = harga;
      if (kategori) data.kategori = kategori;

      // Pilihan harus dikonversi ke boolean jika dikirim
      if (pilihan !== undefined) {
        data.pilihan = pilihan === 'true' || pilihan === true;
      }

      // Update gambar hanya jika ada file baru
      if (file) {
        data.gambar = `/uploads/${file.filename}`;
      }

      const product = await productService.updateProduct(req.params.id, data);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const product = await productService.deleteProduct(req.params.id);
      if (!product) return res.status(404).json({ message: "Product not found" });
      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getTopByPilihan(req, res) {
    try {
      let { pilihan } = req.query;

      if (pilihan === undefined) pilihan = true;

      // Konversi ke boolean
      const pilihanBool = pilihan === 'true' || pilihan === true;

      const products = await productService.getTopByPilihan(pilihanBool, 4);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getLatest(req, res) {
    try {
      const products = await productService.getLatest(6);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getTotals(req, res) {
    try {
      const totals = await productService.getTotals();

      res.status(200).json({
        success: true,
        data: totals
      });
    } catch (error) {
      // Cetak error di console agar bisa dilacak
      console.error("Error in StatsController.getTotals:", error);

      // Kirim response error dengan pesan asli
      res.status(500).json({
        success: false,
        message: error.message || "Gagal mengambil data totals"
      });
    }
  }

}

module.exports = new ProductController();
