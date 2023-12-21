import passport from "../Passport.js";

const isAuthenticated = passport.authenticate('jwt', { session: false });

export default isAuthenticated;