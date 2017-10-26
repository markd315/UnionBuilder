(function () {
  'use strict';

  angular
    .module('items.mods')
    .controller('ModsController', ModsController);

  ModsController.$inject = ['$scope', '$state', '$window', 'itemResolve', 'Authentication', 'Notification'];

  function ModsController($scope, $state, $window, item, Authentication, Notification) {
    var vm = this;

    vm.module = module;
    vm.authentication = Authentication;
    vm.form = {};
    vm.removeModule = removeModule;
    vm.addModule = addModule;

  	function addModule(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.moduleForm');
        return false;
      }

      // Create a new item, or update the current instance
      vm.module.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('items.mods'); // should we send the User to the list or the updated Module's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Module saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Module save error!' });
      }
    }

  	function removeModule() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.module.$remove(function () {
          $state.go('items.mods');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Module deleted successfully!' });
        });
      }
    }
  }
}());
