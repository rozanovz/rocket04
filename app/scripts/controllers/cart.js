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
    $(document).scrollTop(0);
    $rootScope.itemDescription = false;
    $(".slicknav_menu").show();
    $scope.formUser = {};

    $("#phone").mask("+38(999)999-99-99");

    $scope.checkShipping = function () {
      if(ngCart.totalCost()>500){
        $scope.shipping = 0;
      }else{
        $scope.shipping = 20;
      }
    }

    $scope.deliveryDate;

    $scope.getDeliveryDate = function (){
      var a = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"][new Date().getDay()];
      switch(a){
        case "Пн":
          $scope.deliveryDate = new Date(+new Date()+(86400000*2));
          break;
        case "Вт":
          $scope.deliveryDate = new Date(+new Date()+(86400000*1));
          break;
        case "Ср":
          $scope.deliveryDate = new Date(+new Date()+(86400000*4));
          break;
        case "Чт":
          $scope.deliveryDate = new Date(+new Date()+(86400000*3));
          break;
        case "Пт":
          $scope.deliveryDate = new Date(+new Date()+(86400000*2));
          break;
        case "Сб":
          $scope.deliveryDate = new Date(+new Date()+(86400000*1));
          break;
        case "Вс":
          $scope.deliveryDate = new Date(+new Date()+(86400000*3));
          break;
        default:
          break;
      }
      console.log($scope.deliveryDate);
    }
    $scope.getDeliveryDate();
    // 86400000 - one day in miliseconds

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
      var order_details = [];
      ngCart.getCart().items.forEach(function (key) {
        order_details.push(key._name + " - " + key._quantity);
      });
      $scope.formUser.order_details = order_details.join(", ");

      $scope.formUser.timegap = $scope.deliveryDate + '|' + $("li.active>a")[0].innerText;

      var newPhone = [];
      for (var i = 0; i<$scope.formUser.phone.length;i++){
        if($scope.formUser.phone[i] !== ")"){
          if($scope.formUser.phone[i] !== "("){
            if($scope.formUser.phone[i] !== "-"){
              newPhone.push($scope.formUser.phone[i]);
            }
          }
        } 
      }
      $scope.formUser.phone = newPhone.join('');
      
      console.log($scope.formUser);
    }

  });
