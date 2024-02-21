import { Router } from "express";
import autorizeRole from "../middleware/auth/authorizeRole.js";
import isAuthenticated from "../middleware/auth/isAuthenticated.js";
import upload from "../middleware/multerMiddleware.js";
import * as userController from "../controllers/UserController.js";

const router = Router();

router.get('/user', isAuthenticated, autorizeRole("ADMIN"), userController.getAllUsers);
router.post('/user', isAuthenticated, autorizeRole("ADMIN"), userController.createUser);
router.put('/user/:id', isAuthenticated, autorizeRole("ADMIN"), userController.updateUser);
router.get('/user/:id', isAuthenticated, autorizeRole("ADMIN","CLIENT"),userController.getUserById);
router.post('/auth/reset-password', userController.resetPassword);
router.put('/user/premium/:uid', isAuthenticated, autorizeRole("ADMIN"), userController.updateUserRole);
router.post('/user/:id/documents', isAuthenticated, upload.fields([
    {name: "dni", maxCount: 1},
    {name: "address", maxCount: 1},
    {name: "bank", maxCount: 1}
]), userController.saveUserDocuments);

export default router;