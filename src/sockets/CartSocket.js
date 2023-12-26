export default class CartSocket {
   
    constructor(io, cartService){
        this.io = io;
        this.cartService = cartService;
    }

    async registerEvents(socket){

        socket.on('addProductToCart', async (cartId, productId) => {
            try {
                const updatedCart = await this.cartService.addProductToCart(cartId, productId);
                this.io.emit('cartUpdatedNotification', "Product added to cart");
                const totalItemCount = updatedCart.products.reduce((total, product) => total + product.quantity, 0);
                this.io.emit('cartUpdated', { cartCount: totalItemCount });

            } catch (error) {
                console.log(error.message);
                socket.emit('cartError', error.message);
            }
        });

    }
}