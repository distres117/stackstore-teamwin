app.factory('UserFactory', function($http){
	
	var getPromiseForData = function(prom){
		return prom.then(function(response){
			return response.data;
		});
	};

	return {
		getOne: function(id){
			return getPromiseForData($http.get('/api/users/' + id));
		},

		delete: function(id){
			return getPromiseForData($http.delete('/api/users/' + id));
		},

		add: function(obj){
			return getPromiseForData($http.post('/api/users', obj));
		},

		update: function(id, obj){
			return getPromiseForData($http.put('/api/users/' + id, obj));
		}
	};
});