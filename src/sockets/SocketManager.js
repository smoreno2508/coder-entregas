import ProductSocket from "./ProductSocket.js";
import MessageSocket from "./MessageSocket.js";
import CartSocket from "./CartSocket.js";

export default class SocketManager {

    constructor(io, productService, messageService, cartService) {
        this.productSocket = new ProductSocket(io, productService);
        this.messageSocket = new MessageSocket(io, messageService);
        this.cartSocket = new CartSocket(io, cartService);
        this.initializeSockets(io);
    }

    initializeSockets(io){

        io.on("connection", async (socket) => {
        
            await this.productSocket.registerEvents(socket);
            await this.messageSocket.registerEvents(socket);
            await this.cartSocket.registerEvents(socket);

        }); 
    }

    
}