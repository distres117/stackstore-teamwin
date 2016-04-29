'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var mongoose = require('mongoose');
var Order = mongoose.model('Order');

router.get('/', function(req, res,next){
  //returns a new order
  var order = new Order();
  res.json(order);
});

router.post('/addItem', function(req, res, next) {
  var p = new Promise(function(resolve, reject) {
    if (req.session.order) {
      Order.findById(req.session.order)
        .then(resolve);
    } else {
      var o = new Order();
      req.session.order = o._id;
      resolve(o);
    }

  });

  p.then(function(order) {
      return order.addItem(req.body);
    })
    .then(function(order) {
      res.send(order);
    });
});

router.post('/removeItem', function(req, res) {
  Order.findById(req.session.order)
    .then(function(order) {
      return order.removeItem(req.body);
    })
    .then(function(order) {
      res.send(order);
    })
});

router.post('/commit', function(req, res, next) {
  Order.findById(req.session.order)
    .then(function(order){
      return order.commit();
    })
    .then(function(order) {
      res.send(order);
    }, next);
});
