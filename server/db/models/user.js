'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var _ = require('lodash');
var Promise = require('bluebird');

var schema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    salt: {
        type: String
    },
    orders:[{type: mongoose.Schema.Types.ObjectId, ref: 'Order'}],
    isAdmin:{
      type: Boolean,
      default: false
    },
    passwordReset: {
      type: Boolean,
      default: false
    },
    imageUrl: String
});
//Adds a user to an order, indicating the order is ready to be placed
schema.methods.addOrder = function(order){
  this.orders.push(order._id);
  order.status = 'pending';
  order.user = this._id;
  return Promise.join(this.save(), order.save())
  .spread(function(user, order){
    return Promise.resolve(order);
  });

};

// method to remove sensitive information from user objects before sending them out
schema.methods.sanitize = function () {
    return _.omit(this.toJSON(), ['password', 'salt']);
};

// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.
var generateSalt = function () {
    return crypto.randomBytes(16).toString('base64');
};

var encryptPassword = function (plainText, salt) {
    var hash = crypto.createHash('sha1');
    hash.update(plainText);
    hash.update(salt);
    return hash.digest('hex');
};

schema.pre('save', function (next) {

    if (this.isModified('password')) {
        this.salt = this.constructor.generateSalt();
        this.password = this.constructor.encryptPassword(this.password, this.salt);
    }

    next();

});

schema.statics.generateSalt = generateSalt;
schema.statics.encryptPassword = encryptPassword;

schema.method('correctPassword', function (candidatePassword) {
    return encryptPassword(candidatePassword, this.salt) === this.password;
});

mongoose.model('User', schema);
