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

    $scope.a = [];
    this.getCart = function () {
      $scope.a = ngCart.getCart().items;
      console.log($scope.a);
    }

    this.removeFromCart = function (id) {
      var inCart = ngCart.getItemById(id);
      console.log(inCart);
      if(inCart._quantity === 1){
        ngCart.removeItemById(id);
      }else if(inCart._quantity > 1){
        inCart.setQuantity(-1, true)
      }else{
        return;
      }
    };

    this.getLocalData = function (id) {
      var a = ngCart.getItemById(id);
    };

    this.AddToCart = function (id, name, price, q, data) {
      var a = ngCart.getItemById(id);
      var q = q;
      console.log(a);
      if(a._quantity >= 1){
        q = a._quantity + 1;
      }

      ngCart.addItem(id, name, price, q, data);
      this.getCart();
    };

    this.getReceipes();
    this.getReceipesList();
    this.getCart();
  });