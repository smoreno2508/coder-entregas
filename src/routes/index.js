import { Router } from "express";
import viewsRouter from "./ViewsRouter.js";
import userRouter from './UserRouter.js';
import authRouter from './AuthRouter.js';
import cartRouter from './CartRouter.js';
import productRouter from './ProductRouter.js';

const router = Router();

router.use('/', viewsRouter);
router.use('/', userRouter )
router.use('/', authRouter);
router.use('/', cartRouter);
router.use('/', productRouter);

export default router;