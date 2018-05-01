const express = require('express');
const router = require('express-promise-router')();
const {validateBody,schemas} = require('../helpers/routeHelpers');
const passport = require('passport');
const passportConf = require('../config/passport');
const UserController = require('../controllers/userController');


// define the home page route
router.post('/signup', validateBody(schemas.authSchema), UserController.signUp);
router.post('/signin', validateBody(schemas.authSchema),passport.authenticate('local', {session: false}),UserController.signIn);
router.get('/secret', passport.authenticate('jwt',{session: false}),UserController.secret);



module.exports = router;