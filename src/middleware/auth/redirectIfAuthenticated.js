import passport from "../Passport.js";

const redirectIfAuthenticated = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (user) {
            return res.redirect("/");
        }
        next();
    })(req, res, next);
};

export default redirectIfAuthenticated;
