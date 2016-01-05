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

    $scope.formUser = {};

    $scope.checkShipping = function () {
      if(ngCart.totalCost()>500){
        $scope.shipping = 0;
      }else{
        $scope.shipping = 20;
      }
    }

    $scope.cartItems = ngCart.getCart();

    $scope.getCart = function(){
      $scope.cartTotal = ngCart.totalCost();
    }

    $scope.removeItem = function(id){
      ngCart.removeItemById(id);
    }

    $scope.countTotal = function () {
      $scope.checkShipping();
      $scope.totalWithShipping = ngCart.totalCost() + $scope.shipping;
    }

    $scope.getCart();
    $scope.checkShipping();
    $scope.countTotal();

    $scope.checkout = function () {
      var items = ngCart.getCart().items;
      items.forEach(function (key) {
        delete key._data;
        delete key._id;
        delete key.$$hashKey;
      });
      $scope.formUser.items = items;
      console.log(JSON.stringify($scope.formUser));
    }

  });
