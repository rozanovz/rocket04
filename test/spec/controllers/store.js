'use strict';

describe('Controller: StoreCtrl', function () {

  // load the controller's module
  beforeEach(module('ocean04App'));

  var StoreCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StoreCtrl = $controller('StoreCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(StoreCtrl.awesomeThings.length).toBe(3);
  });
});
