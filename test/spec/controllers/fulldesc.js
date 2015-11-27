'use strict';

describe('Controller: FulldescCtrl', function () {

  // load the controller's module
  beforeEach(module('ocean04App'));

  var FulldescCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FulldescCtrl = $controller('FulldescCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(FulldescCtrl.awesomeThings.length).toBe(3);
  });
});
