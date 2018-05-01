const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const {ExtractJwt} = require('passport-jwt');
const {JWT_SECRET} = require('./configuration');
const User = require('../models/user');

// JSON Web Token
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET
}, async (payload, done) => {
    try {
        // Find the user specified in token
        const user = await User.findById(payload.sub);
        if (!user) {
            // if does not exits handle it
            return done(null, false)
        }
        // otherwise return the user
        done(null, user);
    } catch (err) {
        return done(err, false)
    }
}));

// local stategiey
passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        session: false
    },
    async (email, password, done) => {
        try {
            const user = await User.findOne({email});
            if (!user) {
                return done(null, false);
            }
            const isMatch = await  user.isValidPassword(password);
            if (!isMatch) {
                return done(null, false);
            }
            done(null, user);
        } catch (err) {
            return done(err, false)
        }

    }
));
