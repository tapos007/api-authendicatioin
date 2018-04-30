const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {JWT_SECRET} = require('../config/configuration');

module.exports = {
    signUp: async (req, res, next) => {


        const {email, password} = req.value.body;
        // check if there is a user with same email
        const  foundUser = await User.findOne({email});
        if(foundUser){
           return res.status(403).json({error:"Email is already in use"})
        }
        const newUser = new User({email, password});
        await newUser.save();
        //res.json({user: 'created'});


        res.json({
           token: signToken(newUser)
        })
    },
    signIn: async (req, res, next) => {
        console.log('UserController.signIn() called');
    },
    secret: async (req, res, next) => {
        console.log('UserController.secret() called');
    }
};

signToken = user=>{
  return   jwt.sign({
        iss: 'TutexpSoft',
        sub: user._id,
        iat : new Date().getTime(),
        exp : new Date().setDate(new Date().getDate() + 1)
    }, JWT_SECRET);
};