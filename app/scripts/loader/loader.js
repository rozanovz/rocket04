import $ from 'jquery';

let loader = ($rootScope,$window,$location) => {
  return {
    allowed: () => {
      $rootScope.storeLoader = false;
      $('.loader').css('display','none');
    },

    notAllowed: () => {
      $rootScope.storeLoader = true;
      $('.loader').css('display','block');
    },

    gaTitleScroll: (title) => {
      $rootScope.pagetitle = title;
      $(document).scrollTop(0);
      $window.ga('send', 'pageview', { page: $location.url() });
    }
  };
}

export { loader };