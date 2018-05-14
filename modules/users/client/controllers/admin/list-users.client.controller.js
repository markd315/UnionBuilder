(function () {
  'use strict';

  angular
    .module('users.admin')
    .controller('UserListController', UserListController);

  UserListController.$inject = ['$scope', '$filter', 'AdminService', 'ApplicantsService'];

  function UserListController($scope, $filter, AdminService, ApplicantsService) {
    var vm = this;
    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;
    vm.modifyRoles = modifyRoles;
    vm.countApplicants = countApplicants;

    AdminService.query(function (data) {
      vm.users = data;
      vm.buildPager();
    });

    //Querying applicants for showing the number of pending users in the system.
    ApplicantsService.query(function (data) {
      vm.applicants = data;
    });

    //Building a pager would help eliminate the long list (and scrolling) of the users.
    function buildPager() {
      vm.pagedItems = [];
      vm.itemsPerPage = 15;
      vm.currentPage = 1;
      vm.figureOutItemsToDisplay();
    }

    //A helper function for the buildPager method and the pageChanged method.
    function figureOutItemsToDisplay() {
      vm.filteredItems = $filter('filter')(vm.users, {
        $: vm.search
      });
      vm.filterLength = vm.filteredItems.length;
      var begin = ((vm.currentPage - 1) * vm.itemsPerPage);
      var end = begin + vm.itemsPerPage;
      vm.pagedItems = vm.filteredItems.slice(begin, end);
    }

    //Displaying the users' roles to the admin in a more friendly way.
    function modifyRoles(user) {
      if (user.roles.indexOf('admin') != -1)
          return 'Admin';
      if (user.roles.indexOf('superta') != -1 )
        return 'Super TA';
      if (user.roles.indexOf('technician') != -1 )
        return 'Technician';
      if (user.roles.indexOf('ta') != -1 )
        return 'TA';
      return 'User';
    }

    function pageChanged() {
      vm.figureOutItemsToDisplay();
    }

    //Returning the number of applicants, so it could be displayed in the View Pending Applicants button.
    function countApplicants() {
      if(!vm.applicants) {
        return 0; //Field does not exist
      }
      return vm.applicants.length;
    }

  }
}());
