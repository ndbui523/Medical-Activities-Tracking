angular.module('appControllers').controller('dashboardCtrl', ['$scope','$routeParams','$http',function($scope,$routeParams,$http){
  $scope.epa = $routeParams.epa
  $scope.test = "Hello Details"
  $http({
    method: 'GET',
    url: '/users/1'
    }).then(function successCallback(response) {
      $scope.graphData=response.data.graphData;
      $scope.summaryDeltas=response.data.summaryDeltas;
      $('#chart').highcharts({
          chart: {
              type: 'column',
              backgroundColor:'transparent'
          },
          title: {
              text: 'EPAs by Level of Entrustability',
              style: {
                fontSize: '24px'
              }
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
                      format: '{point.y}'
                  }
              }
          },

          tooltip: {
            enabled: false
              //headerFormat: '<span style="font-size:20px">{series.name}</span><br>',
              //pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> EPAs<br/></span> <b>'
          },

          series: [{
              name: 'EPAs in this level',
              colorByPoint: true,
              data: [{
                  name: 'Pre Entrustable',
                  y: $scope.graphData.PreEntrustable.length,
                  color: '#880E4F'
                  //drilldown: 'Pre Entrustable'
              }, {
                  name: 'Mastery Level 2',
                  y: $scope.graphData.Mastery2.length,
                  color: '#7E57C2'
                  //drilldown: 'Level 2'
              }, {
                  name: 'Mastery Level 3',
                  y: $scope.graphData.Mastery3.length,
                  color: '#607D8B'
                  //drilldown: 'Level 3'
              }, {
                  name: 'Entrustable',
                  y: $scope.graphData.Entrustable.length,
                  color: '#1565C0'
                  //drilldown: 'Entrustable'
              }]
          }],
          credits: {
            enabled: false
          }
      });
      // Apply the theme
      Highcharts.setOptions(Highcharts.theme);
    }, function errorCallback(response) {
      console.log("error")
  });
  /*$scope.graphData = {
    //This will be replaced by a REST GET Call
  };
  $scope.summaryDeltas = {

  };*/

  //Modal Text
  $scope.helpText = "This is placeholder text"
  $scope.displayHelp = function(event){
    if(event.target.id == "chartHelp"){
      $scope.helpText = "chart";
    }
    if(event.target.id == "regHelp"){
      $scope.helpText = "Regressed";
    }
    if(event.target.id == "listHelp"){
      $scope.helpText = "list";
    }
  }
}]);
