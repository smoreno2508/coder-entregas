import passport from "passport";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import { config } from "dotenv";
import { userService } from "../services/index.js";

config();

const optionsJWT = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

const optionLocal = {
    passReqToCallback: true,
    usernameField: 'email',
    passwordField: 'password'
};


passport.use('local',new LocalStrategy(optionLocal, async (req, email, password, done) => {
    try {

        const user = await userService.findByEmail(email);

        if (!user) {
            return done(null, false, { message: 'Incorrect password or email.' });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return done(null, false, { message: 'Incorrect password or email.' });
        }

        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));


passport.use('jwt', new JWTStrategy(optionsJWT, async (payload, done) => {

    try {
        
        const user = await userService.findById(payload.id);

        if (!user) return done(null, false);

        return done(null, user);

    } catch (err) {
        done(err);
    }
}));

export default passport;