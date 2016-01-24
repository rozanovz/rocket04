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
    $(document).scrollTop(0);
    $rootScope.itemDescription = true;
    $(".slicknav_menu").css('display','none !important');
    $scope.receipe;
    $rootScope.pageTitle;

    this.getRecepieById = function (id) {
      var items = JSON.parse(localStorage.getItem('items')).filter(function (obj) {
        if(obj.id == id){
          return true;
        }
      });
      var data = items[0];
      var oldPrice = data.price.toString().split(".");
      var oldNutrients = data.nutrients.split("|");
      var subtitle = data.subtitle.split("|");
      data.ingredients = data.ingredients.split("|");
      data.portions = subtitle[0];
      data.time = subtitle[1];
      data.newPrice = {
        grand:oldPrice[0],
        cents:oldPrice[1]
      }
      data.newNutrients= {
        callories: oldNutrients[0],
        proteins: oldNutrients[1],
        fats: oldNutrients[2],
        carbohydrates: oldNutrients[3]
      };
      $scope.receipe = data;
      $rootScope.pageTitle = $scope.receipe.title;
    }

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

    this.getRecepieById($routeParams.id);
  }]);
