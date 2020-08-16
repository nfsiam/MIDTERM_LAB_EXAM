var db = require('./db');

module.exports = {

	get: function (id, callback) {
		var sql = "select employee.EmpID, employee.username,employee.Name, user.password, employee.Phone FROM employee inner join user on employee.username = user.username where employee.EmpID = ?";
		db.getResults(sql, [id], function (result) {
			if (result.length > 0) {
				callback(result[0]);
			} else {
				callback(false);
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
		db.execute(sql, ['', user.username, user.password, 'employee'], function (status) {
			if (status) {
				var sql2 = "insert into employee values('', ?, ?,'','',?)";
				db.execute(sql2, [user.Name, user.Phone, user.username], function (status) {
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