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

export { jwtLogin };
