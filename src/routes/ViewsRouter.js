import { Router } from "express";
import isAuthenticated from "../middleware/auth/isAuthenticated.js";
import redirectIfAuthenticated from "../middleware/auth/redirectIfAuthenticated.js";
import authorizeRole from "../middleware/auth/authorizeRole.js";
import * as viewsController from "../controllers/ViewController.js";

const router = Router();

router.get('/login', redirectIfAuthenticated, viewsController.login);
router.get('/logout', viewsController.logout);
router.get("/register", async (req, res) => {
    res.render("auth/register");
});

router.get("/reset", async (req, res) =>{
    res.render("auth/requestResetPassword");
})

router.get('/api/auth/reset-password', viewsController.resetPasswordRender);
router.get('/', isAuthenticated, viewsController.renderHomePage);
router.get('/chat', isAuthenticated, authorizeRole("CLIENT","PREMIUM"), viewsController.renderChat);
router.get('/admin/dashboard', isAuthenticated, authorizeRole("ADMIN"), viewsController.renderDashBoardAdmin);
router.get('/admin/users', isAuthenticated, authorizeRole("ADMIN"), viewsController.renderUserListForAdmin);
router.get('/admin/tickets', isAuthenticated, authorizeRole("ADMIN"), viewsController.renderOrderDetailForAdmin);
router.get('/cart/:id/complete', isAuthenticated, authorizeRole("CLIENT","PREMIUM"), viewsController.orderComplete);
// router.get('/admin/users/:id', isAuthenticated, authorizeRole("ADMIN"), viewsController.renderUserDetailForAdmin);
router.get('/admin/products', isAuthenticated, authorizeRole("ADMIN"), viewsController.renderProductListForAdmin);
router.delete('/admin/products/:id', isAuthenticated, authorizeRole("ADMIN"), viewsController.deleteProductAdmin);
router.get('/cart/:id', isAuthenticated, authorizeRole("CLIENT","PREMIUM"), viewsController.getCartById);

export default router;