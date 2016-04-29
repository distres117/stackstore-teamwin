var mongoose = require('mongoose'),
  User = mongoose.model('User');

function seed(){
  var users = [
      {
          email: 'testing@fsa.com',
          password: 'password'
      },
      {
          email: 'obama@gmail.com',
          password: 'potus'
      }
  ];
  console.log('seeding users...');
  return User.create(users);
}

module.exports = seed;
