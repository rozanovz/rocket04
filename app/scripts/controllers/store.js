'use strict';

/**
 * @ngdoc function
 * @name ocean04App.controller:TeamCtrl
 * @description
 * # TeamCtrl
 * Controller of the ocean04App
 */
angular.module('ocean04App')
  .controller('storeCtrl', function ($scope, $rootScope, api, loader, ngCart, ngCartItem) {

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

    this.getReceipesList = function() {
      loader.notAllowed();
      api.receipe.data().then(function(response) {
        $scope.receipeLst1 = response.data;
        console.log($scope.receipeLst1);
        loader.allowed();
      }, function(err) {
        $scope.receipeLst = [];
        loader.allowed();
      });
    };

    this.removeFromCart = function (id) {
      ngCart.removeItemById(id);
    };

    this.getLocalData = function (id) {
      var a = ngCart.getItemById(id);
      console.log(a._quantity);
    };

    this.AddToCart = function (id, name, price, q, data) {
      console.log(arguments);
      ngCart.addItem(id, name, price, q, data);
      this.getLocalData(id);
    };

    this.getReceipes();
    this.getReceipesList();
  });