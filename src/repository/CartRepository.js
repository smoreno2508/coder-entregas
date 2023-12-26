import BaseRepository from "./BaseRepository.js";

export default class CartRepository extends BaseRepository {
    constructor(model) {
        super(model)
    }


    async getCartById(id) {
        return await this.model.findById(id).populate("products.product");
    }

    async createCart() {
        const cartData = { products: [] };
        return await this.create(cartData);
    }

    async addProductToCart(cartId, productId) {
        const cart = await this.model.findById(cartId);
        const productIndex = cart.products.findIndex(p => p.product.equals(productId));

        if(productIndex === -1) {
            cart.products.push({product: productId, quantity: 1});
        } else {
            cart.products[productIndex].quantity++;
        }

        return cart.save();   
    }

    async clearCart(cartId) {
        const cart = await this.model.findById(cartId);
        cart.products = [];
        return cart.save();
    }
}