import { Router } from "express";
import isAuthenticated from "../middleware/auth/isAuthenticated.js";
import redirectIfAuthenticated from "../middleware/auth/redirectIfAuthenticated.js";
import authorizeRole from "../middleware/auth/authorizeRole.js";
import * as viewsController from "../controllers/ViewController.js";

const router = Router();

router.get('/login', redirectIfAuthenticated, viewsController.login);
router.get('/logout', viewsController.logout);
router.get('/', isAuthenticated, viewsController.renderHomePage);
router.get('/admin/dashboard', isAuthenticated, authorizeRole("ADMIN"), viewsController.renderDashBoardAdmin);
router.get('/admin/users', isAuthenticated, authorizeRole("ADMIN"), viewsController.renderUserListForAdmin);
// router.get('/admin/users/:id', isAuthenticated, authorizeRole("ADMIN"), viewsController.renderUserDetailForAdmin);
router.get('/admin/products', isAuthenticated, authorizeRole("ADMIN"), viewsController.renderProductListForAdmin);
router.delete('/admin/products/:id', isAuthenticated, authorizeRole("ADMIN"), viewsController.deleteProductAdmin);

export default router;