(function () {
	'use strict';

	describe('AddUserController', function() {
		var AuthenticationController,
      		scope,
      		$httpBackend,
      		$stateParams,
      		$state,
      		$location,
      		mockUser1,
      		mockUser2,
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

	 	beforeEach(inject(function ($controller, $rootScope, _$state_, _$httpBackend_, _Authentication_, _ApplicantsService_) {
	 		$scope = $rootScope.$new();

	 		$httpBackend = _$httpBackend_;
	 		$state = _$state_;
      		Authentication = _Authentication_;
			ApplicantsService = _ApplicantsService_;

			// Spy on Notification
        	spyOn(Notification, 'error');
        	spyOn(Notification, 'success');

        	// Ignore parent template get on state transitions
        	$httpBackend.whenGET('/modules/users/client/views/admin/add-user.client.view.html').respond(200);


	        Authentication.user = {
		        roles: ['admin'],
		        approvedStatus: true
			};

			AddUserController = $controller ('AddUserController as vm', {
				$scope: $scope
			});

			// Spy on state go
			spyOn($state, 'go');
	 	}))
	});

	//describe('')


});