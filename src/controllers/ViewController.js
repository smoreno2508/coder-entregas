import { userService, productService, cartService, ticketService } from "../services/index.js";
import { v4 as uuidv4 } from 'uuid';

const formatUserList = (users) => users.map(user => user.toObject());
const formatTicketList = (tickets) => tickets.map(ticket => ticket.toObject());

const paginate = (items) => ({
    ...items,
    pages: Array.from({ length: items.totalPages }, (_, i) => i + 1)
});


const renderHomePage = async (req, res, next) => {

    const { page, limit, sort, ...query } = req.query;

    const productList = await productService.getProducts({
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 12,
        sort,
        query
    });

    const pagination = paginate(productList);
    const categories = await productService.getUniqueCategories();

    if (req.user) {

        if (req.user.role === "ADMIN") return res.redirect('/admin/dashboard');

        const cart = await cartService.getCartById(req.user.cartId);
        const totalItemCount = cart.products.reduce((total, product) => total + product.quantity, 0);
        res.render('homepage', {
            productList: productList.docs.map(doc => doc.toObject()),
            ...pagination,
            sort,
            currentQuery: query,
            categories,
            cartItemCount: totalItemCount || 0,
            user: req.user
        });
    }

}


const renderDashBoardAdmin = async (req, res, next) => {

    const ticketList = await ticketService.findLastFiveTickets();
    res.render('admin/dashboard', {
        ticketList: formatTicketList(ticketList),
        user: req.user
    });
}

const renderUserListForAdmin = async (req, res, next) => {

    const userList = await userService.findAll();
    res.render('admin/users', {
        userList: formatUserList(userList),
        user: req.user
    });

}

const renderProductListForAdmin = async (req, res, next) => {

    const { page, limit, sort, ...query } = req.query;

    const productList = await productService.getProducts({
        page: parseInt(page) || 1,
        limit: 8,
        sort,
        query
    });

    const pagination = paginate(productList);

    res.render('admin/products', {
        productList: productList.docs.map(doc => doc.toObject()),
        ...pagination,
        sort,
        currentQuery: query,
        user: req.user
    });
}

const renderOrderDetailForAdmin = async (req, res, next) => {
    const orders = await ticketService.findAll();
    res.render('admin/tickets', {
        ordersList: orders.map(order => order.toObject()),
        user: req.user
    });
}

const orderComplete = async (req, res, next) => {

    if (req.user) {
        const cart = await cartService.getCartById(req.user.cartId);

        const total = cart.products.reduce((total, item) => {
            return total + (item.product.price * item.quantity);
          }, 0);
        
        const data = {
            amount: total,
            purchaser: req.user.email,
        }

    
        const purchase = await cartService.purchaseCart(req.user.cartId, data);

        res.render('checkout/complete', {
            cart: cart.toObject(),
            items: cart.products.map(product => product.toObject()),
            purchase: purchase.toObject(),
            user: req.user
        });
    } else {
        res.redirect('/login');
    }
}


const renderChat = async (req, res, next) => {
    res.render('chat/chat', {
        user: req.user
    });
}

const getCartById = async (req, res, next) => {
    try {
        const cart = await cartService.getCartById(req.params.id);
        const totalItemCount = cart.products.reduce((total, product) => total + product.quantity, 0);
        res.render('cart/cart', {
            cart: cart.toObject(),
            countItems: cart.products.length,
            cartItemCount: totalItemCount || 0,
            user: req.user
        });
    } catch (err) {
        next(err);
    }
}

const deleteProductAdmin = async (req, res, next) => {
    try {
        const { id } = req.params;
        await productService.deleteProduct(id);
        res.redirect('/admin/products');
    } catch (err) {
        next(err);
    }
}


const login = async (req, res, next) => {
    try {
        res.render('auth/login');
    } catch (err) {
        next(err);
    }
}

const logout = async (req, res, next) => {
    try {
        res.clearCookie('token');
        res.redirect('/login');
    } catch (err) {
        next(err);
    }
};

const resetPasswordRender = async (req, res, next) => {
    try {
        const { token } = req.query;
        res.render('auth/resetPassword', {token});
    } catch (err) {
        next(err);
    }

}

export {
    renderHomePage,
    renderDashBoardAdmin,
    renderUserListForAdmin,
    renderProductListForAdmin,
    renderOrderDetailForAdmin,
    deleteProductAdmin,
    getCartById,
    orderComplete,
    login,
    logout,
    renderChat,
    resetPasswordRender
}