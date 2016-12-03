angular.module('appControllers').controller('dashboardCtrl', ['$scope','$routeParams','$http',function($scope,$routeParams,$http){
  $scope.id = $routeParams.id;
  $scope.summaryDeltas = {
    'Regressed' : [],
    'Even' : [],
    'Improved' : []
  }
  $http({
    method: 'GET',
    url: '/users/'+$routeParams.id,
  }).then(function successCallback(response) {
    $scope.name = response.data[0].fname + " " + response.data[0].lname
  }, function errorCallback(response) {
    console.log("error loading user "+$routeParams.id)
  });

  $http({
    method: 'GET',
    url: '/users/'+$routeParams.id+'/summary'
  }).then(function successCallback(response) {
      $scope.currentEPAs = response.data;
      $scope.graphData = {
        '1' : [],
        '2' : [],
        '3' : [],
        '4' : []
      };

      $scope.currentEPAs.forEach(function(element){
        var temp = element.newval;
        $scope.graphData[temp].push(element.epaid);

        $http({
          method: 'GET',
          url: '/tests/'+$routeParams.id+'/'+element.epaid
        }).then(function successCallback(response) {
          if(response.data.length != 0){
            var total = 0;
            response.data.forEach(function(element){
              total+=element.newval;
            });

            var avgTemp = total/response.data.length;

            if(element.newval - avgTemp < -0.4){
              $scope.summaryDeltas.Regressed.push(element.epaid);
            }
            else if(element.newval - avgTemp > 0.4){
              $scope.summaryDeltas.Improved.push(element.epaid);
            }
            else{
              $scope.summaryDeltas.Even.push(element.epaid);
            }
          }
        }, function errorCallback(response) {
          console.log("error")
        });

      });

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
                  color: '#7E57C2'
                  //drilldown: 'Pre Entrustable'
              }, {
                  name: 'Able to do With Supervision',
                  y: $scope.graphData[2].length,
                  color: '#7E57C2'
                  //drilldown: 'Level 2'
              }, {
                  name: 'Able to do Without Supervision',
                  y: $scope.graphData[3].length,
                  color: '#7E57C2'
                  //drilldown: 'Level 3'
              }, {
                  name: 'Entrustable',
                  y: $scope.graphData[4].length,
                  color: '#7E57C2'
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


  //Modal Text
  $scope.helpText = "This is placeholder text"
  $scope.displayHelp = function(event){
    if(event.target.id == "chartHelp"){
      $scope.helpText = "Each bar indicates the number of EPAs that fall under a certain level of mastery. " +
      "\r\nExpected mastery levels for students are based on experience; a fourth year student is expected to have mostly level 3 and 4s, "+
      "while a first year student will expect to be at mostly level 1.";
    }
    if(event.target.id == "regHelp"){
      $scope.helpText = "The number of improved and regressed EPAs is displayed. This is calculated by comparing the results of the most recent evaluation " +
      "for each EPA against the recent average performance for that EPA.";
    }
    if(event.target.id == "listHelp"){
      $scope.helpText = "Each EPA is listed under the appropriate mastery level, with indication of improvement or regression. "+
      "Clicking on a specific EPA takes you to that EPA's details page, where you can examine recent evaluations.";
    }
  }
}]);
