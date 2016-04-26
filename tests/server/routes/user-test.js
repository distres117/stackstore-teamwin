// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var db = require('../../../server/db/seed');

var dbURI = process.env.DB_URI;
var clearDB = require('mocha-mongoose')(dbURI);

var expect = require('chai').expect;
var User = mongoose.model('User');

var supertest = require('supertest');
var app = require('../../../server/app');


describe('Users Route', function () {

	var userInfo = {
		email: 'joe@gmail.com',
		password: 'shoopdawoop'
	};

	before('Establish DB connection', function () {
      return db.connect();
    });

    beforeEach('seed db', function(){
      return db.seed();
    });

	afterEach('Clear test database', function () {    
	  return db.drop();
	});

	describe('Add a user', function () {
		it('should successfully add new user with response 201', function (done) {
			supertest.agent(app).post('/api/users/', userInfo).expect(201);
			done();
		});
	});

	describe('Edit a user', function () {
		var userId;

		beforeEach('Create test user', function (done) {
			User.create(userInfo)
			.then(function (user) {
				userId = user._id;
				done();
			});
		});

		it('should return the user with a new password', function (done) {
			supertest.agent(app).put('/api/users/' + userId, {email: 'joe@gmail.com', password: 'newpass'})
			.expect(201);
			done();
		});
	});

	describe('Remove a user', function () {
		var userId;

		beforeEach('Create test user', function (done) {
			User.create(userInfo)
			.then(function (user) {
				userId = user._id;
				done();
			});
		});

		it('should return a 204 response', function (done) {
			supertest.agent(app).delete('/api/users/' + userId).expect(204);
			done();
		});
	});
});