angular.module('app').service('SoilDataService', function(FirebaseService) {
    this.options = {
        chart: {
            type: 'lineChart',
            height: 450,
            width: 1000,
            margin : {
                top: 20,
                right: 20,
                bottom: 40,
                left: 55
            },
            x: function(d){
                return d.x;
            },
            y: function(d){
                return d.y;
            },
            useInteractiveGuideline: true,
            dispatch: {
                stateChange: function(e){ console.log("stateChange"); },
                changeState: function(e){ console.log("changeState"); },
                tooltipShow: function(e){ console.log("tooltipShow"); },
                tooltipHide: function(e){ console.log("tooltipHide"); }
            },
            xAxis: {
                axisLabel: 'Time',
                tickFormat: function(d) {
                    return d3.time.format('%H:%M')(new Date(d))
                }
            },
            yAxis: {
                axisLabel: 'Soil moisture %',
                tickFormat: function(d){
                    return d;
                },
                axisLabelDistance: 30
            },
            callback: function(chart){
                //console.log("!!! lineChart callback !!!");
            }
        },
        title: {
            enable: false,
            text: 'Soil moisture'
        },
        subtitle: {
            enable: false,
            text: '',
            css: {
                'text-align': 'center',
                'margin': '10px 13px 0px 7px'
            }
        },
        caption: {
            enable: false,
            html: '',
            css: {
                'text-align': 'justify',
                'margin': '10px 13px 0px 7px'
            }
        }
    };

    /* Takes collected sensor data and uses soil moisture and time to build json formatted data for a line chart */

    this.getSoilData = function() {
        var rawData = FirebaseService.getStatistics();
        return formatSoilData(rawData);
    };

    function formatSoilData(rawData) {
        var timesoil = [];

        rawData.$loaded().then(function () {
            for (var i = 0; i < rawData.length; i++) {
                timesoil.push({x: rawData[i].time, y: rawData[i].soil});
            }
        });

        //Line chart data should be sent as an array of series objects.
        return [
            {
                values: timesoil,      //values - represents the array of {x,y} data points
                key: 'Moisture', //key  - the name of the series.
                color: '#ff7f0e'  //color - optional: choose your own line color.
            }
        ];
    }
});