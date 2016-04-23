app.factory('UserFactory', function($http){
	
	var getPromiseForData = function(prom){
		return prom.then(function(response){
			return response.data;
		});
	};

	return {
		getOne: function(id){
			return getPromiseForData($http.get('/users/' + id));
		},

		getAll: function(){
			return getPromiseForData($http.get('/users'));
		},

		destroy: function(id){
			return getPromiseForData($http.delete('/users/' + id));
		},

		add: function(obj){
			return getPromiseForData($http.post('/users', obj));
		},

		update: function(id, obj){
			return getPromiseForData($http.put('/users/' + id, obj));
		}
	};
});