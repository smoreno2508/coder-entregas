import { NotFoundError } from "../errors/customErrors.js";

export default class CartService{
    
    constructor(cartRepository){
        this.cartRepository = cartRepository;
    }

    async getCartById(id){
        const cart = await this.cartRepository.findById(id);
        if(!cart) throw new NotFoundError("Cart not found.");
        return cart;
    }
}