'use strict';

/**
 * @ngdoc overview
 * @name ocean04App
 * @description
 * # ocean04App
 *
 * Main module of the application.
 */
angular
  .module('ocean04App', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngCart.fulfilment', 
    'ui.bootstrap',
    'GoogleMapsNative'
  ])
  .config(function ($routeProvider,$httpProvider) {

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/gifts', {
        templateUrl: 'views/gifts.html',
        controller: 'GiftsCtrl',
        controllerAs: 'gifts'
      })
      .when('/how', {
        templateUrl: 'views/how.html',
        controller: 'HowCtrl',
        controllerAs: 'how'
      })
      .when('/rocket04', {
        templateUrl: 'views/store.html',
        controller: 'storeCtrl',
        controllerAs: 'store'
      })
      .when('/cart', {
        templateUrl: 'views/cart.html',
        controller: 'cartCtrl',
        controllerAs: 'cart'
      })
      .when('/desc/:id', {
        templateUrl: 'views/fulldesc.html',
        controller: 'FulldescCtrl',
        controllerAs: 'f'
      })
      .when('/gMap', {
        templateUrl: 'views/gmap.html',
        controller: 'GmapCtrl',
        controllerAs: 'gMap'
      })
      .when('/contract', {
        templateUrl: 'views/contract.html',
        controller: 'ContractCtrl',
        controllerAs: 'contract'
      })
      .when('/contacts', {
        templateUrl: 'views/contacts.html',
        controller: 'ContactsCtrl',
        controllerAs: 'contacts'
      })
      .otherwise({
        redirectTo: '/'
      });
  }).run(['$location',function(){
    // window.location.protocol = "https:";

    $('#menuStick').slicknav({
      brand:"<a href=\"#/\"><img src=\"https://rocket04.imgix.net/logo.svg?s=533089706d3998f2811d218fd2fe2fa5\" alt=\"\"></a>",
      label:"  ",
      closeOnClick: true
    });

    function centerin () {
      var b = (((document.body.clientWidth - 120) / 2)/document.body.clientWidth)*100;
      var c = b + "%";
      $('.slicknav_brand').css('left', c);
      $('.navbar-header').css('left', c);

      var d = (((document.body.clientWidth - 26) / 2)/document.body.clientWidth)*100;
      var e = d + "%";
      $('.c-loader').css('left', e);

      var f = (((document.body.clientWidth - 105) / 2)/document.body.clientWidth)*100;
      var a = f + "%";
      $('.storeLoader').css ('left', a);
    };
      
    $(window).resize(function(){
      centerin();
    });

    centerin();
  }]).animation('.rocket-view', function() {
    return {
      enter: function(element, done) {
        element.css('display', 'none');
        element.fadeIn(500, done);
        return function() {
          element.stop();
        };
      },
      leave: function(element, done) {
        element.fadeOut(500, done);
        return function() {
          element.stop();
        };
      }
    };
  });