// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var User = mongoose.model('User');
var Category = mongoose.model('Category');
var Product = mongoose.model('Product');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');

describe('Categories Route', function() {

  var categories = [
    { name: 'sabers', description: 'weapon', _id: '571bac45349d8ba204736899' },
    { name: 'blasters', description: 'weapon', _id: '571bac45349d8ba20473689a' },
    { name: 'masks', descripton: 'disguise', _id: '571bac45349d8ba20473689b' }
  ];

  var products = [{
    name: 'foo',
    description: 'I am a foo',
    price: 1,
    quantity: 4,
    category: []
  }, {
    name: 'bar',
    description: 'I am a bar',
    price: 2.50,
    quantity: 2,
    category: ['571bac45349d8ba204736899']
  }, {
    name: 'bazz',
    description: 'I am a bazz',
    price: 4.99,
    quantity: 7,
    category: ['571bac45349d8ba204736899']
  }];

  beforeEach('Establish DB connection', function(done) {
    if (mongoose.connection.db) return done();
    mongoose.connect(dbURI, done);
  });

  beforeEach('Create the categories', function(done) {
    Category.create(categories, done);
  });

  beforeEach('Create the products', function(done) {
    Product.create(products, done);
  });

  afterEach('Clear test database', function(done) {
    clearDB(done);
  });

  describe('GET /api/categories', function() {

    var guestAgent;

    beforeEach('Create guest agent', function() {
      guestAgent = supertest.agent(app);
    });


    it('should get a 200 response with a three-item array as the body', function(done) {
      guestAgent.get('/api/categories')
        .expect(200)
        .end(function(err, response) {
          if (err) return done(err);
          expect(response.body).to.be.an('array');
          expect(response.body.length).to.equal(3);
          done();
        });
    });

  });

  describe('GET /api/categories/:id', function() {

    var guestAgent;

    beforeEach('Create guest agent', function() {
      guestAgent = supertest.agent(app);
    });


    it('should get a 200 response with a two-item array as the body', function(done) {
      guestAgent.get('/api/categories/571bac45349d8ba204736899')
        .expect(200)
        .end(function(err, response) {
          if (err) return done(err);
          expect(response.body).to.be.an('array');
          expect(response.body.length).to.equal(2);
          done();
        });
    });

  });

  describe('DELETE /api/categories/:id', function() {

    var guestAgent;

    beforeEach('Create guest agent', function() {
      guestAgent = supertest.agent(app);
    });

    it('should get a 200 response', function(done) {
      guestAgent.delete('/api/categories/571bac45349d8ba204736899')
        .expect(200);
      done();
    });

  });

  describe('PUT /api/categories/:name', function() {

    var guestAgent;

    beforeEach('Create guest agent', function() {
      guestAgent = supertest.agent(app);
    });

    it('should get a 200 response with the object created', function(done) {
      guestAgent.put('/api/categories/robes')
        .expect(200)
        .end(function(err, response){
        	if (err) return done(err);
        	expect(response.body.name).to.equal('robes');
        	done();
        });
    });

  });

});