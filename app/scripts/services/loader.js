'use strict';

/**
 * @ngdoc service
 * @name ocean04App.loader
 * @description
 * # loader
 * Service in the ocean04App.
 */
angular.module('ocean04App')
  .service('loader', function ($http,$rootScope,$window,$location) {
    return{
      allowed:function (){
        $rootScope.storeLoader = false;
        $('.loader').css('display','none');
      }, 
      notAllowed: function () {
        $rootScope.storeLoader = true;
        $('.loader').css('display','block');
      },
      gaTitleScroll: function (title) {
        $rootScope.pagetitle = title;
        $(document).scrollTop(0);
        $window.ga('send', 'pageview', { page: $location.url() });
      }
    }
  });
