'use strict';

angular.module('ocean04App')
  .service('api', function ($http,$q,$cookies,$cookieStore,$window) {
    $http.defaults.useXDomain = true;
    var url = 'http://www.rocket04.com/'

// MAIN API REQUEST METHODS STARTS============================================================================
    var get =  function (suburl, param){
      return $q(function(resolve, reject) {
        $http({
          method:'GET',
          url: url+suburl,
          params:param
        }).success(function (data) {
            resolve(data);
        }).error(function (data, status, headers, config) {
            reject(data);
        });
      });
    };

    var list =  function (suburl,field,param){
      return $q(function(resolve, reject) {
        $http({
          method:'GET',
          url: url+suburl,
          params:param
        }).success(function (data) {
          resolve(data);
        }).error(function (data, status, headers, config) {
          if(reject){
            reject(data);
          }
        });
      });
    };

    var post = function(suburl,param){
      return $q(function(resolve, reject) {$http.post(url+suburl, param, {headers: {'Content-Type': 'application/json'}})
        .success(function (data) {
          resolve(data);
        }).error(function (data, status, headers, config) {
          reject(data);
        });
      });
    };
// MAIN API REQUEST METHODS ENDS ============================================================================

    var parse = {
      baseUrl: 'api.parse.com/1/',
      protocol: 'https:'
    };
    
    function convertUrl(url, id, params, isFunction, restrictions) {
      var where = '',
        restr = '';
      id = id || '';
      if (typeof params === 'string') {
        where = params;
      } else {
        for (var key in params) {
          where += '\"' + key + '\":\"' + params[key] + '\",';
        }
      }

      for (var key2 in restrictions) {
        restr += key2 + '=' + restrictions[key2] + '&';
      }
      if(where) {
        if (typeof params === 'object') where = where.slice(0, -1);
        where = '?where={' + where + '}';
      }
      if (restr && !where) {
        restr = '?' + restr.slice(0, -1);
      } else if (restr) {
        restr = '&' + restr.slice(0, -1);
      }
      if(isFunction) {
        return parse.protocol + '//' + parse.baseUrl + 'functions/' + url + '/' + id + where;
      } else {
        return parse.protocol + '//' + parse.baseUrl + 'classes/' + url + '/' + id + where + restr;
      }
    }

    function convertData(data, method, funcName) {
      var temp = {};

      function cleanUpdateCreate(obj) {
        delete obj.createdAt;
        delete obj.updatedAt;
        return obj;
      }
      function changeIdName(obj) {
        var id = obj.objectId;
        obj.id = id;
        delete obj.objectId;
        return obj;
      }
      function changeResultsName(obj) {
        var temp = obj.results;
        obj.data = temp;
        delete obj.results;
        return obj;
      }
      function changeResultName(obj) {
        var temp = obj.result;
        obj.data = temp;
        delete obj.result;
        return obj;
      }
      function convertErrors(obj) {
        obj.status = 'error';
        obj.message = obj.error;
        delete obj.error;
        delete obj.code;
        return obj;
      }

      if (method == 'list') {
        if (!data.error) {
          data = changeResultsName(data);
          data.status = 'success';

          if (data.data.length !== 0) {
            data.data.forEach(function (item) {
              item = cleanUpdateCreate(changeIdName(item));

              if (item.oldValue) {
                delete item.oldValue.__type;
                delete item.oldValue.className;
                item.oldValue = changeIdName(item.oldValue);
                item.oldValue = cleanUpdateCreate(item.oldValue);
              }
            });
          }
        } else {
          data = convertErrors(data);
        }
      }

      if (method == 'get') {
        if (!data.error) {
          data = cleanUpdateCreate(changeIdName(data));
          data = {data: data, status: 'success'};

          if (data.data.oldValue) {
            delete data.data.oldValue.__type;
            delete data.data.oldValue.className;
            data.data.oldValue = changeIdName(data.data.oldValue);
            data.data.oldValue = cleanUpdateCreate(data.data.oldValue);
          }
        } else {
          data = convertErrors(data);
        }
      }

      if (method == 'post') {
        if (!data.error) {
          if (funcName && funcName == 'whatif') {
            data = changeResultName(data);
            data.data.restaurants = data.data.restaurants.map(function (item) {
              return changeIdName(item);
            });
            data.status = 'success';
          } else if (funcName && funcName == 'getRestByDaId') {
            data = changeResultName(data);
            data.data = cleanUpdateCreate(changeIdName(data.data));
            data.status = 'success';
          // if it's not function
          } else {
            // task object
            if (data.changes) {
              var id = data.objectId;
              var res = {};
              angular.copy(data, res);
              res = cleanUpdateCreate(res);
              data = { status: 'success'};
              data.data = res;
              delete data.data.objectId;
              data.data.id = id;
              data.id = id;
            // other objects
            } else {
              id = data.objectId;
              data = { status: 'success'};
              data.id = id;
            }
          }
        } else {
          data = convertErrors(data);
        }
      }

      if (method == 'put') {
        if (!data.error) {
          data = { status: 'success'};
        } else {
          data = convertErrors(data);
        }
      }

      if (method == 'delete') {
        if (!data.error) {
          data = { status: 'success'};
        } else {
          data = convertErrors(data);
        }
      }
      return data;
    }

// PARSE REQUEST METHODS START ==============================================================================
    //GETTING DATA BY ID OF ELEMENT
    var _get = function (suburl, id, restrictions) {
      var fullUrl = convertUrl(suburl, id, null, null, restrictions);
      return $q(function (resolve, reject) {
        if (id) {
          $http({
            method: 'GET',
            url: fullUrl,
            headers: {
              'X-Parse-Application-Id': 'umNhBAQqVJS3wHtgC52ggA6zA87ic83bSvzUBkap',
              'X-Parse-REST-API-Key': '14jzZ1LRkMSqFFUjAiYObXURIckKlDQP47Ey8Ja4'
            }
          }).success(function (data) {
            if(parse) data = convertData(data, 'get');
            resolve(data);
          })
          .error(function (data, status, headers, config) {
            if(parse) data = convertData(data, 'get');
            reject(data);
          });
        }
      });
    };

    //GETTING LIST OF DATA FROM INJECTED SUBURL
    var _list =  function (suburl, param, restr) {
        var fullUrl = convertUrl(suburl, '', param, false, restr); param = {};
        return $q(function(resolve, reject) {
        $http({
          method:'GET',
          url: fullUrl,
          params: param,
          headers: {
            'X-Parse-Application-Id': 'umNhBAQqVJS3wHtgC52ggA6zA87ic83bSvzUBkap',
            'X-Parse-REST-API-Key': '14jzZ1LRkMSqFFUjAiYObXURIckKlDQP47Ey8Ja4'
          }
        }).success(function (data) {
          var data = convertData(data, 'list');
          if (data.status === 'success') {
            resolve(data);
          } else if (data.status === 'error') {
            reject(data);
          }
        })
        .error(function (data, status, headers, config) {
          var data = convertData(data, 'list');
          if(reject){
            reject(data);
          }
        });
      });
    };

    //POSTING NEW DATA TO INJECTED SUBURL
    var _post = function(suburl,param, isFunction){
      var fullUrl = convertUrl(suburl, '', {}, isFunction);
      return $q(function (resolve, reject) {
        $http.post(
          fullUrl,
          param,
          {
            headers: {
              'Content-Type': 'application/json',
              'X-Parse-Application-Id': 'umNhBAQqVJS3wHtgC52ggA6zA87ic83bSvzUBkap',
              'X-Parse-REST-API-Key': '14jzZ1LRkMSqFFUjAiYObXURIckKlDQP47Ey8Ja4'
            }
          }
        ).success(function (data) {
          var data = convertData(data, 'post', isFunction);
          if (data.status === 'success') {
            resolve(data);
          } else if (data.status === 'error') {
            reject(data);
          }
        })
        .error(function (data, status, headers, config) {
          var data = convertData(data, 'post');
          if(reject){
            reject(data);
          } 
        });
      });
    };

    //UPDATING DATA BY IT'S ID
    var _put = function(suburl, id, param){
      var fullUrl = convertUrl(suburl, id);

      return $q(function (resolve, reject) {
        $http.put(
          fullUrl,
          param,
          {
            headers: {
              'Content-Type': 'application/json',
              'X-Parse-Application-Id': 'umNhBAQqVJS3wHtgC52ggA6zA87ic83bSvzUBkap',
              'X-Parse-REST-API-Key': '14jzZ1LRkMSqFFUjAiYObXURIckKlDQP47Ey8Ja4'
            }
          }
        ).success(function (data) {
          var data = convertData(data, 'put');
          if (data.status === 'success') {
            resolve(data);
          } else if (data.status === 'error') {
            reject(data);
          }
        })
        .error(function (data, status, headers, config) {
          var data = convertData(data, 'put');
          reject(data);
        });
      });
    };

    //DELETING DATA BY ID
    var _delete = function(suburl, id){
      var fullUrl = convertUrl(suburl, id);
      return $q(function (resolve, reject) {
        $http.delete(
          fullUrl,
          {
            headers: {
              'Content-Type': 'application/json',
              'X-Parse-Application-Id': 'umNhBAQqVJS3wHtgC52ggA6zA87ic83bSvzUBkap',
              'X-Parse-REST-API-Key': '14jzZ1LRkMSqFFUjAiYObXURIckKlDQP47Ey8Ja4'
            }
          }
        ).success(function (data) {
          var data = convertData(data, 'delete');
          if (data.status === 'success') {
            resolve(data);
          } else if (data.status === 'error') {
            reject(data);
          }
        })
        .error(function (data, status, headers, config) {
          reject(data);
        });
      });
    };
// PARSE REQUEST METHODS ENDS ==============================================================================
    /**
     * API functionality
     */
    return {
      receipe: {
        list: function() {
          return _list('recipesList');
        },
        get: function (id) {
          return _get('recipesList', id);
        },
        rocket: function () {
          return list('get_recipes');
        }
      }
    };
  });
