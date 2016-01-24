'use strict';

/**
 * @ngdoc function
 * @name ocean04App.controller:ContactsCtrl
 * @description
 * # ContactsCtrl
 * Controller of the ocean04App
 */
angular.module('ocean04App')
  .controller('ContactsCtrl', function ($rootScope) {
    $(document).scrollTop(0);
    $rootScope.pageTitle = "Контакты";
  });
