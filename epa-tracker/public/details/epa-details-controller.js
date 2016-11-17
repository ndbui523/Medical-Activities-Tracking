angular.module('appControllers').controller('epa-details-controller', ['$scope','$routeParams','$http',function($scope,$routeParams,$http){
  $scope.epa = $routeParams.epa
  $scope.deltaText = "";
  $scope.deltaArrow = "even"
  $http({
  method: 'GET',
  url: '/details/' + $scope.epa
  }).then(function successCallback(response) {
    $scope.epaDetails=response.data
  }, function errorCallback(response) {
    console.log("Error reading in EPA details : /details/"+$scope.epa)
  });

  $http({
    method: 'GET',
    url: '/users/'+$routeParams.id+'/summary'
  }).then(function successCallback(response) {
      $scope.currentEPAs = response.data;
      console.log($scope.currentEPAs)
  }, function errorCallback(response) {
      console.log("error")
  });

  $http({
    method: 'GET',
    url: '/users/'+$routeParams.id+'/deltas'
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

    if($.inArray(Number($scope.epa),$scope.summaryDeltas.Improved) != -1) {
      $scope.deltaText = 'Your level in this EPA has risen since the last examination.'
      $scope.deltaArrow = 'up'
    }
    else if($.inArray(Number($scope.epa),$scope.summaryDeltas.Even) != -1) {
      $scope.deltaText = 'Your level in this EPA has stayed the same since the last examination.';
      $scope.deltaArrow = 'even'
    }
    else {
      $scope.deltaText = 'Your level in this EPA has fallen since the last examination.';
      $scope.deltaArrow = 'down'
    }

  }, function errorCallback(response) {
    console.log("error")
  });

    $scope.testInfo = [
      {
        'name' : 'Piedmont Health Services Rotation',
        'date' : 'May 05 2016',
        'score' : 95,
        'delta' : 'up',
        'newVal' : 3
      },

      {
        'name' : 'Piedmont Health Services Rotation',
        'date' : 'April 25 2016',
        'score' : 79,
        'delta' : 'even',
        'newVal' : 2
      },

      {
        'name' : 'Piedmont Health Services Rotation',
        'date' : 'Jan 09 2016',
        'score' : 65,
        'delta' : 'down',
        'newVal' : 2
      },

      {
        'name' : 'Piedmont Health Services Rotation',
        'date' : 'Sept 14 2015',
        'score' : 90,
        'delta' : 'up',
        'newVal' : 3
      }
    ];

    var testDates = []
    var testScores = []
    $.each($scope.testInfo, function(){
      testDates.push(this.date);
      testScores.push(this.newVal);
    });

    $('#line-chart').highcharts({
        chart: {
          backgroundColor:'transparent'
        },
        title: {
            text: 'Recent Exam Trends',
            style: {
              fontSize: '24px'
            }

        },
        xAxis: {
            categories: testDates.reverse()
        },
        yAxis: {
            title: {
                text: 'Mastery Level',
                style: {
                  fontSize: '18px'
                }
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }],
            min: 1,
            max: 4,
            tickInterval: 1
        },
        credits: {
          enabled: false
        },
        series: [{
            //name: 'Tokyo',
            showInLegend: false,
            data: testScores.reverse()
        }]
    });

    $scope.helpText = "This is placeholder text"
    $scope.displayHelp = function(event){
      if(event.target.id == "headerHelp"){
        $scope.helpText = "This is the EPA details page for EPA" + $scope.epa + "." +
          "\r\nThis section shows a general overview of student progress on an EPA.";
      }
      if(event.target.id == "examHelp"){
        $scope.helpText = "This section contains a list and line graph of the 10 most recent grades that have affected the EPA evaluation for a student." +
          "\r\nThe list items include the exam/rotation name and date, the evaluation and effect on EPA mastery level by that item, and a link to all comments for that item.";
      }
      if(event.target.id == "checklistHelp"){
        $scope.helpText = "This section details the checklist of activities that an entrustable student is expected to be able to perform under EPA" + $scope.epa + ".";
      }
    }
}]);
