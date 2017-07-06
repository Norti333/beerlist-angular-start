app.factory('beerFactory', function ($http) {
    var beerFactory = {};
    beerFactory.calcRatings = function (ratings) {
        var total = 0;
        for (var i = 0; i < ratings.length; i++) {
            total = total + ratings[i]
        }
        var calcAvg = total / ratings.length;
        var avg = calcAvg.toFixed(2);
        return avg;
    }
    beerFactory.getBeers = function () {
        return $http.get('/beers')
            .then(function (response) {
                return angular.copy(response.data);
            });
    };
    beerFactory.addBeer = function (newBeer) {
        return $http.post('/beers', newBeer)
            .then(function (response) {
                return angular.copy(response.data)
            });
    };
    beerFactory.rateBeer = function (rating, beerId) {
        return $http.post('/beers/' + beerId + '/ratings', rating).then(function (response) {
            return angular.copy(response.data);
        })
    }
    beerFactory.removeBeer = function (id) {
        return $http.delete('/beers/' + id)
            .then(function (response) {
                return angular.copy(response.data);
            });
    };
    beerFactory.updateBeer = function (beer) {
        return $http.put('/beers/' + beer._id, beer)
            .then(function (response) {
                return response.data
            });
    };

    return beerFactory;
});