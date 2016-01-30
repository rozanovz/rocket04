'use strict';

/**
 * @ngdoc function
 * @name ocean04App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ocean04App
 */
angular.module('ocean04App')
  .controller('MainCtrl', function ($rootScope, $location,$window) {
  	$(document).scrollTop(0);
  	$window.ga('send', 'pageview', { page: $location.url() });
  	$rootScope.pagetitle = 'Главная Страница';
  });
