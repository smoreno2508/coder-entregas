import passport from "passport";
import { generateJWT } from "../helpers/generarJwt.js";

const jwtLogin = (req, res, next) => {

    passport.authenticate("local", { session: false }, async (err, user, info) => {
        if (err || !user) {
            return res.render('auth/login', { message: info.message });
        }

        const jwtToken = await generateJWT(user);
        res.cookie('token', jwtToken.token, { httpOnly: true, secure: true });

        res.redirect('/');

    })(req, res, next);
};

const passportGithubLogin = passport.authenticate("github", { scope: ["user:email"] });
const passportGithubCallback = (req, res, next) => {
    passport.authenticate("github", async (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect("/login");
        }

        const jwtToken = await generateJWT(user);
        res.cookie('token', jwtToken.token, { httpOnly: true, secure: true });

        res.redirect('/');
    })(req, res, next);
};


export { 
    jwtLogin,
    passportGithubLogin,
    passportGithubCallback
 };
