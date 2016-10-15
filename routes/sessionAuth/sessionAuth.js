var express = require('express');
var sessionAuth = express.Router();

/* session auth. */
module.exports = function(req, res, next) {
	console.log("req.session.uid = " + req.session.uid);
	if (req.session.uid) {
		next();
	} else {
		res.json({
			code: "4001",
			msg: "session auth err "
		})
	}
};