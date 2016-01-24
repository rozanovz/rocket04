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
  	$rootScope.pageTitle = "О Нас";
  	$(document).scrollTop(0);
  });
