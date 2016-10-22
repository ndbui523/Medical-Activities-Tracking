angular.module('appControllers').controller('epa-details-controller', ['$scope','$routeParams','$http',function($scope,$routeParams,$http){
  $scope.epa = $routeParams.epa
  $scope.test = "Hello Details"
  $http({
  method: 'GET',
  url: '/details/1'
  }).then(function successCallback(response) {
    $scope.epaDetails=response.data
  }, function errorCallback(response) {
    console.log("error")
  });
}]);
