var mongoose = require('mongoose'),
  Promise = require('bluebird'), conn;
require('./models');

mongoose.Promise = Promise;
var Product = mongoose.model('Product'),
  User = mongoose.model('User');

  var products = [
    {
      name: 'foo',
      description: 'I am a foo',
      price: 1,
      quantity: 4
    },
    {
      name: 'bar',
      description: 'I am a bar',
      price: 2.50,
      quantity: 2
    },
    {
      name: 'bazz',
      description: 'I am a bazz',
      price: 4.99,
      quantity: 7
    }
  ];

  var users = [
    {email: 'larry@stooges.com', password: 'dumb'},
    {email: 'moe@stooges.com', password: 'dumber'},
    {email: 'curly@stooges.com', password: 'dumbest'}
  ];


function seed(){
  return Promise.join(Product.insertMany(products), User.insertMany(users));
}

function connect(){
  if (!conn){
    conn = mongoose.connect(process.env.DB_URI, function(err){
      if (err)
        console.log(err);
    });
  }
  return conn;
}

function clear(){
  if (conn)
    conn.connection.db.dropDatabase();
}
module.exports = {seed: seed, connect: connect, drop: clear};
