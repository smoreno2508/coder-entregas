import passport from "../Passport.js";

const isAuthenticated = (req, res, next) => {

    passport.authenticate("jwt", { session: false }, (err, user, info) => {

        if (!user) return res.status(401).redirect("/login");
        req.user = user;
        next();
    })(req, res, next);
}



export default isAuthenticated;