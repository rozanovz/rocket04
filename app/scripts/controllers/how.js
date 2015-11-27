'use strict';

/**
 * @ngdoc function
 * @name ocean04App.controller:HowCtrl
 * @description
 * # HowCtrl
 * Controller of the ocean04App
 */
angular.module('ocean04App')
  .controller('HowCtrl', function ($rootScope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $rootScope.rocketStart = false;
  });
