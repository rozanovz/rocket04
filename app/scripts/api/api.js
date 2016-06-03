export default function api ($http,$q,$window) {
    $http.defaults.useXDomain = true;
    $http.defaults.headers.post["Content-Type"] = "text/plain";
    var url = 'https://rocket04.com/'

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
         $http.post(url+suburl,param)
        .success(function (data) {
          resolve(data);
        }).error(function (data, status, headers, config) {
          var a = JSON.stringify(arguments);
          alert(a);
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
};