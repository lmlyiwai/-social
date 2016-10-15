var express = require('express')
var userInfo = express.Router();
var userInfoDao = require('./../userDao/userInfoDao')
userInfo.post('/log', function(req, res) {
	var wid = req.body.wid;
	userInfoDao.getUserInfo(wid, function(err, result) {
		if (err) {
			throw err;
		}
		if (result == 0) {
			res.json({
				code: 0001,
				msg: "please enter your tel "
			})
		} else {
			res.json({
				code: 0000,
				msg: 'login success'
			})
		}
	})
})
userInfo.post('')
module.exports = userInfo