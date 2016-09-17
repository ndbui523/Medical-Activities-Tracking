angular.module('appControllers').controller('summaryCtrl', ['$scope']){
  $scope.summaryDeltas = {
    'up': [8,9],
    'even': [1,2,3,4,5,6,7,10,12,13],
    'down': [11]
  };
}
