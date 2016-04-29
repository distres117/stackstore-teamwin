// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var User = mongoose.model('User');
var Category = mongoose.model('Category');
var Product = mongoose.model('Product');
var Order = mongoose.model('Order');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');

describe('Orders Route', function() {

  var Obama = { email: 'obama@gmail.com', password: 'potus' };
  var Jonah = { email: 'jonah@gmail.com', password: 'wolf', isAdmin: true };
  var Oliver = { email: 'oliver@gmail.com', password: 'distres' };

  var users = [Obama, Oliver, Jonah];

  var foo = {
    name: 'foo',
    description: 'I am a foo',
    price: 1,
    quantity: 4,
  };
  var bar = {
    name: 'bar',
    description: 'I am a bar',
    price: 2.50,
    quantity: 2,
  };
  var bazz = {
    name: 'bazz',
    description: 'I am a bazz',
    price: 4.99,
    quantity: 7,
  };

  var products = [foo, bar, bazz];

  beforeEach('Establish DB connection', function(done) {
    if (mongoose.connection.db) return done();
    mongoose.connect(dbURI, done);
  });

  beforeEach('Create the users', function(done) {
    User.create(users, done);
  });

  beforeEach('Create the products', function(done) {
    Product.create(products, done);
  });

  afterEach('Clear test database', function(done) {
    clearDB(done);
  });

  describe('POST /api/orders/addItem', function() {
    var guestAgent;

    beforeEach('Create guest agent', function() {
      guestAgent = supertest.agent(app);
    });


    it('should get a 200 response and the item should be added to the order', function(done) {
      guestAgent.post('/api/orders/addItem', foo)
        .expect(200)
        .end(function(err, response) {
          if (err) return done(err);
          Order.findById(response.body)
            .then(function(order) {
              expect(order.items.length).to.equal(1);
              done();
            });
        });

    });
  });

  describe('POST /api/orders/removeItem', function() {
    var guestAgent;

    beforeEach('Create guest agent', function() {
      guestAgent = supertest.agent(app);
    });


    it('should get a 200 response and the item should be removed from the order', function(done) {
      guestAgent.post('/api/orders/addItem', foo)
        .end(function(err, response) {
          guestAgent.post('/api/orders/removeItem', foo)
            .expect(200)
            .end(function(err, response) {
              if (err) return done(err);
              Order.findById(response.body)
                .then(function(order) {
                  expect(order.items.length).to.equal(0);
                  done();
                });
            });
        });
    });

  });

  describe('POST /api/orders/commit', function() {
    var guestAgent;

    beforeEach('Create guest agent', function() {
      guestAgent = supertest.agent(app);
    });


    it('should get a 200 response and the order\'s status should be \'placed\'', function(done) {
      guestAgent.post('/api/orders/addItem', foo)
        .end(function() {
          guestAgent.post('/api/orders/commit')
            .expect(200)
            .end(function(err, response) {
              if (err) return done(err);
              Order.findById(response.body)
                .then(function(order) {
                  expect(order.status).to.equal('placed');
                  done();
                });
            });
        });
    });

  });

});