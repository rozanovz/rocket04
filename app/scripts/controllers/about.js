'use strict';

/**
 * @ngdoc function
 * @name ocean04App.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the ocean04App
 */
angular.module('ocean04App')
  .controller('AboutCtrl', function ($rootScope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $rootScope.rocketStart = false;
  });
