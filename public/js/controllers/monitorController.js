angular.module('app').controller("MonitorController", function($scope, FirebaseService) {
    var vm = this; // vm == ViewModel
    vm.hello = "hello world!";
    vm.statistics = FirebaseService.getStatistics();

    vm.latestTemperature = function() {
        return vm.statistics[vm.statistics.length - 1].temperature;
    }

    vm.latestHumidity = function() {
        return vm.statistics[vm.statistics.length - 1].humidity;
    }

    vm.updatedAt = function() {
        return vm.statistics[vm.statistics.length - 1].time;
    }
});
