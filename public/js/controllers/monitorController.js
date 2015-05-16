angular.module('app').controller("MonitorController", function($scope, FirebaseService) {
    var vm = this; // vm == ViewModel
    vm.hello = "hello world!";
    vm.statistics = FirebaseService.getStatistics();
});
