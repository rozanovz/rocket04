import $ from 'jquery';

let running = ($location, $rootScope, loader) => {
    if(localStorage.getItem('items')){
      $location.path('/rocket04');
    }

    let pages = {
      "/": "Главная Страница",
      "/how": "Принцип Работы",
      "/about": "О Нас",
      "/gifts": "Подарки",
      "/gMap": "Зона Доставки",
      "/contract": "Приватность и Условия",
      "/contacts": "Контакты"
    }

    angular.extend($rootScope, {
      storeLoader: false,
      centerin: () => {
        var b = (((document.body.clientWidth - 120) / 2)/document.body.clientWidth)*100;
        var c = b + "%";
        $('.slicknav_brand').css('left', c);
        $('.navbar-header').css('left', c);

        var f = (((document.body.clientWidth - 105) / 2)/document.body.clientWidth)*100;
        var a = f + "%";
        $('.spinner').css ('left', a);
      }
    });

    $('#menuStick').slicknav({
      brand:"<a href=\"#/\"><img src=\"https://rocket04.imgix.net/logo.svg?s=533089706d3998f2811d218fd2fe2fa5\" alt=\"\"></a>",
      label:"  ",
      closeOnClick: true
    });
    
    $(window).resize(() => {
      $rootScope.centerin();
    });
    
    $rootScope.centerin();

    $rootScope.$watch( ()  => {
      return $location.url();
    },  () => {
      loader.gaTitleScroll(pages[$location.url()]);
    })
};


export { running };