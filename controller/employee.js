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
        username: req.cookies['logEmployee'],
        errNull: '',
    }
    productModel.get(req.params.id, (result) => {
        if (!result) {
            res.send("can not get");
        } else {
            data["product"] = result;
            console.log(result);
            res.render('updateproduct', data);
        }
    });
});

router.post('/UpdateProduct/:id', (req, res) => {
    // console.log(req.body);
    var data = {
        username: req.cookies['logEmployee'],
        errNull: '',
        product: req.body

    }
    var errflag = false;

    if (req.body.name == '' || req.body.quantity == '' || req.body.price == '') {
        data.errNull = 'Please fill all fields';
        errflag = true;
    }

    if (errflag) {
        res.render('updateproduct', data);
    } else {
        productModel.update(req.body, function (status) {
            if (status) {
                res.redirect('/Employee');
            } else {
                res.send('wrong!')
            }
        });
    }
});



router.get('/DeleteProduct/:id', function (req, res) {
    var data = {
        username: req.cookies['logEmployee'],
        errNull: '',
    }
    productModel.get(req.params.id, function (result) {
        data["product"] = result;
        res.render('deleteproduct', data);
    });

});

router.post('/DeleteProduct/:id', function (req, res) {

    productModel.delete(req.body.id, function (status) {
        if (status) {
            res.redirect('/Employee');
        } else {
            res.redirect('/DeleteProduct/' + req.params.id);
        }
    });
});

router.post('/search', function (req, res) {
    console.log(req.body);
    productModel.search(req.body.key, (result) => {
        console.log(result);
        res.json({
            plist: result
        })
    });
});


module.exports = router;