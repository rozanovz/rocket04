let routing = ($routeProvider) => {
  $routeProvider
      .when('/', {
        templateUrl: '/views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: '/views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('', {
        templateUrl: '/views/gifts.html',
        controller: 'GiftsCtrl',
        controllerAs: 'gifts'
      })
      .when('/how', {
        templateUrl: '/views/how.html',
        controller: 'HowCtrl',
        controllerAs: 'how'
      })
      .when('/rocket04', {
        templateUrl: '/views/store.html',
        controller: 'storeCtrl',
        controllerAs: 'store'
      })
      .when('/cart', {
        templateUrl: '/views/cart.html',
        controller: 'cartCtrl',
        controllerAs: 'cart'
      })
      .when('/desc/:id', {
        templateUrl: '/views/fulldesc.html',
        controller: 'FulldescCtrl',
        controllerAs: 'f'
      })
      .when('/gMap', {
        templateUrl: '/views/gmap.html',
        controller: 'GmapCtrl',
        controllerAs: 'gMap'
      })
      .when('/contract', {
        templateUrl: '/views/contract.html',
        controller: 'ContractCtrl',
        controllerAs: 'contract'
      })
      .when('/contacts', {
        templateUrl: '/views/contacts.html',
        controller: 'ContactsCtrl',
        controllerAs: 'contacts'
      })
      .otherwise({
        redirectTo: '/'
      });
}

export { routing }