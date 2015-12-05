'use strict';

/**
 * @ngdoc function
 * @name ocean04App.controller:FulldescCtrl
 * @description
 * # FulldescCtrl
 * Controller of the ocean04App
 */
angular.module('ocean04App')
  .controller('FulldescCtrl', ['$scope', 'api', '$rootScope', '$routeParams','loader', "ngCart" , function ($scope, api, $rootScope, $routeParams, loader, ngCart) {

    this.getReceipe = function(id) {
      loader.notAllowed();
      api.receipe.get(id).then(function(response) {
        $scope.receipe = response.data;
        loader.allowed();
      }, function(err) {
        $scope.receipe = [];
        loader.allowed();
      });
    };

    var id = $routeParams.id;
    this.getReceipe(id);

    //getting quantity in cart by its id 
    this.getInCartQuantity = function (id) {
      var inCartQunatity = ngCart.getItemById(id);
      var a = inCartQunatity._quantity;
      this.inCartQunatity = a;
      return this.inCartQunatity;
    };

    //removing or decrementing item quantity in cart
    this.removeFromCart = function (id) {
      var inCart = ngCart.getItemById(id);
      if(inCart._quantity === 1){
        ngCart.removeItemById(id);
      }else if(inCart._quantity > 1){
        inCart.setQuantity(-1, true)
      }else{
        return;
      }
      this.getInCartQuantity(id);
    };

    //adding or incrementing item quantity in cart
    this.AddToCart = function (id, name, price, q, data) {
      var a = ngCart.getItemById(id);
      var q = q;
      if(a._quantity >= 1){
        q = a._quantity + 1;
      }
      ngCart.addItem(id, name, price, q, data);
      this.getInCartQuantity(id);
    };

  }]);
