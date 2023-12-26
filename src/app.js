import Server from "./config/Server.js";
import { productService, messageService, cartService } from "./services/index.js";

console.clear();
new Server(productService, messageService, cartService).start();