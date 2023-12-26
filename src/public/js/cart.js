const socket = io();

async function addProductToCart(productId, cartId) {
    socket.emit("addProductToCart", cartId, productId);    
}

socket.on('cartUpdatedNotification', (message) =>{
    
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
    });

    Toast.fire({
        icon: 'success',
        title: message
    });
});

socket.on('cartUpdated', (data) =>{
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = data.cartCount;
    }
});
