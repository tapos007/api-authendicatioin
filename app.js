const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/APIAuthendication');
const app = express();



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
// setup morgan
app.use(morgan('dev'));




// added app router here

app.use('/users', require('./routes/userRoute'));
app.listen(3000, () => console.log('Example app listening on port 3000!'));