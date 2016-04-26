var expect = require('chai').expect,
  mongoose = require('mongoose'),
  dbURI = process.env.DB_URI,
  clearDB = require('mocha-mongoose')(dbURI),
  seed = require('../../../server/db/seed'),
  Promise = require('bluebird');

require('../../../server/db/models');

var Product = mongoose.model('Product'),
  User = mongoose.model('User'),
  Order = mongoose.model('Order'),
  Category = mongoose.model('Category');

describe('Products', function(){
  before('Establish DB connection', function () {
      return seed.connect();
    });

    beforeEach('seed db', function(){
      //console.log('seeding...');
      return seed.seed();
    });

  afterEach('Clear test database', function () {
    //console.log('clearing');
      return seed.drop();
  });

    describe('the basics', function(){
      it('should exist', function () {
          expect(Product).to.be.a('function');
      });
      it('there should be 3 products', function(){
        return Product.find().then(function(products){
          expect(products.length).to.equal(3);
        });
      });
    });
    describe('Product methods', function(){
      var _product, _cat1;
      beforeEach(function(done){
        Product.findOne().then(function(product){
          Promise.join(Category.create({name: 'blah', description: 'blah blah'}),
            Category.create({name: 'ho hum', description: 'blah blah'}))
          .spread(function(cat1, cat2){
            _cat1 = cat1;
            product.applyCategory(cat1.name)
            .then(function(){
              _product = product;
              done();
            });
          });
        });
      });
      afterEach(function(){
        return Category.remove();
      });
      it('should add a review and get the user', function(done){
        Promise.join(User.findOne(), Product.findOne())
        .spread(function(user, product){
          return _product.addReview('this is a review', user._id);
        })
        .then(function(product){
          expect(product.reviews.length).to.equal(1);
          return product.reviews[0].getAuthor();
        })
        .then(function(author){
          expect(author.email).to.equal('larry@stooges.com');
          done();
        });
      });
      it('should assign categories', function(){
          expect(_product.category.length).to.equal(1);
      });
      it('should get products by category', function(done){
          Product.findOne().then(function(product){
            return product.applyCategory(_cat1.name);
          })
          .then(function(product){
            return Product.findByCategory(_cat1.name);
          })
          .then(function(products){
              expect(products.length).to.equal(1);
              done();

        });
      });
      it('should delete all references when category is deleted', function(done){
        _cat1.remove().then(function(){
          Product.findOne().then(function(product){
            expect(product.category.length).to.equal(0);
            done();
          });
        });

      });
    });
});
