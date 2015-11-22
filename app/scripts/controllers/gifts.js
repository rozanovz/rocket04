'use strict';

/**
 * @ngdoc function
 * @name ocean04App.controller:GiftsCtrl
 * @description
 * # GiftsCtrl
 * Controller of the ocean04App
 */
angular.module('ocean04App')
  .controller('GiftsCtrl', function ($rootScope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $rootScope.rocketStart = false;
  });
