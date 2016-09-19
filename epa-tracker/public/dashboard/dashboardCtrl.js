angular.module('appControllers').controller('dashboardCtrl', ['$scope',function($scope){
  $scope.graphData = {
    //This will be replaced by a REST GET Call
    'Mastery1': [1,3,2,5],
    'Mastery2': [4,13,11,7,6],
    'Mastery3': [8,9,12],
    'Mastery4': [10]
  };
  $(function () {
    // Create the chart
    $('#chart').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Percentage of EPAs by Level of Entrustability'
        },
        subtitle: {
            text: 'Click the columns to view EPAs'
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: ''
            }

        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.1f}%'
                }
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:20px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/></span> <b>'
        },

        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: [{
                name: 'Pre Entrustable',
                y: ($scope.graphData.Mastery1.length/13)*100,
                //drilldown: 'Pre Entrustable'
            }, {
                name: 'Mastery Level 2',
                y: ($scope.graphData.Mastery2.length/13)*100,
                //drilldown: 'Level 2'
            }, {
                name: 'Mastery Level 3',
                y: ($scope.graphData.Mastery3.length/13)*100,
                //drilldown: 'Level 3'
            }, {
                name: 'Entrustable',
                y: ($scope.graphData.Mastery4.length/13)*100,
                //drilldown: 'Entrustable'
            }, {
            }]
        }],
        /*drilldown: {
            series: [{
                name: 'Pre Entrustable',
                id: 'Pre Entrustable',
                data: $scope.graphData.Mastery1
            }, {
                name: 'Mastery Level 2',
                id: 'Level 2',
                data: $scope.graphData.Mastery2
            }, {
                name: 'Mastery Level 3',
                id: 'Level 3',
                data: $scope.graphData.Mastery3
            }, {
                name: 'Entrustable',
                id: 'Entrustable',
                data: $scope.graphData.Mastery4
            }]
        }*/
    });
    // Apply the theme
    highcharts.setOptions(Highcharts.theme);
});

}]);
