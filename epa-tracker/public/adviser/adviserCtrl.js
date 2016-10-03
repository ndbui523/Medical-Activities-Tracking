angular.module('appControllers').controller('adviserCtrl', ['$scope', '$routeParams', function($scope, $routeParams){
    $scope.adviser = $routeParams.adviser;
    $scope.advisees = {
      '720337498':'Lindsay Krinkle',
      '720399847':'Jordan Clark',
      '720337845':'Anna Brandenberg'
    }
}]);
