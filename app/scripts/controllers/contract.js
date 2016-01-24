'use strict';

/**
 * @ngdoc function
 * @name ocean04App.controller:ContractCtrl
 * @description
 * # ContractCtrl
 * Controller of the ocean04App
 */
angular.module('ocean04App')
  .controller('ContractCtrl', function ($rootScope) {
    $(document).scrollTop(0);
    $rootScope.pageTitle = "Приватность и Условия";
  });
