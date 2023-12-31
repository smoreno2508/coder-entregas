export default class ProductSocket {
    constructor(io, producService){
        this.io = io;
        this.productService = producService;
    }

    async registerEvents(socket){

        const defaultOptions = { page: 1, limit: 12, sort: { createdAt: -1 } };

        const products = await this.productService.getProducts(defaultOptions);

        socket.emit('products', products);

        socket.on('addProduct', async (data) => {
            try {
                await this.productService.createProduct(data);
                const updatedProducts = await this.productService.getProducts(defaultOptions);
                socket.broadcast.emit('productNotification', 'New product added!!');
                this.io.emit('productsUpdated', updatedProducts);
            } catch (error) {
                console.log(error.message);
                socket.emit('productsError', error.message);
            }
        });

        socket.on('deleteProduct', async (id) => {
            try {
                await this.productService.deleteProduct(id);
                const updatedProducts = await this.productService.getProducts(defaultOptions);
                socket.broadcast.emit('productNotification', `Product with ID ${id} deleted.`);
                this.io.emit('productsUpdated', updatedProducts);
            } catch (error) {
                console.log(error.message);
                socket.emit('productsError', error.message);
            }
        });
    }
}