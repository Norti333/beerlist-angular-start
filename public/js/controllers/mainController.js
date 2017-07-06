app.controller('mainCont', function ($scope, beerFactory) {
    $scope.modeChange = function(){
        if ($scope.list.show == true){
            $scope.list.edit = true
            $scope.list.show = false
        } else {
            $scope.list.edit = false
            $scope.list.show = true
        }
    }
    $scope.list = {
        show: true,
        edit: false
    }
    $scope.beers = []
    $scope.rateBeer = function () {
        rating = {
            rating: this.userRating
        }
        beerFactory.rateBeer(rating, this.beer._id).then(function (updatedBeer) {
            for (var i = 0; i < $scope.beers.length; i++) {
                if ($scope.beers[i]._id == updatedBeer._id) {
                    $scope.beers[i].ratings = updatedBeer.ratings
                    var avg = beerFactory.calcRatings($scope.beers[i].ratings)
                    return $scope.beers[i].avg = avg
                }}})}
    $scope.addBeer = function () {
        var newBeer = {
            name: this.name,
            style: this.style,
            abv: this.abv,
            image_url: this.image
        }
        beerFactory.addBeer(newBeer)
            .then(function (beer) {
                $scope.beers.push(beer);
            })
            .catch(function (error) {
                console.log(error)
            });
    }
    $scope.SortVal = 'avg'

    $scope.sortBy = function () {
        if ($scope.sortDir == true) {
            $scope.sortDir = false
        } else {
            $scope.sortDir = true
        }
    }

    beerFactory.getBeers()
        .then(function (beers) {
            $scope.beers = beers;
        })
        .catch(function (error) {
            console.log(error)
        });
    $scope.removeBeer = function () {
        var beerId = this.beer._id
        beerFactory.removeBeer(beerId)
            .then(function (beer) {
                for (var i = 0; i < $scope.beers.length; i++) {
                    if ($scope.beers[i]._id === beer._id) {
                        $scope.beers.splice(i, 1);
                        break;
                    }
                }
            })
            .catch(function (error) {
                console.log(error)
            });
    }


$scope.updatedBeer = function(){
    
    var updatedBeer = {
        _id:this.beer._id,
        name: this.newName,
        style: this.newStyle,
        abv: this.newAbv,
        image_url: this.newImage
    } 
    beerFactory.updateBeer(updatedBeer).then(function(beer){
         for (var i = 0; i < $scope.beers.length; i++) {
                    if ($scope.beers[i]._id === beer._id) {
                        $scope.beers[i] = beer;
                        break;
                    }
                }
    })
}
});