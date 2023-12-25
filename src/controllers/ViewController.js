import { userService, productService } from "../services/index.js";


// se aplica DRY

const formatUserList = (users) => users.map(user => user.toObject());

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

        res.render('homepage', {
            productList: productList.docs.map(doc => doc.toObject()),
            ...pagination,
            sort,
            currentQuery: query,
            categories,
            user: req.user.toObject()
        });
    } else {
        res.redirect('/login');
    }

}


const renderDashBoardAdmin = async (req, res, next) => {

    const userList = await userService.findAll();
    res.render('admin/dashboard', {
        userList: formatUserList(userList),
        user: req.user.toObject()
    });
}

const renderUserListForAdmin = async (req, res, next) => {

    const userList = await userService.findAll();
    res.render('admin/users', {
        userList: formatUserList(userList),
        user: req.user.toObject()
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
        user: req.user.toObject()
    });


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

export {
    renderHomePage,
    renderDashBoardAdmin,
    renderUserListForAdmin,
    renderProductListForAdmin,
    deleteProductAdmin,
    login,
    logout
}