'use strict';

/**
 * @ngdoc function
 * @name ocean04App.controller:TeamCtrl
 * @description
 * # TeamCtrl
 * Controller of the ocean04App
 */
angular.module('ocean04App')
  .controller('cartCtrl', function ($scope, $rootScope, ngCart, api, $timeout, $location,$window) {
    $(document).scrollTop(0);
    $("#phone").mask("+38(999)999-99-99");
    $(".slicknav_menu").show();
    $rootScope.itemDescription = false;
    $rootScope.pagetitle = "Корзина";
    $scope.formUser = {
      email:""
    };
    $scope.delivery;
    $scope.address = {};
    $window.ga('send', 'pageview', { page: $location.url() });
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

    $scope.checkShipping = function () {
      if(ngCart.totalCost()>500){
        $scope.shipping = 0;
      }else{
        $scope.shipping = 40;
      }
    }

    $scope.setDeliveryDates = function(){
      $scope.dates = [{
        day:[
        "Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб",
        "Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб",
        "Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб",
        "Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"
        ][new Date().getDay()],
        date: new Date().getDate(),
        originalDate: new Date(), 
        isActive:true
      }];
      for (var i=1; i<6;i++){
        $scope.dates.push({
          day:[
          "Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб",
          "Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб",
          "Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб",
          "Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"
          ][new Date().getDay()+i],
          date:new Date(+new Date()+(86400000*i)).getDate(),
          originalDate: new Date(+new Date()+(86400000*i))
        });
      }
      console.log($scope.dates);
    }

    $scope.setDeliveryDates();

    $scope.setActiveDelivery = function (choosen){
      $('.dateWrapper').click(function(){
        $('.dateWrapper').removeClass('active');
        $(this).addClass('active');
      });
      $scope.deliveryDate = choosen.originalDate;
    }

    $scope.cartItems = ngCart.getCart();

    $scope.getCart = function(){
      $scope.cartTotal = ngCart.totalCost();
    }

    $scope.autocompleteOptions = {
      componentRestrictions: { country: 'ua' }
    }

    $scope.removeItem = function(id){
      ngCart.removeItemById(id);
    }

    $scope.countTotal = function () {
      $scope.checkShipping();
      $scope.totalWithShipping = ngCart.totalCost() + $scope.shipping;
    }

    $scope.destroyUI = function () {
      localStorage.removeItem('cart');
      $scope.formUser = {
        email:""
      };
      $scope.cartItems = {};
      $scope.cartTotal = 0;
      $scope.address = {};
    }

    $scope.getCart();
    $scope.checkShipping();
    $scope.countTotal();

    $scope.checkout = function () {
      $('#myModal').modal('show');
      if(!$scope.address.formatted_address){
        $scope.address.formatted_address = $('#adress').val();
      }
      $scope.formUser.address = $scope.address.formatted_address;
      $scope.formUser.total = (ngCart.totalCost() + $scope.shipping);

      var order_details = [];
      ngCart.getCart().items.forEach(function (key) {
        order_details.push(key._name + " - " + key._quantity);
      });
      $scope.formUser.order_details = order_details.join(", ");

      var b = new Date($scope.deliveryDate);
      var date = b.getDate()+' '+monthNames[b.getMonth()];

      $scope.formUser.timegap = date + '|' + $("li.active>a")[0].innerHTML;

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
    }

    $scope.makeOrder = function () {
      $('#myModal').modal('hide');
      api.receipe.orders($scope.formUser).then(function(response){
        $scope.notification = true;
        $scope.successOrder = true;
        $scope.destroyUI ();
      },function(err) {
        $scope.notification = true;
        $scope.errorOrder = true;
      });
    }

  });
