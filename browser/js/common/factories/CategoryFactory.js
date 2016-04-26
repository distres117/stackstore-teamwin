app.factory('CategoryFactory', function($http){

  return {
    fetchAll: function(){
      return $http.get('/api/categories').then(function(res){
        return res.data;
      });
    }
  };
});
