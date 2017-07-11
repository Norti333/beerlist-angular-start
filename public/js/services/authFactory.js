app.factory('authFactory', function($http) {
  var auth = {};
  auth.register = function(user) {
    return $http.post('/users/register', user);
  };
  return auth;
});

