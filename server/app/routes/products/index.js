'use strict';

//this  will be the /api/products/ route
var router = require('express').Router();
var Products = require('mongoose').model('Product');

//get all products
router.get('/', function(req, res, next){
	Products.find()
	.then(function(products){
		res.json(products);
	}, next);
});

//get one product
router.get('/:id', function(req, res, next){
	Products.findOne({_id: req.params.id})
	.then(function(product){
		res.json(product);
	},next);
});

//get by category
//OM: this route will never be hit, category filtering will occur on the client
// router.get('/:category', function(req, res, next){
// 	Products.getByCategory(req.params.category) //look up category by name
// 	.then(function(products){
// 		res.json(products);
// 	}, next);
// });

//add a new product
router.post('/', function(req, res, next){
	Products.create(req.body)
	.then(function(product){
		res.json(product);
	}, next);
});

//edit a product
router.put('/:id', function(req, res, next){
	Products.findById(req.params.id)
	.then(function(product){
		var fields = Object.keys(req.body);

		fields.forEach(function(field){
			product[field] = req.body[field];
		});

		product.save()
		.then(function(product){
			res.json(product);
		});
	}, next);
});

//delete a product
router.delete('/:id', function(req, res, next){
	Products.remove({_id: req.params.id})
	.then(function(){
		res.sendStatus('204');
	})
	.then(null, next);
});





module.exports = router;
