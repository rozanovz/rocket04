'use strict';

describe('Controller: GmapCtrl', function () {

  // load the controller's module
  beforeEach(module('ocean04App'));

  var GmapCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GmapCtrl = $controller('GmapCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(GmapCtrl.awesomeThings.length).toBe(3);
  });
});
