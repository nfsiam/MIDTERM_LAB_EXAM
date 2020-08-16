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

router.get('/AddEmployee', (req, res) => {
    var data = {
        username: req.cookies['logAdmin'],
        errNull: '',
    }
    res.render('addemp', data);

});

router.post('/AddEmployee', (req, res) => {
    console.log(req.body);
    var data = {
        username: req.cookies['logAdmin'],
        errNull: ''
    }
    var errflag = false;

    if (req.body.username == '' || req.body.password == '' || req.body.Name == '' || req.body.Phone == '' || req.body.Gender == '' || req.body.Designation == '') {
        data.errNull = 'Please fill all fields';
        errflag = true;
    }

    if (errflag) {
        res.render('addemp', data);
    } else {
        userModel.insert(req.body, function (status) {
            if (status) {
                res.redirect('/Admin');
            } else {
                res.send('wrong!')
            }
        });
    }
});

router.get('/UpdateEmployee/:id', (req, res) => {
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
router.post('/UpdateEmployee/:id', (req, res) => {
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


module.exports = router;