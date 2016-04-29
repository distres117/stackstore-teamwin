app.config(function($stateProvider){
  $stateProvider.state('cart', {
      url: '/cart',
      templateUrl: '/js/cart/cart.html',
      controller: function(cart, $scope, CartFactory){
        $scope.cart = cart;

        $scope.remove = function(idx){
          CartFactory.removeFromCart(idx).then(function(cart){
            $scope.cart = cart;
          });
        };

        $scope.increment = function(idx){
          CartFactory.setQuantity(idx, function(n){
            return n+1;
          })
          .then(function(item){
            $scope.cart.items[idx] = item;
          });
        };

        $scope.decrement = function(idx){
          CartFactory.setQuantity(idx, function(n){
            return (n > 1 ? n-1 : n);
          })
          .then(function(item){
            $scope.cart.items[idx] = item;
          });
        };

        $scope.subtotal = function(){
          return $scope.cart.items.reduce(function(acc, it){
            return acc + (it.price * it.quantity);
          }, 0);
        };
      },
      resolve: {
        cart: function(CartFactory){
          return CartFactory.fetchCart();
        }
      }
    });
});
