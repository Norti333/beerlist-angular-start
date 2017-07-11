app.factory('authFactory', function ($http) {

  var auth = {};
  auth.currentUser = {};

  auth.register = function (user) {
    return $http.post('/users/register', user)
      .then(function (response) {
        auth.currentUser.username = response.data.username
      });;
  };

  auth.login = function (user) {
    return $http.post('/users/login', user)
      .then(function (response) {
        auth.currentUser.username = response.data
      });
  };

  return auth;
});