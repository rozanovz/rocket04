'use strict';

/**
 * @ngdoc service
 * @name ocean04App.helper
 * @description
 * # helper
 * Service in the ocean04App.
 */
angular.module('ocean04App')
  .service('helper', function ($scope, $rootScope) {
    return{
      cart: function () {
        $rootScope.cart = [];
        this.addToCart = function (item) {
          $rootScope.cart.push(item);
          console.log($rootScope.cart);
        };
      }
    }
  });
