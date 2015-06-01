angular.module('app').controller("MonitorController", function ($scope, FirebaseService, SoilDataService, TempHumService) {
    var vm = this; // vm == ViewModel
    vm.hello = "hello world!";
    vm.statistics = FirebaseService.getStatistics();

    vm.latestTemperature = function () {
        return vm.statistics[vm.statistics.length - 1].temperature;
    }

    vm.latestHumidity = function () {
        return vm.statistics[vm.statistics.length - 1].humidity;
    }

    vm.updatedAt = function () {
        return vm.statistics[vm.statistics.length - 1].time;
    }

    vm.latestSoilmoisture = function () {
        return vm.statistics[vm.statistics.length - 1].soil;
    }

    vm.soilData = SoilDataService.getSoilData();
    vm.soilOptions = SoilDataService.options;
    vm.tempHumData = TempHumService.getTempHumData();
    vm.tempHumOptions = TempHumService.options;


});
