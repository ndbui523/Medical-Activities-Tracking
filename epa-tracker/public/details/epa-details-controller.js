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
    url: '/users/1'
    }).then(function successCallback(response) {
      $scope.summaryDeltas=response.data.summaryDeltas;
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
      console.log("Error in /users/1")
    });

    $scope.testInfo = [
      {
        'name' : 'Piedmont Health Services Rotation',
        'date' : 'May 05 2016',
        'score' : 95,
        'delta' : 'up'
      },

      {
        'name' : 'Piedmont Health Services Rotation',
        'date' : 'April 25 2016',
        'score' : 79,
        'delta' : 'even'
      },

      {
        'name' : 'Piedmont Health Services Rotation',
        'date' : 'Jan 09 2016',
        'score' : 65,
        'delta' : 'down'
      },

      {
        'name' : 'Piedmont Health Services Rotation',
        'date' : 'Sept 14 2015',
        'score' : 90,
        'delta' : 'up'
      }
    ];
}]);
