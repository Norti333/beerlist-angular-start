app.controller('AuthCtrl', function($scope, authFactory) {
  $scope.register = function() {
    authFactory.register($scope.user)
  };
});
