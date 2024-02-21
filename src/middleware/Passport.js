import passport from "passport";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import { Strategy as GithubStrategy } from 'passport-github2';
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import { config } from "dotenv";
import { userService } from "../services/index.js";
import { buildLogger } from "../helpers/logger.js";

const logger = buildLogger("Passport");

config();

const cookieExtractor = req => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['token'];
    }
    return token;
};



const optionsJWT = {
    // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    jwtFromRequest: cookieExtractor,
    secretOrKey: process.env.JWT_SECRET
};

const optionLocal = {
    passReqToCallback: true,
    usernameField: 'email',
    passwordField: 'password'
};


/**
 * @description local strategy
 * @param {Object} req
 * @param {String} email
 * @param {String} password
 * @param {Function} done
 * @returns {Function} done
 */
passport.use('local', new LocalStrategy(optionLocal, async (req, email, password, done) => {
    try {

        const user = await userService.findByEmail(email);

        if (!user) {
            return done(null, false, { message: 'Incorrect password or email.' });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return done(null, false, { message: 'Incorrect password or email.' });
        }

        userService.updateLastConnection(user._id);

        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));

/**
 * @description github strategy
 */

passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/api/auth/github/callback",
    scope: ["user:email"]
  }, async (accessToken, refreshToken, profile, done) => {
    try {
  
      const user = await userService.findByEmail(profile.emails[0].value);
  
      if (!user) {
        const newUser = await userService.create({
          firstName: profile.username,
          lastName: profile.username,
          email: profile.emails[0].value,
          password: profile.id,
          role: 'CLIENT',
          isGithub: true,
          last_connection: Date.now()
        });
        return done(null, newUser);
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }));



passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await userService.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });

/**
 * @description jwt strategy
 * @param {Object} payload
 * @param {Function} done
 * @returns {Function} done
 */

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