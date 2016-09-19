angular.module('appControllers').controller('epa-details-controller', ['$scope',function($scope){
  $scope.epa = $routeParams.epa
  $scope.test = "Hello Details"
}
