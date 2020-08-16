var express = require('express');
var router = express.Router();
var productModel = require.main.require('./models/product');


router.get('*', function (req, res, next) {
    if (req.cookies['logEmployee'] != null) {
        next();
    } else {
        res.redirect('/Login');

    }
});

router.get('/', (req, res) => {
    var data = {
        username: req.cookies['logEmployee']
    }
    productModel.getAll(function (result) {
        data['plist'] = result;
        res.render('employee', data);
    });
});

router.post('/', (req, res) => {

    res.render('posted');
});

router.get('/AddProduct', (req, res) => {
    var data = {
        username: req.cookies['logEmployee'],
        errNull: '',
    }
    res.render('addproduct', data);

});

router.post('/AddProduct', (req, res) => {
    console.log(req.body);
    var data = {
        username: req.cookies['logEmployee'],
        errNull: ''
    }
    var errflag = false;

    if (req.body.name == '' || req.body.quantity == '' || req.body.price == '') {
        data.errNull = 'Please fill all fields';
        errflag = true;
    }

    if (errflag) {
        res.render('addproduct', data);
    } else {
        productModel.insert(req.body, function (status) {
            if (status) {
                res.redirect('/Employee');
            } else {
                res.send('wrong!')
            }
        });
    }
});

router.get('/UpdateProduct/:id', (req, res) => {
    var data = {
        username: req.cookies['logAdmin'],
        errNull: '',
    }
    const EmpID = req.params.id;
    userModel.get(EmpID, (result) => {
        if (!result) {
            res.send("can not get");
        } else {
            data["user"] = result;
            console.log(result);
            res.render('upemp', data);
        }
    });

});
router.post('/UpdateProduct/:id', (req, res) => {
    // console.log(req.body);
    var data = {
        username: req.cookies['logAdmin'],
        errNull: '',
        user: req.body

    }
    var errflag = false;

    if (req.body.username == '' || req.body.password == '' || req.body.Name == '' || req.body.Phone == '' || req.body.Gender == '' || req.body.Designation == '') {
        data.errNull = 'Please fill all fields';
        errflag = true;
    }

    if (errflag) {
        res.render('addemp', data);
    } else {
        userModel.update(req.body, function (status) {
            if (status) {
                res.redirect('/Admin');
            } else {
                res.send('wrong!')
            }
        });
    }
});



router.get('/DeleteProduct/:id', function (req, res) {
    var data = {
        username: req.cookies['logAdmin'],
        errNull: '',
    }
    userModel.get(req.params.id, function (result) {
        data["user"] = result;
        res.render('delemp', data);
    });

});

router.post('/DeleteProduct/:id', function (req, res) {

    userModel.delete(req.body.username, function (status) {
        if (status) {
            // console.log('kkkk');
            res.redirect('/Admin');
        } else {
            res.redirect('/DeleteEmployee/' + req.params.id);
        }
    });
});


module.exports = router;