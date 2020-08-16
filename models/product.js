var db = require('./db');

module.exports = {

    search: function (key, callback) {
        key = '%' + key + '%';
        var sql = "select * from product where id like ? or name like ?";
        db.getResults(sql, [key, key], function (result) {
            if (result.length > 0) {
                callback(result);
            } else {
                callback(false);
            }
        });
    },
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

    update: function (product, callback) {
        var sql = `UPDATE product SET name=?, quantity=?, price=? where id=?`;
        db.execute(sql, [product.name, product.quantity, product.price, product.id], function (status) {
            if (status) {
                callback(true);
            } else {
                callback(false);
            }
        });
    },

    delete: function (id, callback) {
        var sql = "DELETE FROM `product` WHERE id=?";
        db.execute(sql, [id], function (status) {
            if (status) {
                callback(true);
            } else {
                callback(false);
            }
        });
    }
}