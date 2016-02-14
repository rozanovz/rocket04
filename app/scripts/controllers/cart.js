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
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

    $scope.checkShipping = function (km) {
      ngCart.totalCost()>500 ? $scope.shipping = 0 : $scope.shipping = 50;
      if($scope.shipping == 50){
        km>5 ? $scope.shipping=Math.round(((km-5)*0.5+$scope.shipping)) : $scope.shipping = 50;
      }
    }

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
        originalDate: new Date(+new Date()+(86400000*i))
      };
    }

    $scope.setDeliveryDates = function(){
      $scope.dates = [$scope.getWeekDay(0)];
      $scope.dates[0].isActive = true;
      $scope.deliveryDate = $scope.dates[0].originalDate;
      for (var i=1;i<6;i++) $scope.dates.push($scope.getWeekDay(i));
    }

    $scope.setDeliveryDates();

    $scope.$watch("address", function (data) {
      if(data){
        var coor = {
          lat:data.geometry.location.lat(),
          lng:data.geometry.location.lng()
        };
        $scope.getDirection(coor);
      }
    })

    $scope.getDirection = (address) => {
      var directionsService = new google.maps.DirectionsService();
      var start = new google.maps.LatLng(48.466392, 35.025341);
      var end = new google.maps.LatLng(address.lat, address.lng);
      var bounds = new google.maps.LatLngBounds();
      bounds.extend(start);
      bounds.extend(end);
      var request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING
      };
      directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          console.log(response.routes[0].legs[0].distance.value / 1000);
          $scope.checkShipping(response.routes[0].legs[0].distance.value / 1000);
        } else {
          alert("Directions Request from " + start.toUrlValue(6) + " to " + end.toUrlValue(6) + " failed: " + status);
        }
      });
    }

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
      $scope.formUser = {email:""};
      $scope.cartItems = {};
      $scope.cartTotal = 0;
      $scope.address = {};
    }

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

      var time = $("li.active>a")[0].innerHTML;

      if(time == "НА СЕЙЧАС"){
        time = (new Date().getHours() + 1) + ":" + (new Date().getMinutes());
      }

      $scope.formUser.timegap = date + '|' + time;

      $scope.formUser.phone = "+"+$scope.formUser.phone.replace(/\W/g,"");
      console.log($scope.formUser);
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
