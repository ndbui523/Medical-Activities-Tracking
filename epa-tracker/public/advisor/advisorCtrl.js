angular.module('appControllers').controller('advisorCtrl', ['$scope', '$routeParams', function($scope, $routeParams){
    $scope.advisor = $routeParams.advisor;
    $scope.advisees = {
      '720337498':'Lindsay Krinkle',
      '720399847':'Jordan Clark',
      '720337845':'Anna Brandenberg'
    }
}]);
