angular.module('appControllers').controller('summaryCtrl', ['$scope',function($scope){
  $scope.summaryDeltas = {
    'Improved': [8,9],
    'Even': [1,2,3,4,5,6,7,10,12,13],
    'Regressed': [11]
  };
}]);
