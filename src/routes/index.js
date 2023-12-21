import { Router } from "express";
import viewsRouter from "./ViewsRouter.js";
import userRouter from './UserRouter.js';
import authRouter from './AuthRouter.js';
import cartRouter from './CartRouter.js';

const router = Router();

router.use('/', viewsRouter);
router.use('/', userRouter )
router.use('/', authRouter);
router.use('/', cartRouter);

export default router;