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
    $scope.spinner=false;

    //getting data from server Artem
    this.getReceipesList = function() {
      loader.notAllowed();
      api.receipe.store().then(function(response) {
        $scope.receipeLst1 = response;
        loader.allowed();
      }, function(err) {
        $scope.receipeLst1 = [];
        loader.allowed();
      });
    };


    $scope.colourIncludes = [];
      
    $scope.includeColour = function(colour) {
      console.log(colour);
      var i = $.inArray(colour, $scope.colourIncludes);
      if (i > -1) {
        $scope.colourIncludes.splice(i, 1);
      } else {
        $scope.colourIncludes.push(colour);
      }
    }
      
    $scope.colourFilter = function(fruit) {
      if ($scope.colourIncludes.length > 0) {
        if ($.inArray(fruit.tag, $scope.colourIncludes) < 0)
          return;
      }  
      return $scope.receipeLst1;
    }

    $scope.clearFilter = function () {
      $scope.colourIncludes = [];
      $( "input[type=\"checkbox\"]" ).prop( "checked", false );
    }

    //getting quantity in cart by its id 
    this.getInCartQuantity = function (id) {
      var inCartQunatity = ngCart.getItemById(id);
      var a = inCartQunatity._quantity;
      this.inCartQunatity = a;
      return this.inCartQunatity;
    };

    this.loaderInQuantity = function (id) {
      $scope.spinner=true;
      setTimeout(function(){
        $scope.spinner=false;
      }, 5000)
      return this.getInCartQuantity(id);
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

    $(window).scroll(function(){
      var sticky = $('.storeNav'),
          scroll = $(window).scrollTop();

      if (scroll >= 80) sticky.addClass('fixed');
      else sticky.removeClass('fixed');
    });

    // this.getReceipes();
    this.getReceipesList();
  });