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
  	$rootScope.landing = true;
  	$rootScope.store = false;
  	$rootScope.description = false;
  });
