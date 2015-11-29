'use strict';

/**
 * @ngdoc function
 * @name ocean04App.controller:TeamCtrl
 * @description
 * # TeamCtrl
 * Controller of the ocean04App
 */
angular.module('ocean04App')
  .controller('storeCtrl', function ($scope, $rootScope, api, loader, ngCart) {

    $rootScope.store = true;
    $rootScope.description = false;

    this.getReceipes = function() {
      loader.notAllowed();
      api.receipe.list().then(function(response) {
        $scope.receipeLst = response.data;
        // console.log($scope.receipeLst);
        loader.allowed();
      }, function(err) {
        $scope.receipeLst = [];
        loader.allowed();
      });
    };

    this.getReceipes();

  });