'use strict';

/**
 * @ngdoc function
 * @name ocean04App.controller:HowCtrl
 * @description
 * # HowCtrl
 * Controller of the ocean04App
 */
angular.module('ocean04App')
  .controller('HowCtrl', function ($rootScope, $location,$window) {
  	$(document).scrollTop(0);
  	$rootScope.pagetitle = "Принцип Работы";
  	$window.ga('send', 'pageview', { page: $location.url() });
  });
