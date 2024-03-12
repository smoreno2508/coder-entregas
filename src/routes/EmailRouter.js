import { Router } from "express";
import * as emailController from "../controllers/emailController.js";

const router = Router();

router.get('/api/auth/reset/:email', emailController.sendEmailResetPassword);


export default router;