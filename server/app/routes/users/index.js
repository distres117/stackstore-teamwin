'use strict';
var router = require('express').Router();
var _ = require('lodash');
var mongoose = require('mongoose');

router.param('id', function (req, res, next, id) {
	mongoose.model('User').findById(id)
	.exec()
	.then(function (user) {
		if (!user) {
			res.send(404);
			next();
		}
		
		req.requestedUser = user;
		next();
	})
	.then(null, next);
});

router.post('/', function (req, res, next) {
	mongoose.model('User').create(req.body)
	.then(function(user) {
		res.status(201).json(user);
	})
	.then(null, next);
});

router.put('/:id', function (req, res, next) {
	_.extend(req.requestedUser, req.body);
	req.requestedUser.save()
	.then(function (user) {
		res.json(user);
	})
	.then(null, next);
});

router.delete('/:id', function (req, res, next) {
	req.requestedUser.remove()
	.then(function () {
		res.status(204).end();
	})
	.then(null, next);
});

module.exports = router;