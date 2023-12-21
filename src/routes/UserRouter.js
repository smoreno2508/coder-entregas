import { Router } from "express";
import passport from "../middleware/Passport.js";
import autorizeRole from "../middleware/auth/authorizeRole.js";
import isAuthenticated from "../middleware/auth/isAuthenticated.js";
import * as userController from "../controllers/UserController.js";

const router = Router();

router.get('/api/user', isAuthenticated, autorizeRole("ADMIN"), userController.getAllUsers);
router.post('/api/user', isAuthenticated, autorizeRole("ADMIN"), userController.createUser);
router.get('/api/user/:id', isAuthenticated, autorizeRole("ADMIN","CLIENT"),userController.getUserById);


export default router;