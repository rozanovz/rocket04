//config.api.url = url to server
//subUrl - name of class

var get =  function (suburl,param){
  return $q(function(resolve, reject) {
    $http({
      method:'GET',
      url: $window.location.protocol+'//'+config.api.url+suburl,
      params:param
    }).success(function (data) {
      if (data.status === 'ok'){
        delete data.status;
        resolve(data);
      }else if (data.status === 'error'){
        delete data.status;
        reject(data);
      }
    }).error(function (data, status, headers, config) {
      if(reject){
        reject(data);
      }
    });
  });
};

var list =  function (suburl,field,param){
  return $q(function(resolve, reject) {
    $http({
      method:'GET',
      url: $window.location.protocol+'//'+config.api.url+suburl,
      params:param
    }).success(function (data) {
      if (data.status === 'ok'){
        delete data.status;
        var list = [];
        Object.keys(data[field]).forEach(function(key){
          list.push({
            id:parseInt(key),
            title:data[field][key]
          });
        });
        resolve(list);
      }else if (data.status === 'error'){
        delete data.status;
        reject(data);
      }
    }).error(function (data, status, headers, config) {
      if(reject){
        reject(data);
      }
    });
  });
};

var post = function(suburl,param){
  return $q(function(resolve, reject) {$http.post(
    $window.location.protocol+'//'+config.api.url+suburl,
      param,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).success(function (data) {
      if (data.status === 'ok'){
        delete data.status;
        resolve(data);
      }else if (data.status === 'error'){
        delete data.status;
        reject(data);
      }
    }).error(function (data, status, headers, config) {
      if(reject){
        reject(data);
      }
    });
  });
};