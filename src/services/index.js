import UserService from "./UserService.js";
import CartService from "./CartService.js";
import ProductService from "./ProductService.js";
import { userRepository, cartRepository, productRepository} from "../repository/index.js";


const userService = new UserService(userRepository, cartRepository);
const cartService = new CartService(cartRepository);
const productService = new ProductService(productRepository);

export {
    userService,
    cartService,
    productService
}