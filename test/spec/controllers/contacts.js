'use strict';

describe('Controller: ContactsCtrl', function () {

  // load the controller's module
  beforeEach(module('ocean04App'));

  var ContactsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ContactsCtrl = $controller('ContactsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ContactsCtrl.awesomeThings.length).toBe(3);
  });
});
