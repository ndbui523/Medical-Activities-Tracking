angular.module('appControllers').controller('adviserCtrl', ['$scope', '$routeParams','$http','$location', function($scope, $routeParams, $http, $location){
    $scope.threshold = 3;
    $scope.reverse = true;
    $scope.property = 'regressed';
    $scope.gradyears = [];

    $http({
      method: 'GET',
      url: '/users/'+$routeParams.id,
    }).then(function successCallback(response) {
      $scope.adviser = response.data[0].fname + ' ' + response.data[0].lname;
      if (response.data[0].permissions == 1){
        $http({
          method: 'GET',
          url: '/adviser/'+$routeParams.id+'/advisees'
        }).then(function successCallback(response) {
          $scope.advisees = response.data;
          $scope.advisees.forEach(function(element){

            if($.inArray(element.year,$scope.gradyears) == -1) {
              $scope.gradyears.push(element.year);
            }

            $http({
              method: 'GET',
              url: '/users/'+element.uid+'/summary'
            }).then(function successCallback(response) {
                $scope.currentEPAs = response.data;
            }, function errorCallback(response) {
                console.log("error")
            });

            $http({
              method: 'GET',
              url: '/users/'+element.uid+'/deltas'
            }).then(function successCallback(response) {
              element['improved'] = 0;
              element['regressed'] = 0;

              $scope.currentEPAs.forEach(function(element2){
                var avgTemp;
                if(response.data[element2.epaid-1]['count(*)'] != 0){
                  avgTemp = response.data[element2.epaid-1]['SUM(newval)']/response.data[element2.epaid-1]['count(*)'];
                  if(element2.newval - avgTemp > 0){
                    element['improved']++;
                  }
                  else if(element2.newval - avgTemp < 0){
                    element['regressed']++;
                  }
                }
              });
            }, function errorCallback(response) {
                console.log("error")
            });
          });

          $scope.gradyears.sort();
        }, function errorCallback(response) {
          console.log("error")
        });
      }
      else{
        alert("PERMISSION DENIED");
        console.log($routeParams.id)
        var view = '/'+$routeParams.id;
        $location.url(view);
      }
    }, function errorCallback(response) {
      console.log("error getting adviser")
    });

    $scope.curfilter = undefined;

    $scope.changeFilter = function(vari){
      if(vari == 0){
        $scope.curfilter = undefined;
      }
      else{
        $scope.curfilter = vari;
      }
    }

    $scope.sortBy = function(propertyName){
      if ($scope.property == propertyName){
        $scope.reverse = !$scope.reverse;
      }
      else{
        $scope.reverse = true;
      }
      $scope.property = propertyName;
    };

    $scope.displayHelp = function(event){
      if(event.target.id == "adviserHelp"){
        $scope.helpText = "This section allows advisers to see a list of their students." +
        "\r\nClick on a field to sort by that field. Students with high numbers of improved or regressed EPAs will appear highlighted.";
      }
    }

}]);
