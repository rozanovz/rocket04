'use strict';

/**
 * @ngdoc directive
 * @name ocean04App.directive:nav
 * @description
 * # nav
 */
angular.module('ocean04App')
  .directive('rocketNavigation', function ($rootScope) {
  	$rootScope.landing;
  	$rootScope.store;
  	$rootScope.description;
  	console.log("landing: ", $rootScope.landing);
  	console.log("store: ", $rootScope.store);
  	console.log("description: ", $rootScope.description);
    return {
      templateUrl: '../../../views/directives/nav/nav.html',
      restrict: 'E'
    };
  });
