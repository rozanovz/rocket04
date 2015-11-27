'use strict';

describe('Controller: GiftsCtrl', function () {

  // load the controller's module
  beforeEach(module('ocean04App'));

  var GiftsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GiftsCtrl = $controller('GiftsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(GiftsCtrl.awesomeThings.length).toBe(3);
  });
});
