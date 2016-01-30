'use strict';

/**
 * @ngdoc function
 * @name ocean04App.controller:ContractCtrl
 * @description
 * # ContractCtrl
 * Controller of the ocean04App
 */
angular.module('ocean04App')
  .controller('ContractCtrl', function ($rootScope,$location,$window) {
    $(document).scrollTop(0);
    $rootScope.pagetitle = "Приватность и Условия";
    $window.ga('send', 'pageview', { page: $location.url() });
  });
