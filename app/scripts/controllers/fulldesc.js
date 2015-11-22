'use strict';

/**
 * @ngdoc function
 * @name ocean04App.controller:FulldescCtrl
 * @description
 * # FulldescCtrl
 * Controller of the ocean04App
 */
angular.module('ocean04App')
  .controller('FulldescCtrl', ['$scope', 'api', '$rootScope', '$routeParams' , function ($scope, api, $rootScope, $routeParams) {

    var id = $routeParams.id;
    $rootScope.rocketStart = true;

    this.getReceipe = function(id) {
      api.receipe.get(id).then(function(response) {
        $scope.receipe = response.data;
        console.log($scope.receipe);
      }, function(err) {
        $scope.receipe = [];
      });
    };

    var id = $routeParams.id;
    console.log(id);
    this.getReceipe(id);

  }]);
