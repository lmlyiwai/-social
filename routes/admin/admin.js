var http = require('http');
var url = require('url');
var redis = require('redis');
var moment = require('moment');
var querystring = require('querystring');
var express = require('express');
var admin = express.Router();
var userInfoDao = require("./../userDao/userInfoDao");
var async = require('async');

client = redis.createClient();
client.on("error", function(err) {
	console.log("Error  " + err);
});
admin.post('/', function(req, res, next) {
	var data = req.body;
	var state = [];
	userInfoDao.getUserInfoByWid(data.wid, function(err, result) {
			if (err) {
				throw err;
			} else {
				if (!result) {
					var strUrl = "https://webapi.sms.mob.com/sms/verify";
					var parse = url.parse(strUrl);

					// 待发送的数据
					var postStr = querystring.stringify({
						//appkey mob  apk;
						appkey: "",
						phone: data.tel,
						zone: "86",
						code: data.verifyCode
					});

					var options = {
						"method": "POST",
						"host": parse.hostname,
						"path": parse.path,
						"port": parse.port,
						"headers": {
							"Content-Length": postStr.length,
							'Content-Type': 'application/x-www-form-urlencoded'
								// 'Content-Type':'application/json'
						}
					};
					// 服务器端发送REST请求
					var reqPost = http.request(options, function(resPost) {
						resPost.on('data', function(d) {
							console.log("verifyCode status ：" + d);
							var resultCode = JSON.parse(d);
							if (resultCode.status == 200) {
								userInfoDao.insertUserInfo(data, yihao, token, ringName, ringPassword, function(err, result) {
									if (err) {
										res.json({
											code: "1000",
											msg: "SQL err"
										});
										throw err
									} else {
										req.session.uid = result.insertId;
									}
								});
							} else if (resultCode.status == 466) {
								//该处用veryCode为空作为本地测试

								//该处用veryCode为空作为本地测试
								//res.json({code : "7002",msg : "verifyCode is null"});
							} else if (resultCode.status == 467) {
								res.json({
									code: "7003",
									msg: "verifyCode request is too frequently"
								});
							} else if (resultCode.status == 468) {
								res.json({
									code: "7004",
									msg: "wrong verifyCode"
								});
							} else {
								res.json(resultCode);
							}
						});
					})
				} else {
					req.session.regenerate(function(err) {
						// will have a new session here
						if (err) {
							throw err;
						}
						req.session.uid = result.uid;
						console.log("req.session.uid = " + req.session.uid);
						res.json({
							code: "200",
							uid: result.uid,
							msg: "login success"
						});
					});
				}
			}
		})
		//begin
		//end
	reqPost.write(postStr);
	reqPost.end();
	reqPost.on('error', function(e) {
		console.error(e);
	});
});
module.exports = admin;