const express = require('express');
const router = require('express-promise-router')();
const {validateBody,schemas} = require('../helpers/routeHelpers');

const UserController = require('../controllers/userController');


// define the home page route
router.post('/signup', validateBody(schemas.authSchema), UserController.signUp);
router.post('/signin', UserController.signIn);
router.get('/secret', UserController.secret);



module.exports = router;