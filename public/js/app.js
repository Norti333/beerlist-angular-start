var app = angular.module('beerList', []);

app.config(function($stateProvider, $urlRouterProvider) {
$locationProvider.html5Mode(true);
$stateProvider.state('name', {
    url:'',
    templateUrl: ''
})

$urlRouterProvider.otherwise('');

})