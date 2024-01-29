import { Router } from "express";
import viewsRouter from "./ViewsRouter.js";
import userRouter from './UserRouter.js';
import authRouter from './AuthRouter.js';
import cartRouter from './CartRouter.js';
import productRouter from './ProductRouter.js';
import ticketRouter from './TicketRouter.js';
import emailRouter from './EmailRouter.js';

const router = Router();

router.use('/', viewsRouter);
router.use('/', userRouter )
router.use('/api/', authRouter);
router.use('/', cartRouter);
router.use('/', productRouter);
router.use('/', ticketRouter);
router.use('/', emailRouter);

export default router;