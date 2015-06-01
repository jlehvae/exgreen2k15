angular.module('app').controller("MonitorController", function ($scope, FirebaseService, SoilDataService) {
    var vm = this; // vm == ViewModel
    vm.statistics = FirebaseService.getStatistics();

    vm.statistics.$loaded().then(function () {
        updateScope();
        vm.statistics.$watch(function() {
            updateScope();
        });
    });

    function updateScope() {
        var latest = vm.statistics.length - 1;

        vm.updatedAt = vm.statistics[latest].time;

        vm.latestTemperature = vm.statistics[latest].temperature;
        vm.latestHumidity = vm.statistics[latest].humidity;
        vm.latestSoilmoisture = vm.statistics[latest].soil;

        vm.graphHumidity = removeDot(vm.latestHumidity.toString());
        vm.graphTemperature = removeDot(vm.latestTemperature.toString());
        vm.graphMoisture = convertSoilMetricToPercentage(vm.latestSoilmoisture);

        vm.soilData = SoilDataService.getSoilData();
        vm.soilOptions = SoilDataService.options;
    }

    function removeDot(stringValue) {
        if(stringValue.indexOf('.') > -1) {
            return stringValue.substring(0, stringValue.toString().indexOf('.'));
        } else {
            return stringValue;
        }
    }

    function convertSoilMetricToPercentage(number) {
        var percentage = (number / 700) * 100;
        return removeDot(percentage.toString());
    }
});
