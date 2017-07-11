app.controller('beerController', function ($scope, $stateParams, beerFactory) {
   beerFactory.getBeerReview($stateParams.id).then(function (beer) {
            $scope.beer = beer;
        })
        .catch(function (error) {
            console.log(error)
        });
    $scope.beer = ''

    $scope.addReview = function(){
         var review = {name:$scope.reviewName, text: $scope.reviewText}
        beerFactory.newReview($scope.beer._id , review).then(function (beer) {
            $scope.beer = beer;
        })
        .catch(function (error) {
            console.log(error)
        });
    }
$scope.deleteReview = function(){
    beerFactory.deleteReview(this.beer._id,this.review._id).then(function (beer) {
            $scope.beer = beer;
        })
        .catch(function (error) {
            console.log(error)
        });
}

});