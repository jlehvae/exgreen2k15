angular.module('app').controller("MonitorController", function ($scope, FirebaseService, SoilDataService) {
    var vm = this; // vm == ViewModel
    vm.statistics = FirebaseService.getStatistics();

    vm.statistics.$loaded().then(function () {
        vm.latestTemperature = vm.statistics[vm.statistics.length - 1].temperature;
        vm.latestHumidity = vm.statistics[vm.statistics.length - 1].humidity;
        vm.updatedAt = vm.statistics[vm.statistics.length - 1].time;
        vm.latestSoilmoisture = vm.statistics[vm.statistics.length - 1].soil;
    });

    vm.soilData = SoilDataService.getSoilData();
    vm.soilOptions = SoilDataService.options;


});
