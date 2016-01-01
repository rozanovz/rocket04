'use strict';

/**
 * @ngdoc function
 * @name ocean04App.controller:TeamCtrl
 * @description
 * # TeamCtrl
 * Controller of the ocean04App
 */
angular.module('ocean04App')
  .controller('cartCtrl', function ($scope, $rootScope, ngCart) {
    $rootScope.store = true;
    $rootScope.description = true;

    $scope.cartItems = ngCart.getCart();

    $scope.getCart = function(){
      $scope.cartTotal = ngCart.totalCost();
    }

    $scope.removeItem = function(id){
      ngCart.removeItemById(id);
    }

    $scope.getCart();

  });
