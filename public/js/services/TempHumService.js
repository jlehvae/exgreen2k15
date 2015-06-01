angular.module('app').service('TempHumService', function(FirebaseService) {
    this.options = {
        chart: {
            type: "multiChart",
            height: 450,
            width: 1000,
            margin : {
                top: 20,
                right: 20,
                bottom: 40,
                left: 55
            },
            color: [
              "#1f77b4",
              "#ff7f0e"
            ],
            transitionDuration  : 500,
            xAxis: {
                tickFormat: function(d){
                    return d3.format(',f')(d);
                }
            },
            yAxis1: {
                tickFormat: function(d){
                    return d3.format(',.1f')(d);
                }
            },
            yAxis2: {
                tickFormat: function(d){
                    return d3.format(',.1f')(d);
                }
            }
        }
    };

    this.getTempHumData = function(rawData) {
        return formatTempHumData(rawData);
    };

    /* Takes collected sensor data and uses humidity, temperature and time to build json formatted data for a multichart */

    function formatTempHumData(rawData) {
        var formattedData = [];
        formattedData.push(formatTempData(rawData));
        formattedData.push(formatHumData(rawData));

        return formattedData;

    }

    //Formats time and temperature
    function formatTempData(rawData) {
        var timetemp = [];

        rawData.$loaded().then(function () {
            for (var i = 0; i < rawData.length; i++) {
                timetemp.push({x: rawData[i].time, y: rawData[i].temperature});
            }
        });

        //Line chart data should be sent as an array of series objects.
        return {
                key: 'Temperature', //key  - the name of the series.
                values: timetemp,      //values - represents the array of {x,y} data points
                type: 'line',  //color - optional: choose your own line color.
                yAxis: 1
            }
    }

    //Formats humidity and temperature
    function formatHumData(rawData) {
            var timehum = [];

            rawData.$loaded().then(function () {
                for (var i = 0; i < rawData.length; i++) {
                    timehum.push({x: rawData[i].time, y: rawData[i].humidity});
                }
            });

            //bar chart data should be sent as an array of series objects.
            return {
                    key: 'Humidity', //key  - the name of the series.
                    values: timehum,      //values - represents the array of {x,y} data points
                    type: 'bar',  //color - optional: choose your own line color.
                    yAxis: 2
                }
        }

});