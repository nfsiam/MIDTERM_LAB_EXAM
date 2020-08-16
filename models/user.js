var db = require('./db');

module.exports = {

	get: function (id, callback) {
		var sql = "select * from user where id=?";
		db.getResults(sql, [id], function (result) {
			if (result.length > 0) {
				callback(result[0]);
			} else {
				callback([]);
			}
		});
	},

	getAll: function (callback) {
		var sql = "select * from employee ";
		db.getResults(sql, null, function (result) {
			if (result.length > 0) {
				callback(result);
			} else {
				callback([]);
			}
		});
	},
	getAllEmp: function (callback) {
		var sql = "select employee.EmpID, employee.username,employee.Name, user.password, employee.Phone FROM employee inner join user on employee.username = user.username";
		db.getResults(sql, null, function (result) {
			if (result.length > 0) {
				callback(result);
			} else {
				callback([]);
			}
		});
	},

	validate: function (user, callback) {
		var sql = "select * from user where username=? and password=?";
		db.getResults(sql, [user.uname, user.password], function (result) {
			if (result.length > 0) {
				callback(result[0].type);
			} else {
				callback(false);
			}
		});
	},

	insert: function (user, callback) {
		var sql = "insert into user values(?, ?, ?, ?)";
		var sql2 = "insert into employee values(?, ?, ?, ?,?, ?)";

		db.execute(sql, ['', user.username, user.password, 'employee'], function (status) {
			if (status) {
				db.execute(sql2, ['', user.Name, user.Phone, user.Gender, user.Designation, user.username], function (status) {
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

		db.execute(sql, ['', user.Name, user.Phone, user.Gender, user.Designation, user.username], function (status) {
			if (status) {
				callback(true);
			} else {
				callback(false);
			}
		});
	},

	update: function (user, callback) {
		var sql = "update user set username=?, password=?, type=? where id=?";
		db.execute(sql, [user.uname, user.password, user.type, user.id], function (status) {
			if (status) {
				callback(true);
			} else {
				callback(false);
			}
		});
	},

	delete: function (id, callback) {
		var sql = "delete from user where id=?";
		db.execute(sql, [id], function (status) {
			if (status) {
				callback(true);
			} else {
				callback(false);
			}
		});
	}
}