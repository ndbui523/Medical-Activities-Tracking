angular.module('appControllers').controller('dashboardCtrl', ['$scope',function($scope){
  $scope.graphData = {
    'Mastery1': [1,3,2,5],
    'Mastery2': [4,13,11,7,6],
    'Mastery3': [8,9,12],
    'Mastery4': [10]
  };
}]);
