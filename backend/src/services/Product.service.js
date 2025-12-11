const productRepository = require("../repositories/Product.repository");
const userRepository = require("../repositories/user.repository");

class ProductService {
    async createProduct(data) {
        return await productRepository.create(data);
    }

    async getAllProducts() {
        return await productRepository.findAll();
    }

    async getProductById(id) {
        return await productRepository.findById(id);
    }

    async updateProduct(id, data) {
        return await productRepository.update(id, data);
    }

    async deleteProduct(id) {
        return await productRepository.delete(id);
    }

    async getTopByPilihan(pilihan, limit = 4) {
        return await productRepository.findTopByPilihan(pilihan, limit);
    }

    async getLatest(limit = 6) {
        return await productRepository.findLatest(limit);
    }

    async getTotals() {
        const totalUsers = await userRepository.getTotalUsers();
        const totalProducts = await productRepository.getTotalProducts();

        return { totalUsers, totalProducts };
    }
}

module.exports = new ProductService();
