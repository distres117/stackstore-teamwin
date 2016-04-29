app.directive('productPane', function(){
  return {
    scope:{
      product: '='
    },
    controller: function($scope, CartFactory, ngToast){
      $scope.getStars = function(product){
          return new Array(product.stars);
      };
      $scope.addToCart = function(product){
        ngToast.success({
          content: product.name + ' added to the cart!',
          timeout: 4000,
          dismissOnTimeout: true
        });
        return CartFactory.addToCart(product, 1);
      };
    },
    templateUrl: 'js/common/directives/product-pane/product-pane.html'
  };
});
