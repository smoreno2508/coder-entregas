import { cartService } from "../services/index.js"; 
import { successResponse } from "../helpers/responseMaker.js";

export const getCartByID = async (req, res, next) => {
    try {
        const cart = await cartService.getCartById(req.params.id);
        successResponse(res, "Cart fetched successfully", cart);
    } catch (err) {
        next(err);
    }
}