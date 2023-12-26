import { NotFoundError } from "../errors/customErrors.js";
export default class TicketService {
    
    constructor(ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    async create(ticket){
        const createdTicket = await this.ticketRepository.create(ticket);
        return createdTicket;
    }
    
    async findAll(){
        const tickets = await this.ticketRepository.findAll();
        if(tickets.length === 0) throw new NotFoundError("No tickets found.");
        return tickets;
    }

    async findById(id){
        const ticket = await this.ticketRepository.findById(id);
        if(!ticket) throw new NotFoundError("Ticket not found.");
        return ticket;
    }   
}