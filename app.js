//DECELARATION
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var login = require('./controller/login');
var admin = require('./controller/admin');
var logout = require('./controller/logout');
var employee = require('./controller/employee');


var app = express();

//Configuration
app.set('view engine', 'ejs');

app.use(express.static('./node_modules/jquery/dist/'));


//Middleware
app.use(bodyParser());
app.use(cookieParser());

app.use('/Login', login);
app.use('/Admin', admin);
app.use('/Logout', logout);
app.use('/Employee', employee);



//SERVER STARTUP
app.listen(3007, () => {
    console.log('express server started at 3000');
});