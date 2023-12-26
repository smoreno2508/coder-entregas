import { ticketService } from "../services/index.js";
import { successResponse } from "../helpers/responseMaker.js";

const getTickets = async (req, res, next) => {  
    try{
        const tickets = await ticketService.findAll();
        successResponse(res, "Tickets fetched successfully", tickets);
    }catch(err){
        next(err);
    }
}

const getTicketById = async (req, res, next) => {  
    try{
        const ticket = await ticketService.findById(req.params.id);
        successResponse(res, "Ticket fetched successfully", ticket);
    }catch(err){
        next(err);
    }
}

const createTicket = async (req, res, next) => {
    try{
        const ticket = await ticketService.create(req.body);
        successResponse(res, "Ticket created successfully", ticket);
    }catch(err){
        next(err);
    }
}


export {
    getTickets,
    getTicketById,
    createTicket,
}
