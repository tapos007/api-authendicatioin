const passport = required('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const {ExtractJwt} = require('passport-jwt');
const {JWT_SECRET} = require('./configuration');
passport.use(new JwtStrategy({
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : JWT_SECRET
}, async (payload, done) => {

    try {
        
    }catch (err) {
        
    }
}));
