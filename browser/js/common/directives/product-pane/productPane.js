app.directive('productPane', function(){
  return {
    scope:{
      product: '='
    },
    controller: function($scope){
      $scope.getStars = function(product){
          return new Array(product.stars);
      };
    },
    templateUrl: 'js/common/directives/product-pane/product-pane.html'
  };
});
