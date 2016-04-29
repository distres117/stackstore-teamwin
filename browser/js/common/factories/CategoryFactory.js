app.factory('CategoryFactory', function($http){

  return {
    fetchAll: function(){
      return $http.get('/api/categories')
      .then(function(res){
        return res.data;
      });
    },
    fetchById: function(id){
    	return $http.get('/api/categories/' + id)
    	.then(function(res){
    		return res.data;
    	});
    },
    delete: function(id){
    	return $http.delete('/api/categories/' + id)
    },
    create: function(name){
    	return $http.put('/api/categories/' + name)
    	.then(function(res){
    		return res.data;
    	});
    }
  };
});
