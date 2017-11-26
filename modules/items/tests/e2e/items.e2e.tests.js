'use strict';

describe('Items E2E Tests:', function () {
	var user1 = {
    firstName: 'test',
    lastName: 'user',
    email: 'test.user@meanjs.com',
    username: 'testUser',
    password: 'P@$$w0rd!!',
    roles: 'TA'
  };

  var user2 = {
    firstName: 'test',
    lastName: 'user2',
    email: 'test.user2@meanjs.com',
    username: 'testUser2',
    password: 'P@$$w0rd!!',
    roles: 'TA'
  };
  var admin = {
    username: 'seedadmintest',
    password: 'P@$$w0rd!!'
  };
  var user3 = {
    firstName: 'test',
    lastName: 'user',
    email: 'test.user3@meanjs.com',
    username: 'testUser3',
    password: 'P@$$w0rd!!',
    roles: 'TA'
  };
  var user4 = {
    firstName: 'test',
    lastName: 'user4',
    email: 'test.user4@meanjs.com',
    username: 'testUser4',
    password: 'P@$$w0rd!!',
    roles: 'TA'
  };

  var signout = function () {
    // Make sure user is signed out first
    browser.get('http://localhost:3001/signout');
    // Delete all cookies
    browser.driver.manage().deleteAllCookies();
  };

  var signin = function() {
    signout();
    browser.get('http://localhost:3001/signin');
      // Enter UserName
      element(by.model('vm.credentials.usernameOrEmail')).sendKeys(admin.username);
      // Enter Password
      element(by.model('vm.credentials.password')).sendKeys(admin.password);
      // Click Submit button
      element(by.css('button[type="submit"]')).click();
  };
  describe('Test items page', function () {
  	signin();
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/items');
      expect(element.all(by.repeater('item in items')).count()).toEqual(0);
    });
    it('Should navigate to create page upon button click', function () {
     browser.get('http://localhost:3001/items');
     element(by.id('add-item-btn')).click();
     expect(browser.getCurrentUrl()).toEqual('http://localhost:3001/items/create');
    });
  });
});
