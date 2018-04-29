const express = require('express');
const router = require('express-promise-router')();
// const router = express.Router();

const UserController = require('../controllers/userController');


// define the home page route
router.post('/signup', UserController.signUp);
router.post('/signin', UserController.signIn);
router.get('/secret', UserController.secret);



module.exports = router;