'use strict';

describe('Controller: HowCtrl', function () {

  // load the controller's module
  beforeEach(module('ocean04App'));

  var HowCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HowCtrl = $controller('HowCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(HowCtrl.awesomeThings.length).toBe(3);
  });
});
