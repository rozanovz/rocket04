'use strict';

/**
 * @ngdoc function
 * @name ocean04App.controller:GmapCtrl
 * @description
 * # GmapCtrl
 * Controller of the ocean04App
 */
angular.module('ocean04App')
  .controller('GmapCtrl', function ($rootScope, $location,$window) {
    $(document).scrollTop(0);
    $rootScope.pagetitle = "Зона Доставки";
    $window.ga('send', 'pageview', { page: $location.url() });
  });
