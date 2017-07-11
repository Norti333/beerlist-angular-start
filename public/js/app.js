var app = angular.module('beerList', ["ui.router"]);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $stateProvider
        .state('home', {
            url: '/home',
            controller: 'mainCont',
            templateUrl: '/templates/home.html'
        })
        .state('beer', {
            url: '/beer/:id',
            controller: 'beerController',
            templateUrl: '/templates/beer.html',
        })
        .state('register', {
            url: '/register',
            templateUrl: '/templates/register.html',
            controller: 'AuthCtrl'
        })
    $urlRouterProvider.otherwise('/home');
}]);