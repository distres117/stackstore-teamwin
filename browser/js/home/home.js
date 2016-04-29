app.config(function($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: function($scope, $state, products, categories) {
            var _products = products;
            $scope.products = products;
            $scope.categories = categories;

            $scope.filterByCategory = function(category) {
                if (category._id !== $scope.activeCat) {
                    $scope.products = _products.filter(function(it) {
                        return it.category.indexOf(category._id) > -1;
                    });
                    $scope.activeCat = category._id;
                }
                else {
                  $scope.activeCat = null;
                  $scope.products = _products;
                }

            };


        },
        resolve: {
            products: function(ProductsFactory) {
                return ProductsFactory.fetchAll();
            },
            categories: function(CategoryFactory) {
                return CategoryFactory.fetchAll();
            }
        }
    });
});
