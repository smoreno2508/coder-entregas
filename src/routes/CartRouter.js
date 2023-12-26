import { Router } from "express";
import * as cartController from "../controllers/CartController.js";

const router = Router();

router.get('/api/cart/:id', cartController.getCartByID);
router.get('/api/cart', cartController.getCarts);
router.post('/api/cart/:cid/product/:pid', cartController.addProductToCart);
router.delete('/api/cart/:id/clear', cartController.clearCart);
router.post('/api/cart/:cid/purchase', cartController.purchaseCart);

export default router;