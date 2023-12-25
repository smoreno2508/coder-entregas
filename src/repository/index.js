import { UserModel } from "../models/UserModel.js";
import { CartModel } from "../models/CartModel.js";
import { ProductModel } from "../models/ProductModel.js";
import UserRepository from "./UserRepository.js";
import CartRepository from "./CartRepository.js";
import ProductRepository from "./ProductRepository.js";

const userRepository = new UserRepository(UserModel);
const cartRepository = new CartRepository(CartModel);
const productRepository = new ProductRepository(ProductModel);

export {
    userRepository,
    cartRepository,
    productRepository
}