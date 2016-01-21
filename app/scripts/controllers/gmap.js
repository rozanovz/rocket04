'use strict';

/**
 * @ngdoc function
 * @name ocean04App.controller:GmapCtrl
 * @description
 * # GmapCtrl
 * Controller of the ocean04App
 */
angular.module('ocean04App')
  .controller('GmapCtrl', function ($rootScope) {
    $(document).scrollTop(0);
     $rootScope.initMap = function() {
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 17,
        center: {lat: 48.46238585, lng: 35.05232421}
      });

      var ctaLayer = new google.maps.KmlLayer({
        url: '/Users/limestore/Desktop/rocket04/app/Sloy_bez_nazvania_kml.kml',
        map: map
      });
    }

  });
