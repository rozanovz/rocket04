'use strict';

/**
 * @ngdoc directive
 * @name ocean04App.directive:nav
 * @description
 * # nav
 */
angular.module('ocean04App')
  .directive('rocketNavstore', function ($rootScope) {
    return {
      templateUrl: '../../../views/directives/navStore/navStore.html',
      restrict: 'E'
    };
  });
