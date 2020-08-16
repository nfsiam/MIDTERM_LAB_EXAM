var db = require('./db');

module.exports = {

    get: function (id, callback) {
        var sql = "select * from product where id =?";
        db.getResults(sql, [id], function (result) {
            if (result.length > 0) {
                callback(result[0]);
            } else {
                callback(false);
            }
        });
    },

    getAll: function (callback) {
        var sql = "select * from product ";
        db.getResults(sql, null, function (result) {
            if (result.length > 0) {
                callback(result);
            } else {
                callback([]);
            }
        });
    },

    insert: function (product, callback) {
        var sql = "insert into product values(?, ?, ?, ?)";
        db.execute(sql, ['', product.name, product.quantity, product.price], function (status) {
            if (status) {
                callback(true);
            } else {
                callback(false);
            }
        });
    },

    update: function (user, callback) {
        var sql = `UPDATE user SET username=?, password=? where username=?`;
        db.execute(sql, [user.username, user.password, user.username], function (status) {
            if (status) {
                var sql2 = "update employee set username=?, Name=?, Phone=? where EmpID=?";
                db.execute(sql2, [user.username, user.Name, user.Phone, user.EmpID], function (status) {
                    if (status) {
                        callback(true);
                    } else {
                        callback(false);
                    }
                });
            } else {
                callback(false);
            }
        });
    },

    delete: function (username, callback) {
        var sql = "DELETE FROM `user` WHERE username=?";
        db.execute(sql, [username], function (status) {
            if (status) {
                var sql2 = "delete from employee where username=?";
                db.execute(sql2, [username], function (status) {
                    if (status) {
                        // console.log('deleted');
                        callback(true);
                    } else {
                        callback(false);
                    }
                });
            } else {
                callback(false);
            }
        });
    }
}