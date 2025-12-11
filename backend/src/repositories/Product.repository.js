const Product = require("../models/Product.model");

class ProductRepository {
    async create(data) {
        const product = new Product(data);
        return await product.save();
    }

    async findAll() {
        return await Product.find();
    }

    async findById(id) {
        return await Product.findById(id);
    }

    async update(id, data) {
        return await Product.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await Product.findByIdAndDelete(id);
    }

    async findTopByPilihan(pilihan, limit = 4) {
        return await Product.find({ pilihan: pilihan }).limit(limit);
    }

    async findLatest(limit = 6) {
        return await Product.find().sort({ createdAt: -1 }).limit(limit);
    }

    async getTotalProducts() {
        return await Product.countDocuments();
    }

}

module.exports = new ProductRepository();
