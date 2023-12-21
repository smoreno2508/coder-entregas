import { Router } from "express";
import * as cartController from "../controllers/CartController.js";

const router = Router();

router.get('/api/cart/:id', cartController.getCartByID);

export default router;