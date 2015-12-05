'use strict';

/**
 * @ngdoc directive
 * @name ocean04App.directive:nav
 * @description
 * # nav
 */
angular.module('ocean04App')
  .directive('rocketNavigation', function ($rootScope) {
    return {
      templateUrl: '../../../views/directives/nav/nav.html',
      restrict: 'E'
    };
  });
