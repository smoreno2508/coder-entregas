import { Router } from "express";
import autorizeRole from "../middleware/auth/authorizeRole.js";
import isAuthenticated from "../middleware/auth/isAuthenticated.js";
import * as userController from "../controllers/UserController.js";

const router = Router();

router.get('/api/user', isAuthenticated, autorizeRole("ADMIN"), userController.getAllUsers);
router.post('/api/user', isAuthenticated, autorizeRole("ADMIN"), userController.createUser);
router.put('/api/user/:id', isAuthenticated, autorizeRole("ADMIN"), userController.updateUser);
router.get('/api/user/:id', isAuthenticated, autorizeRole("ADMIN","CLIENT"),userController.getUserById);
router.post('/api/auth/reset-password', userController.resetPassword);
router.put('/api/user/premium/:uid', isAuthenticated, autorizeRole("ADMIN"), userController.updateUserRole);

export default router;