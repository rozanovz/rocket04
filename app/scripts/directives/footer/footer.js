'use strict';

/**
 * @ngdoc directive
 * @name ocean04App.directive:footer
 * @description
 * # footer
 */
angular.module('ocean04App')
  .directive('rocketFooter', function () {
    return {
      templateUrl: '../../../views/directives/footer/footer.html',
      restrict: 'E'
    };
  });
