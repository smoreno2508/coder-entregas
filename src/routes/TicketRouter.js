import { Router } from "express";

import isAuthenticated from "../middleware/auth/isAuthenticated.js";
import autorizeRole from "../middleware/auth/authorizeRole.js";
import * as ticketController from "../controllers/TicketController.js";

const router = Router(); 

router.get('/api/ticket', isAuthenticated, autorizeRole("ADMIN"), ticketController.getTickets);
router.get('/api/ticket/:id', isAuthenticated, ticketController.getTicketById);
router.post('/api/ticket', isAuthenticated, ticketController.createTicket);

export default router;