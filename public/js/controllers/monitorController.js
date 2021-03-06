angular.module('app').controller("MonitorController", function ($scope, FirebaseService, SoilDataService, TempHumService) {
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
        var latestMetric = vm.statistics[latest];

        // latest values
        vm.updatedAt = latestMetric.time;
        vm.latestTemperature = latestMetric.temperature;
        vm.latestHumidity = latestMetric.humidity;
        vm.latestSoilmoisture = latestMetric.soil;

        vm.graphHumidity = removeDot(vm.latestHumidity);
        vm.graphTemperature = removeDot(vm.latestTemperature);
        vm.graphMoisture = convertSoilMetricToPercentage(vm.latestSoilmoisture);

        // D3 charts
        vm.soilData = SoilDataService.getSoilData(vm.statistics);
        vm.soilOptions = SoilDataService.options;
        vm.tempHumData = TempHumService.getTempHumData(vm.statistics);
        vm.tempHumOptions = TempHumService.options;
    }

    function removeDot(value) {
        var stringValue = value.toString();
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
