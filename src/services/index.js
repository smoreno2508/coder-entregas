import UserService from "./UserService.js";
import CartService from "./CartService.js";
import ProductService from "./ProductService.js";
import MessageService from "./MessageService.js";
import TicketService from "./TicketService.js";
import { userRepository, cartRepository, productRepository, messageRepository, ticketRepository} from "../repository/index.js";


const userService = new UserService(userRepository, cartRepository);
const cartService = new CartService(cartRepository, productRepository, ticketRepository);
const productService = new ProductService(productRepository);
const messageService = new MessageService(messageRepository);
const ticketService = new TicketService(ticketRepository);

export {
    userService,
    cartService,
    productService,
    messageService,
    ticketService
}