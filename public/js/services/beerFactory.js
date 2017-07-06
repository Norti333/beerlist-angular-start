app.factory('beerFactory', function ($http) {
    var beerFactory = {};

    beerFactory.getBeers = function () {
        return $http.get('/beers')
           .then(function (response) {
               return angular.copy(response.data);
           });
    };
  beerFactory.addBeer = function(newBeer) {
    return $http.post('/beers', newBeer)
      .then(function(response) {
        return angular.copy(response.data)
      });
  };

beerFactory.rateBeer = function(rating, beerId){
    return $http.post('/beers/'+beerId+'/ratings',rating )
}

  beerFactory.removeBeer = function(id) {
    return $http.delete('/beers/' + id)
      .then(function(response) {
        return angular.copy(response.data);
      });
  };

    return beerFactory;
});