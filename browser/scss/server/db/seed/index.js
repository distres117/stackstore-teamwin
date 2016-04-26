require('../models');
var mongoose = require('mongoose'),
  categories = require('./categories'),
  lightsabers = require('./lightsabers'),
  blasters = require('./blasters'),
  users = require('./users'),
  Promise = require('bluebird'), conn;

  var Product = mongoose.model('Product');

function connect(){
  if (!conn){
    conn = mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/stackstore', function(err){
      if (err)
        console.log(err);
    });
  }
  return conn;
}


connect().then(function(){
  return conn.connection.db.dropDatabase();
})
.then(function(){
  return categories();
})
.then(function(cats){
  return Promise.join(users(), lightsabers(cats), blasters(cats));
})
.then(function(){
  console.log('done seeding');
  process.exit(0);
})
.catch(function(err){
  console.log(err);
});
