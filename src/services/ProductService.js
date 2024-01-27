import { ConflictError, InternalServerError, NotFoundError } from "../errors/customErrors.js";
export default class ProductService {

    constructor(productRepository) {
        this.productRepository = productRepository;
    }

    async productExists(code) {
        return await this.productRepository.productExist(code);
    }

    async createProduct(product) {

        if (await this.productExists(code)) {
            throw new ConflictError(`Product with the code ${code} already exists!`);
        }

        const productAdded = await this.productRepository.create(product);

        if (!productAdded) {
            throw new InternalServerError("Product not created.");
        }

        return productAdded;
    }

    async getProducts({ limit = 12, page = 1, sort = {}, query = {} } = {}) {

        const sortOptions = {
            "asc": { price: 1 },
            "desc": { price: -1 },
            "default": { createdAt: -1 }
        }

        const sortOrder = sortOptions[sort] || sortOptions["default"];

        const options = {
            page,
            limit,
            sort: sortOrder
        }

        const products = await this.productRepository.getProducts(query, options);

        if (!products.docs.length) {
            throw new NotAvailableError('No products available.');
        }

        return products;
    }

    async getUniqueCategories() {
        return await this.productRepository.getCategories();
    }

    async getProductById(id) {
        const product = await this.productRepository.findById(id);
        if (!product) {
            throw new NotFoundError("Product not found.");
        }
        return product;
    }

    async updateProduct(id, product) {
        const productUpdate = await this.productRepository.update(id, product);
        if (!productUpdate) {
            throw new NotFoundError("Product not found.");
        }
        return productUpdate;
    }

    async deleteProduct(id) {
        const productDelete = await this.productRepository.delete(id);
        if (!productDelete) {
            throw new NotFoundError("Product not found.");
        }
        return productDelete;
    }

    async updateProductStock(id, quantity) {
        const productUpdate = await this.productRepository.updateStock(id, quantity);
        if (productUpdate.nModified === 0) {
            throw new ConflictError("Not enough stock.");
        }
    }



}