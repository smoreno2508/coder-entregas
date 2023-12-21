import passport from "passport";
import { InternalServerError, BadRequestError, ConflictError, NotFoundError } from "../errors/customErrors.js";
import { generateJWT } from "../helpers/generarJwt.js";

const jwtLogin = (req, res, next) => {

    passport.authenticate("local", { session: false }, async (err, user, info) => {
        try {
            if (err) throw new InternalServerError("Error interno del servidor.");

            if (info) throw new BadRequestError(info.message);

            if (!user) throw new ConflictError("Ocurrio un error al iniciar session.");

            const jwtToken = await generateJWT(user);

            res.json({
                token: jwtToken.token,
                expiresIn: jwtToken.expires,
            });

        } catch (error) {
            next(error);
        }
    })(req, res, next);
};



export { jwtLogin };
