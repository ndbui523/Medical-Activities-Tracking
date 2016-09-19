angular.module('appControllers').controller('epa-details-controller', ['$scope','$routeParams',function($scope,$routeParams){
  $scope.epa = $routeParams.epa
  $scope.test = "Hello Details"
}]);
