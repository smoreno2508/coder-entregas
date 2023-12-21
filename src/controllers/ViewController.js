const renderHomePage = async (req, res, next) => {
    try {
        res.render('homepage');
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

export {
    renderHomePage,
    login
}