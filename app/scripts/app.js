'use strict';

/**
 * @ngdoc overview
 * @name ocean04App
 * @description
 * # ocean04App
 *
 * Main module of the application.
 */
angular
  .module('ocean04App', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngCart',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/gifts', {
        templateUrl: 'views/gifts.html',
        controller: 'GiftsCtrl',
        controllerAs: 'gifts'
      })
      .when('/how', {
        templateUrl: 'views/how.html',
        controller: 'HowCtrl',
        controllerAs: 'how'
      })
      .when('/rocket04', {
        templateUrl: 'views/rocket04.html',
        controller: 'storeCtrl',
        controllerAs: 'store'
      })
      .when('/cart', {
        templateUrl: 'views/cart.html',
        controller: 'cartCtrl',
        controllerAs: 'cart'
      })
      .when('/desc/:id', {
        templateUrl: 'views/fulldesc.html',
        controller: 'FulldescCtrl',
        controllerAs: 'f'
      })
      .otherwise({
        redirectTo: '/'
      });
  });