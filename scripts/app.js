'use strict';

angular.module('uncleistvanApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  '$strap.directives'
]).config(function ($routeProvider) {
    $routeProvider.when('/login', {templateUrl: 'views/login.html', controller: 'LoginCtrl'});
    $routeProvider.when('/home', {templateUrl: 'views/home.html', controller: 'HomeCtrl'});
    $routeProvider.otherwise({redirectTo: '/login'});
  });
