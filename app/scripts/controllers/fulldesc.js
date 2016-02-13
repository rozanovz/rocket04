'use strict';

/**
 * @ngdoc function
 * @name ocean04App.controller:FulldescCtrl
 * @description
 * # FulldescCtrl
 * Controller of the ocean04App
 */
angular.module('ocean04App')
  .controller('FulldescCtrl', function ($scope, $rootScope, $routeParams, api, loader, ngCart) {
    $rootScope.itemDescription = true;
    $('.slicknav_menu').each(function () {
        this.style.setProperty( 'display', 'none', 'important' );
    });
    $scope.receipe;
    this.getRecepieById = function (id) {
      var items = JSON.parse(localStorage.getItem('items')).filter(function (obj) {
        if(obj.id == id){
          return true;
        }
      });
      var data = items[0];
      var oldPrice = data.price.toString().split(".");
      var oldNutrients = data.nutrients.split("|");
      var subtitle = data.subtitle.split("|");
      data.ingredients = data.ingredients.split("|");
      data.portions = subtitle[0];
      data.time = subtitle[1];
      data.newPrice = {
        grand:oldPrice[0],
        cents:oldPrice[1]
      }
      data.slides=[];
      data.slides.push(data.photo);
      data.slides.push(data.ingredients_photo);
      data.newNutrients= {
        callories: oldNutrients[0],
        proteins: oldNutrients[1],
        fats: oldNutrients[2],
        carbohydrates: oldNutrients[3]
      };
      $scope.receipe = data;
      loader.gaTitleScroll($scope.receipe.title);
    }

    $scope.diet = [
      {
        img:'',
        name:'',
      },
      {
        img:'http://rocket04.imgix.net/diet_1.svg?s=4c4e6a0cab130c322c6aca083b5a3076',
        name:'Вегетарианское',
      },
      {
        img:'http://rocket04.imgix.net/diet_2.svg?s=086e988e8553d4028ed8e29377359fe6',
        name:'Веганское',
      },
      {
        img:'http://rocket04.imgix.net/diet_3.svg?s=85af099e62e0349cc057f83300d7482a',
        name:'Без Глютена',
      },
      {
        img:'http://rocket04.imgix.net/diet_4.svg?s=27c75e9d2a090988e06b640a6c457b72',
        name:'Без Лактозы',
      },
      {
        img:'http://rocket04.imgix.net/diet_5.svg?s=501744a476ede9d815c68ea228821fbc',
        name:'Без Орехов',
      },
      {
        img:'http://rocket04.imgix.net/diet_6.svg?s=58e666fdb84a3510d6005701d2a6b4a9',
        name:'Без Яиц',
      },
      {
        img:'http://rocket04.imgix.net/diet_7.svg?s=d111f8f6c71db9d42505f9c2199b3920',
        name:'Палеодиета',
      }
    ]

    //getting quantity in cart by its id 
    this.getInCartQuantity = function (id) {
      return ngCart.getItemById(id)._quantity;
    };

    //removing or decrementing item quantity in cart
    this.removeFromCart = function (id) {
      // var inCart = ngCart.getItemById(id);
      // if(inCart._quantity === 1){
      //   ngCart.removeItemById(id);
      // }else if(inCart._quantity > 1){
      //   inCart.setQuantity(-1, true)
      // }else{
      //   return;
      // }
      ngCart.getItemById(id)._quantity === 1 ? 
        ngCart.removeItemById(id) : 
          ngCart.getItemById(id).setQuantity(-1, true);
      this.getInCartQuantity(id);
    };

    //adding or incrementing item quantity in cart
    this.AddToCart = function (id, name, price, q, data) {
      if(ngCart.getItemById(id)._quantity >= 1) q = ngCart.getItemById(id)._quantity + 1;
      ngCart.addItem(id, name, price, q, data);
      this.getInCartQuantity(id);
    };

    this.getRecepieById($routeParams.id);
  });
