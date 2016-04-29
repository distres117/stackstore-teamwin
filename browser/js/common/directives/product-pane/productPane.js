app.directive('productPane', function(){
  return {
    scope:{
      product: '='
    },
    controller: function($scope, CartFactory){
      $scope.getStars = function(product){
          return new Array(product.stars);
      };
      $scope.addToCart = function(product){
        return CartFactory.addToCart(product, 1);
      };
    },
    templateUrl: 'js/common/directives/product-pane/product-pane.html'
  };
});
