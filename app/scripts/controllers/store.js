'use strict';

/**
 * @ngdoc function
 * @name ocean04App.controller:TeamCtrl
 * @description
 * # TeamCtrl
 * Controller of the ocean04App
 */
angular.module('ocean04App')
  .controller('storeCtrl', function ($scope, $rootScope, api) {
    $rootScope.rocketStart = true;

    this.getReceipes = function() {
      api.receipe.list().then(function(response) {
        $scope.receipeLst = response.data;
        console.log($scope.receipeLst);
      }, function(err) {
        $scope.receipeLst = [];
      });
    };

    this.getReceipes();

  });