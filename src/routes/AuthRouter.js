import { Router } from 'express';
import * as authController from "../controllers/AuthController.js";

const router = Router();

router.post("/api/login", authController.jwtLogin);

export default router;