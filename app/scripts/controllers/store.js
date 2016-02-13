'use strict';

/**
 * @ngdoc function
 * @name ocean04App.controller:TeamCtrl
 * @description
 * # TeamCtrl
 * Controller of the ocean04App
 */
angular.module('ocean04App')
  .controller('storeCtrl', function ($scope, $rootScope, api, loader, ngCart, ngCartItem, $interval) {
    loader.gaTitleScroll("Ежедневное Меню");
    $rootScope.itemDescription = false;
    $(".slicknav_menu").show();
    $scope.receipeLst1 = [];
    $scope.colourIncludes = [];

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

    var countDownTimer = new Date().getHours();
    $scope.countDownFlag = false;

    if(countDownTimer == 17){
      $scope.countDownFlag = true;
      $scope.countDown = 59-new Date().getMinutes();
      $interval(function() {
        $scope.countDown = $scope.countDown - 1
        if ($scope.countDown == 0){
          $scope.stopCountDown();
          $scope.countDownFlag = false;
        }
        console.log($scope.countDown);
      }, 60000);
    }

    $scope.stopCountDown = function() {
      if (angular.isDefined(stop)) {
        $interval.cancel(stop);
        stop = undefined;
      }
    };

    $scope.includeColour = function(colour) {
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
      $('input[type="checkbox"]').prop( "checked", false ).parent().css('background', 'white');
    }

    //getting quantity in cart by its id 
    this.getInCartQuantity = function (id) {
      // var inCartQunatity = ngCart.getItemById(id);
      // var a = inCartQunatity._quantity;
      // this.inCartQunatity = ngCart.getItemById(id)._quantity;
      // return this.inCartQunatity;
      return ngCart.getItemById(id)._quantity;
    };

    //removing or decrementing item quantity in cart
    this.removeFromCart = function (id) {
      // var inCart = ngCart.getItemById(id);
      // if(inCart._quantity === 1){
      //   ngCart.removeItemById(id);
      // }else if(inCart._quantity > 1){
      //   inCart.setQuantity(-1, true)
      // }else{
      //   return;
      // }
      ngCart.getItemById(id)._quantity === 1 ? 
        ngCart.removeItemById(id) : 
          ngCart.getItemById(id).setQuantity(-1, true);
      this.getInCartQuantity(id);
    };

    //adding or incrementing item quantity in cart
    this.AddToCart = function (id, name, price, q, data) {
      if(ngCart.getItemById(id)._quantity >= 1) q = ngCart.getItemById(id)._quantity + 1;
      ngCart.addItem(id, name, price, q, data);
      this.getInCartQuantity(id);
    };

    $(window).scroll(function(){
      if ($(window).scrollTop() >= 79) $('.storeNav').addClass('fixed');
      else $('.storeNav').removeClass('fixed');
    });

    this.getReceipesList();
  });