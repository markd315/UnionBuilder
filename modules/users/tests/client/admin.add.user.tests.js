(function () {
	'use strict';

	describe('AddUserController', function() {
		var AuthenticationController,
      		scope,
      		$httpBackend,
      		$stateParams,
      		$state,
      		$location,
      		Notification;

		beforeEach(function () {
	    	jasmine.addMatchers({
	    		toEqualData: function (util, customEqualityTesters) {
	        		return {
	            		compare: function (actual, expected) {
	              			return {
	                			pass: angular.equals(actual, expected)
	              			};
	           			 }
	          		};
	        	}
	      	});
	 	});

	 	beforeEach(module(ApplicationConfiguration.applicationModuleName));



	});
});