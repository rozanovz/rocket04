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
    $(document).scrollTop(0);
    $rootScope.itemDescription = false;
    $(".slicknav_menu").show();
    $scope.receipeLst1 = [];
    $scope.recepie;

    //getting data from parse
    // this.getReceipes = function() {
    //   loader.notAllowed();
    //   api.receipe.list().then(function(response) {
    //     $scope.receipeLst = response.data;
    //     for(var i = 0; i<$scope.receipeLst.length; i++){
    //       var oldPrice = $scope.receipeLst[i].price.toString().split(".");
    //       $scope.receipeLst[i].price;
    //       $scope.receipeLst[i].newPrice = {
    //         grand:oldPrice[0],
    //         cents:oldPrice[1]
    //       }
    //     }
    //     loader.allowed();
    //   }, function(err) {
    //     $scope.receipeLst = [];
    //     loader.allowed();
    //   });
    // };

    //getting data from server Artem
    this.getReceipesList = function() {
      loader.notAllowed();
      api.receipe.rocket().then(function(response) {
        $scope.receipeLst1 = response;
        for(var i = 0; i<$scope.receipeLst1.length; i++){
          var oldPrice = $scope.receipeLst1[i].price.toString().split(".");
          $scope.receipeLst1[i].price;
          $scope.receipeLst1[i].newPrice = {
            grand:oldPrice[0],
            cents:oldPrice[1]
          }
        }
        localStorage.setItem('items', JSON.stringify($scope.receipeLst1));
        console.log(response);
        loader.allowed();
      }, function(err) {
        $scope.receipeLst1 = [];
        loader.allowed();
      });
    };

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
      console.log(data);
      var a = ngCart.getItemById(id);
      var q = q;
      if(a._quantity >= 1){
        q = a._quantity + 1;
      }
      ngCart.addItem(id, name, price, q, data);
      this.getInCartQuantity(id);
    };

    // this.getReceipes();
    this.getReceipesList();
  });