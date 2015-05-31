angular.module('app').controller("MonitorController", function ($scope, FirebaseService, SoilDataService) {
    var vm = this; // vm == ViewModel
    vm.statistics = FirebaseService.getStatistics();

    vm.statistics.$loaded().then(function () {
        var latest = vm.statistics.length - 1;

        vm.latestTemperature = vm.statistics[latest].temperature;
        vm.latestHumidity = vm.statistics[latest].humidity;
        vm.updatedAt = vm.statistics[latest].time;
        vm.latestSoilmoisture = vm.statistics[latest].soil;
    });

    vm.soilData = SoilDataService.getSoilData();
    vm.soilOptions = SoilDataService.options;


});
