'use strict';

/**
 * @ngdoc function
 * @name ocean04App.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the ocean04App
 */
angular.module('ocean04App')
  .controller('AboutCtrl', function ($rootScope,$location,$window,Page) {
  	$rootScope.pagetitle = "О Нас";
  	$(document).scrollTop(0);
  	$window.ga('send', 'pageview', { page: $location.url() });
  	Page.setTitle('title1');
  });
