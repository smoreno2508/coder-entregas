import { cartService } from "../services/index.js"; 
import { successResponse } from "../helpers/responseMaker.js";

const getCartByID = async (req, res, next) => {
    try {
        const cart = await cartService.getCartById(req.params.id);
        successResponse(res, "Cart fetched successfully", cart);
    } catch (err) {
        next(err);
    }
}


const addProductToCart = async (req, res, next) => {
    try {
        const { cid, pid } = req.params;
        const cart = await cartService.addProductToCart(cid, pid);

        successResponse(res, "Product added to cart successfully", cart);

    } catch (err) {
        next(err);
    }
}

const getCarts = async (req, res, next) => {
    try {
        const carts = await cartService.getCarts();
        successResponse(res, "Carts fetched successfully", carts);
    } catch (err) { 
        next(err);  
    }
}

// todo: implementar
const removeProductFromCart = async (req, res, next) => {

}

const clearCart = async (req, res, next) => {  
    try{
        const cart = await cartService.clearCart(req.params.id);
        successResponse(res, "Cart cleared successfully", cart);
    }catch(err){
        next(err);
    }
}

const purchaseCart = async (req, res, next) => {
    try {
        const ticket = await cartService.purchaseCart(req.params.cid, req.body);
        successResponse(res, "Cart purchased successfully", ticket);
    } catch (err) {
        next(err);
    }
}

export {
    getCartByID,
    getCarts,
    addProductToCart,
    clearCart, 
    purchaseCart,
}