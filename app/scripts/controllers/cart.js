'use strict';

/**
 * @ngdoc function
 * @name ocean04App.controller:TeamCtrl
 * @description
 * # TeamCtrl
 * Controller of the ocean04App
 */
angular.module('ocean04App')
  .controller('cartCtrl', function ($scope, $rootScope, $timeout, loader, ngCart, api) {
    loader.gaTitleScroll("Корзина");
    $("#phone").mask("+38(999)999-99-99");
    $(".slicknav_menu").show();
    $rootScope.itemDescription = false;
    $scope.formUser = {email:""};
    $scope.delivery;
    $scope.address = {};
    $scope.discount ={
      code: ''
    };
    $scope.timeGaps = [
      {
        isAvailable: true,
        gap: "НА СЕЙЧАС",
        isActive: true
      },{
        isAvailable: true,
        gap: "18.00 - 19.00",
        isActive: false
      },{
        isAvailable: true,
        gap: "19.00 - 20.00",
        isActive: false
      },{
        isAvailable: true,
        gap: "20.00 - 21.00",
        isActive: false
      },{
        isAvailable: true,
        gap: "21.00 - 22.00",
        isActive: false
      }
    ];

    $scope.selectedGap = $scope.timeGaps[0].gap;

    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

    $scope.checkShipping = function (km) {
      ngCart.totalCost()>500 ? $scope.shipping = 0 : $scope.shipping = 50;
      if($scope.shipping == 50){
        km>5 ? $scope.shipping=Math.round(((km-5)*0.5+$scope.shipping)) : $scope.shipping = 50;
      }
    };

    $scope.getWeekDay = function (i) {
      if(new Date().getHours() >= 18) i=i+1;
      return {
        day:[
          "Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб",
          "Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб",
          "Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб",
          "Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"
        ][new Date().getDay()+i],
        date:new Date(+new Date()+(86400000*i)).getDate(),
        originalDate: new Date(+new Date()+(86400000*i)),
        isActive:false 
      };
    };

    $scope.setDeliveryDates = function(){
      $scope.dates = [$scope.getWeekDay(0)];
      $scope.dates[0].isActive = true;
      $scope.deliveryDate = $scope.dates[0].originalDate;
      for (var i=1;i<6;i++) $scope.dates.push($scope.getWeekDay(i));
    };

    $scope.setDeliveryDates();

    $scope.$watch("address", function (data) {
      if(data.geometry){
        var coor = {
          lat:data.geometry.location.lat(),
          lng:data.geometry.location.lng()
        };
        $scope.getDirection(coor);
      }
    });

    $scope.getDirection = (address) => {
      var directionsService = new google.maps.DirectionsService(),
          start = new google.maps.LatLng(48.466392, 35.025341),
          end = new google.maps.LatLng(address.lat, address.lng),
          bounds = new google.maps.LatLngBounds();
      bounds.extend(start);
      bounds.extend(end);
      var request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING
      };
      directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK)
          $scope.checkShipping(response.routes[0].legs[0].distance.value / 1000);
      });
    };

    $scope.setActiveDelivery = function (choosen){
      $scope.dates.forEach(function (key) {key.isActive = false;});
      $scope.dates[$scope.dates.indexOf(choosen)].isActive = true;
      $scope.deliveryDate = choosen.originalDate;
    };

    $scope.cartItems = ngCart.getCart();

    $scope.getCart = function(){
      $scope.cartTotal = ngCart.totalCost();
    };

    $scope.autocompleteOptions = {
      componentRestrictions: { country: 'ua' }
    };

    $scope.removeItem = function(id){
      ngCart.removeItemById(id);
    };

    $scope.countTotal = function () {
      $scope.checkShipping();
      $scope.totalWithShipping = ngCart.totalCost() + $scope.shipping;
      $scope.percent = '';
    };

    $scope.enterPress = function(e){
      if(e.keyCode == 13){
        $scope.discountCheck();
      }
    };

    $scope.destroyUI = function () {
      localStorage.removeItem('cart');
      $scope.formUser = {email:""};
      $scope.cartItems = {};
      $scope.cartTotal = 0;
      $scope.address = {};
    };

    $scope.setGap = function (gap){
      $scope.selectedGap = gap.gap;
    };

    $scope.checkGaps = function () {
      var checkGap = new Date().getHours();
      console.log(checkGap);
      if(18>=checkGap<=10){
        $scope.selectedGap = $scope.timeGaps[1].gap;
        $scope.timeGaps[0].isAvailable = false;
        $scope.timeGaps[0].isActive = false;
        $scope.timeGaps[0].isActive = true;
      }
    };

    $scope.getCart();
    $scope.checkShipping();
    $scope.countTotal();

    $scope.checkout = function () {
      $('#myModal').modal('show');
      if(!$scope.address.formatted_address)
        $scope.address.formatted_address = $('#adress').val();
      
      $scope.formUser.address = $scope.address.formatted_address;
      $scope.formUser.total = (ngCart.totalCost() + $scope.shipping);

      var order_details = [];
      ngCart.getCart().items.forEach(function (key) {
        order_details.push(key._name + " - " + key._quantity);
      });
      $scope.formUser.order_details = order_details.join(", ");

      var date = new Date($scope.deliveryDate).getDate()+' '+monthNames[new Date($scope.deliveryDate).getMonth()];
      var time = $scope.selectedGap;

      if(time == "НА СЕЙЧАС"){
        time = (new Date().getHours() + 1) + ":" + (new Date().getMinutes());
      }

      $scope.formUser.timegap = date + '|' + time;

      $scope.formUser.phone = "+"+$scope.formUser.phone.replace(/\W/g,"");
      console.log($scope.formUser);
    };

    $scope.discountCheck = function () {
      $scope.discountLoader = true;
      api.receipe.discount($scope.discount).then(function(data){
        $scope.totalWithShipping = $scope.totalWithShipping - ($scope.totalWithShipping/100*data.discount);
        $scope.percent = data.discount;
        if(data.discount == 0) {
          $scope.discountError = true;
        }
        $scope.discountLoader = false;
      }, function (err) {
        console.log(err);
        $scope.discountLoader = false;
      })
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
