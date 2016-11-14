angular.module('appControllers').controller('dashboardCtrl', ['$scope','$routeParams','$http',function($scope,$routeParams,$http){
  $scope.epa = $routeParams.epa
  $scope.test = "Hello Details"
  $http({
    method: 'GET',
    url: '/users/1/summary'
  }).then(function successCallback(response) {
      $scope.currentEPAs = response.data;
      console.log($scope.currentEPAs)
      $scope.graphData = {
        '1' : [],
        '2' : [],
        '3' : [],
        '4' : []
      };
      $scope.currentEPAs.forEach(function(element){
        var temp = element.newval;
        $scope.graphData[temp].push(element.epaid);
      });
      //$scope.summaryDeltas=response.data.summaryDeltas;
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
                  y: $scope.graphData[1].length,
                  color: '#880E4F'
                  //drilldown: 'Pre Entrustable'
              }, {
                  name: 'Mastery Level 2',
                  y: $scope.graphData[2].length,
                  color: '#7E57C2'
                  //drilldown: 'Level 2'
              }, {
                  name: 'Mastery Level 3',
                  y: $scope.graphData[3].length,
                  color: '#607D8B'
                  //drilldown: 'Level 3'
              }, {
                  name: 'Entrustable',
                  y: $scope.graphData[4].length,
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

  $http({
    method: 'GET',
    url: '/users/1/deltas'
  }).then(function successCallback(response) {
    console.log(response.data)
    $scope.summaryDeltas = {
      'Regressed' : [],
      'Even' : [],
      'Improved' : []
    }
    $scope.currentEPAs.forEach(function(element){
      var avgTemp;
      if(response.data[element.epaid-1]['count(*)'] != 0){
        avgTemp = response.data[element.epaid-1]['SUM(newval)']/response.data[element.epaid-1]['count(*)'];
        if(element.newval - avgTemp == 0){
          $scope.summaryDeltas.Even.push(element.epaid);
        }
        else if(element.newval - avgTemp > 0){
          $scope.summaryDeltas.Improved.push(element.epaid);
        }
        else{
          $scope.summaryDeltas.Regressed.push(element.epaid);
        }
      }

    });
    console.log($scope.summaryDeltas);

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
