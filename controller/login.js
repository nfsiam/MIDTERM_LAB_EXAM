var express = require('express');
var router = express.Router();
var userModel = require.main.require('./models/user');


router.get('/', (req, res) => {
    res.render('login');
});

router.post('/', (req, res) => {
    var user = {
        uname: req.body.username,
        password: req.body.password
    };

    userModel.validate(user, function (status) {
        if (status === false) {
            res.send('invalid username/password');
        } else if (status == 'admin') {
            res.cookie('logAdmin', req.body.username);
            res.redirect('/Admin');
        } else if (status == 'user') {
            res.cookie('logUser', req.body.username);
            res.redirect('/Employee');
        }
    });
});

module.exports = router;