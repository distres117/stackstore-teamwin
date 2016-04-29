app.factory('ProductsFactory', function($http){
	var ProductsFactory = {};

	ProductsFactory.fetchAll = function(){
		return $http.get('/api/products')
		.then(function(response){
			return response.data;
		});
	};

	ProductsFactory.fetchById = function(id){
		return $http.get('/api/products/' + id)
		.then(function(response){
			return response.data;
		});
	};

	ProductsFactory.fetchByCategory = function(category){
		return $http.get('/api/products/' + category)
		.then(function(respose){
			return response.data;
		});
	};

	ProductsFactory.create = function(data){
		return $http.post('/api/products', data)
		.then(function(response){
			return response.data;
		});
	};

	ProductsFactory.edit = function(id, data){
		return $http.put('/api/products/:id', data)
		.then(function(response){
			return response;
		});
	};

	ProductsFactory.delete = function(id){
		return $http.delete('/api/products/' + id);
	};


	return ProductsFactory;
});
