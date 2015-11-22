'use strict';

/**
 * @ngdoc function
 * @name ocean04App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ocean04App
 */
angular.module('ocean04App')
  .controller('MainCtrl', function ($rootScope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $rootScope.rocketStart = false;
  });
