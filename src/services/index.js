import UserService from "./UserService.js";
import CartService from "./CartService.js";
import { userRepository, cartRepository } from "../repository/index.js";


const userService = new UserService(userRepository, cartRepository);
const cartService = new CartService(cartRepository);

export {
    userService,
    cartService,
}