'use strict';

/**
 * @ngdoc function
 * @name ocean04App.controller:ContactsCtrl
 * @description
 * # ContactsCtrl
 * Controller of the ocean04App
 */
angular.module('ocean04App')
  .controller('ContactsCtrl', function ($rootScope, $location,$window) {
    $(document).scrollTop(0);
    $rootScope.pagetitle = "Контакты";
    $window.ga('send', 'pageview', { page: $location.url() });
  });
