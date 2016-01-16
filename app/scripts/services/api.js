'use strict';

angular.module('ocean04App')
  .service('api', function ($http,$q,$cookies,$cookieStore,$window) {
    $http.defaults.useXDomain = true;
    var url = window.location.protocol+'//rocket04.com/'

// MAIN API REQUEST METHODS
    var list =  function (suburl,field,param){
      return $q(function(resolve, reject) {
        $http({
          method:'GET',
          url: url+suburl,
          params:param
        }).success(function (data) {
          for(var i = 0; i<data.length; i++){
            var oldPrice = data[i].price.toString().split(".");
            data[i].price;
            data[i].newPrice = {
              grand:oldPrice[0],
              cents:oldPrice[1]
            }
          }
          localStorage.setItem('items', JSON.stringify(data));
          resolve(data);
        }).error(function (data, status, headers, config) {
          if(reject){
            reject(data);
          }
        });
      });
    };

    var post = function(suburl,param){
      return $q(function(resolve, reject) {
        $http.post(url+suburl,param, {headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }})
        .success(function (data) {
          console.log(data);
          resolve(data);
        }).error(function (data, status, headers, config) {
          reject(data);
        });
      });
    };

//API functionality
    return {
      receipe: {
        store: function () {
          return list('get_recipes');
        },
        orders: function (order) {
          return post('order', order);
        }
      }
    };
  });
