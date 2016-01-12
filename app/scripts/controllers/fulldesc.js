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
    $(".slicknav_menu").hide();

    // this.getReceipe = function(id) {
    //   loader.notAllowed();
    //   api.receipe.get(id).then(function(response) {
    //     $scope.receipe = response.data;
    //     var oldPrice = $scope.receipe.price.toString().split(".");
    //     $scope.receipe.newPrice = {
    //       grand:oldPrice[0],
    //       cents:oldPrice[1]
    //     }
    //     $scope.receipe.ingredients = $scope.receipe.ingredients.split("|")
    //     var oldNutrients = $scope.receipe.nutrients.split("|");
    //     $scope.receipe.newNutrients= {
    //       callories: oldNutrients[0],
    //       proteins: oldNutrients[1],
    //       fats: oldNutrients[2],
    //       carbohydrates: oldNutrients[3]
    //     };
    //     loader.allowed();
    //   }, function(err) {
    //     $scope.receipe = [];
    //     loader.allowed();
    //   });
    // };

    // this.getReceipeReal = function(id) {
    //   loader.notAllowed();
    //   api.receipe.rocketGet(id).then(function(response) {
    //     console.log(response);
    //     loader.allowed();
    //   }, function(err) {
    //     $scope.receipe = [];
    //     loader.allowed();
    //   });
    // };

    $scope.receipe;

    this.getRecepieById = function (id) {
      loader.notAllowed();
      var items = JSON.parse(localStorage.getItem('items')).filter(function filterItems (obj) {
        if(obj.id == id){
          return true;
        }
      });
      $scope.receipe = items[0];
      var oldPrice = $scope.receipe.price.toString().split(".");
      var oldNutrients = $scope.receipe.nutrients.split("|");
      var subtitle = $scope.receipe.subtitle.split("|");
      $scope.receipe.ingredients = $scope.receipe.ingredients.split("|");
      $scope.receipe.portions = subtitle[0];
      $scope.receipe.time = subtitle[1];
      $scope.receipe.newPrice = {
        grand:oldPrice[0],
        cents:oldPrice[1]
      }
      $scope.receipe.newNutrients= {
        callories: oldNutrients[0],
        proteins: oldNutrients[1],
        fats: oldNutrients[2],
        carbohydrates: oldNutrients[3]
      };
      loader.allowed();
      console.log($scope.receipe);
    }

    var id = $routeParams.id;
    // this.getReceipe(id);
    // this.getReceipeReal(id);
    this.getRecepieById(id);

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
