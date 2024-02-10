import Server from "./config/Server.js";
import { productService, messageService, cartService } from "./services/index.js";

console.clear();
const server = new Server(productService, messageService, cartService);

server.start();

const app = server.getApp();

export default app;