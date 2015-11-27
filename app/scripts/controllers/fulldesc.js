'use strict';

/**
 * @ngdoc function
 * @name ocean04App.controller:FulldescCtrl
 * @description
 * # FulldescCtrl
 * Controller of the ocean04App
 */
angular.module('ocean04App')
  .controller('FulldescCtrl', ['$scope', 'api', '$rootScope', '$routeParams','loader' , function ($scope, api, $rootScope, $routeParams, loader) {

    var id = $routeParams.id;
    $rootScope.fulldesc = true;

    this.getReceipe = function(id) {
      loader.notAllowed();
      api.receipe.get(id).then(function(response) {
        $scope.receipe = response.data;
        loader.allowed();
      }, function(err) {
        $scope.receipe = [];
        loader.allowed();
      });
    };

    var id = $routeParams.id;
    console.log(id);
    this.getReceipe(id);

  }]);
