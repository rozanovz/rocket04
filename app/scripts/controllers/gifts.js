"use strict";

/**
 * @ngdoc function
 * @name ocean04App.controller:GiftsCtrl
 * @description
 * # GiftsCtrl
 * Controller of the ocean04App
 */
angular.module("ocean04App")
  .controller("GiftsCtrl", function ($rootScope, $scope) {
  	$(document).scrollTop(0);

  	var giftCards = $(".giftCard");

  	$scope.selectedGift;

  	$scope.selectGift = function(id){
  		$scope.selectedGift = id;
  	}

  	$scope.gifts = [
  		{
  			img:"https://rocket04.imgix.net/gifts_1.jpg?s=fa9dea2977649ce50e30185840863067",
  			price:50,
  			text:"Быстро. Вкусно. Надёжно. <br> Идеальный вариант, если других вариантов нет.",
  			id:1,
  			popular:""
  		},{
  			img:"https://rocket04.imgix.net/gifts_2.jpg?s=77307f3ac2cd865f502625a63ad84970",
  			id:2,
  			price:100,
  			text:"Целая неделя вкусных обедов и ужинов на двоих.",
  			popular:""
  		},{
  			img:"https://rocket04.imgix.net/gifts_3.jpg?s=67d0cef4aafa8c934c57a971ee6f4e22",
  			id:3,
  			price:250,
  			text:"Идеальные выходные без головной боли на двоих.",
  			popular:"Популярное"
  		},{
  			img:"https://rocket04.imgix.net/gifts_4.jpg?s=bf19b02e7d7a5a76de7773444db6656f",
  			id:4,
  			price:500,
  			text:"Целая неделя вкусных обедов и ужинов на двоих.",
  			popular:""
  		}
  	];

  });
