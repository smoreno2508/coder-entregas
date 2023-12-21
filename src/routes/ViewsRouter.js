import { Router } from "express";
import * as viewsController from "../controllers/ViewController.js";
const router = Router();

router.get('/login', viewsController.login);
router.get('/', viewsController.renderHomePage);

export default router;