var express = require('express');
var router = express.Router();
var userModel = require.main.require('./models/user');


router.get('*', function (req, res, next) {
    if (req.cookies['logAdmin'] != null) {
        next();
    } else {
        res.redirect('/Login');

    }
});

router.get('/', (req, res) => {
    var data = {
        username: req.cookies['logAdmin']
    }
    userModel.getAllEmp(function (result) {
        data['emplist'] = result;
        res.render('admin', data);
    });
});

router.post('/', (req, res) => {

    res.render('posted');
});




module.exports = router;