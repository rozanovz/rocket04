'use strict';

/**
 * @ngdoc service
 * @name ocean04App.loader
 * @description
 * # loader
 * Service in the ocean04App.
 */
angular.module('ocean04App')
  .service('loader', function ($http, $rootScope) {
    return{
      allowed:function (){
        $rootScope.storeLoader = false;
      }, 
      notAllowed: function () {
        $rootScope.storeLoader = true;
      }
    }
  });
