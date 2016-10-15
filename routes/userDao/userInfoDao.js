var userInfoDao = module.exports;
var pool = require('./mysql-pool');
userInfoDao.getUserInfo = function(wid, cb) {
	var getUserInfo = "select * from userInfo where wid = ?"
	pool.getConnection(function(err, connection) {
		if (err)
			cb(err);
		connection.query(getUserInfo, [wid], function(err, result) {
			// return object back to pool
			connection.release();
			cb(err, result);
		});
	});
}
userInfoDao.getUserInfoByWid = function(wid, cb) {
	var getUserInfo = "select * from userInfo where wid = ?"
	pool.getConnection(function(err, connection) {
		if (err)
			cb(err);
		connection.query(getUserInfo, [wid], function(err, result) {
			// return object back to pool
			connection.release();
			cb(err, result);
		});
	});
}
userInfoDao.insertUserInfo = function(wid, tel,cb) {
	var time = new Date().getTime();
	var insertUserInfo = "insert into userInfo(wid,tel,time) values(?,?)"
	pool.getConnection(function(err, connection) {
		if (err)
			cb(err);
		connection.query(insertUserInfo, [wid,tel,time], function(err, result) {
			// return object back to pool
			connection.release();
			cb(err, result);
		});
	});
}