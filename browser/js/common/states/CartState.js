'use strict';

juke.config(function($stateProdiver){
  $stateProdiver.state('cart', {
  	url: '/cart',
  	templateUrl: '',
  	controller: 'CartCtrl',
  	resolve: {
  		cart: function(CartFactory){
  			return CartFactory.getCart();
  		}
  	}
  });

});