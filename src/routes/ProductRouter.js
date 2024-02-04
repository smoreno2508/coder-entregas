import { Router } from "express";
import autorizeRole from "../middleware/auth/authorizeRole.js";
import isAuthenticated from "../middleware/auth/isAuthenticated.js";
import * as productController from "../controllers/ProductController.js";

const router = Router();

router.get('/api/product', productController.getProducts);
router.post('/api/product',isAuthenticated, autorizeRole("ADMIN", "PREMIUM"), productController.createProduct);

router.put('/api/product/:id', isAuthenticated, autorizeRole("ADMIN"), productController.updateProduct);
router.get('/api/product/:id', productController.getProductById);
router.delete('/api/product/:id', isAuthenticated, autorizeRole("ADMIN", "PREMIUM"), productController.deleteProduct);

export default router;