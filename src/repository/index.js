import { UserModel } from "../models/UserModel.js";
import { CartModel } from "../models/CartModel.js";
import { ProductModel } from "../models/ProductModel.js";
import { MessageModel } from "../models/MessageModel.js";
import { TicketModel } from "../models/TicketModel.js";
import UserRepository from "./UserRepository.js";
import CartRepository from "./CartRepository.js";
import ProductRepository from "./ProductRepository.js";
import MessageRepository from "./MessageRepository.js";
import TicketRepository from "./TicketRepository.js";   

const userRepository = new UserRepository(UserModel);
const cartRepository = new CartRepository(CartModel);
const productRepository = new ProductRepository(ProductModel);
const messageRepository = new MessageRepository(MessageModel);
const ticketRepository = new TicketRepository(TicketModel);

export {
    userRepository,
    cartRepository,
    productRepository,
    messageRepository,
    ticketRepository,
}