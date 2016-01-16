'use strict';

/**
 * @ngdoc function
 * @name ocean04App.controller:GmapCtrl
 * @description
 * # GmapCtrl
 * Controller of the ocean04App
 */
angular.module('ocean04App')
  .controller('GmapCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    function initialize() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: new google.maps.LatLng(-19.257753, 146.823688),
    zoom: 2,
    mapTypeId: google.maps.MapTypeId.TERRAIN
  });
}
  });
