import { v4 as uuidv4 } from "uuid";
import { NotFoundError, OutOfStockError } from "../errors/customErrors.js";

export default class CartService {

    constructor(cartRepository, producRepository, ticketRepository) {
        this.cartRepository = cartRepository;
        this.producRepository = producRepository;
        this.ticketRepository = ticketRepository;
    }

    async getCartById(id) {
        const cart = await this.cartRepository.getCartById(id);
        if (!cart) throw new NotFoundError("Cart not found.");
        return cart;
    }

    async getCarts() {
        const carts = await this.cartRepository.findAll();
        if (!carts) throw new NotFoundError("Carts not found.");
        return carts;
    }

    async addProductToCart(cartId, productId) {
        
        const product = await this.producRepository.findById(productId);
        
        if (product.stock === 0) throw new OutOfStockError("Product out of stock.");

        const cart = await this.cartRepository.addProductToCart(cartId, productId);
        
        await this.producRepository.update(productId, { stock: product.stock - 1 });
        
        await cart.save();
        
        return cart;
    }

    async clearCart(cartId) {  
        const cart = await this.cartRepository.clearCart(cartId);
        if (!cart) throw new NotFoundError("Cart not found.");
        return cart;
    }

    async purchaseCart(cartId, data) {
        const cart = await this.getCartById(cartId);
        
        if (!cart) throw new NotFoundError("Cart not found.");

        const dataFormated = {
            code: uuidv4(),
            purchase_datetime: new Date(),
            ...data,
        }
        const ticket = await this.ticketRepository.create(dataFormated);
        
        await this.clearCart(cartId);

        return ticket;
    }
}