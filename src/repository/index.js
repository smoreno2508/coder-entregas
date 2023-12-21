import { UserModel } from "../models/UserModel.js";
import { CartModel } from "../models/CartModel.js";
import UserRepository from "./UserRepository.js";
import CartRepository from "./CartRepository.js";

const userRepository = new UserRepository(UserModel);
const cartRepository = new CartRepository(CartModel);
export {
    userRepository,
    cartRepository,
}