import { Router } from 'express';
import * as authController from "../controllers/AuthController.js";
import * as userController from "../controllers/UserController.js";

const router = Router();

router.post("/login", authController.jwtLogin);
router.post("/register", userController.createUser);

router.get("/auth/github", authController.passportGithubLogin);
router.get("/auth/github/callback", authController.passportGithubCallback);


export default router;