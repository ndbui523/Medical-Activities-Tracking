angular.module('appControllers').controller('adviserCtrl', ['$scope', '$routeParams', function($scope, $routeParams){
    $scope.adviser = $routeParams.adviser;
    $scope.threshold = 3;
    $scope.reverse = true;
    $scope.property = 'regressed';

    $scope.advisees = [
        {
          'firstName' : 'Lindsay',
          'lastName' : 'Krinkle',
          'email' : 'lkrinkle@fakeemail.com',
          'grade' : 3,
          'adviser' : 'Ana Felix',
          'improved' : 2,
          'regressed' : 1,
        } ,
        {
          'firstName' : 'Gary',
          'lastName' : 'Nicolson',
          'email' : 'gnicolson@fakeemail.com',
          'grade' : 1,
          'adviser' : 'Ana Felix',
          'improved' : 1,
          'regressed' : 4,
        } ,
        {
          'firstName' : 'Tod',
          'lastName' : 'Radcliff',
          'email' : 'tradcliff@fakeemail.com',
          'grade' : 1,
          'adviser' : 'Ana Felix',
          'improved' : 3,
          'regressed' : 2,
        } ,
        {
          'firstName' : 'Jonnie',
          'lastName' : 'Morris',
          'email' : 'jmorris@fakeemail.com',
          'grade' : 2,
          'adviser' : 'Ana Felix',
          'improved' : 3,
          'regressed' : 0,
        } ,
        {
          'firstName' : 'Austin',
          'lastName' : 'Fern',
          'email' : 'afern@fakeemail.com',
          'grade' : 2,
          'adviser' : 'Ana Felix',
          'improved' : 1,
          'regressed' : 1,
        } ,
        {
          'firstName' : 'Paulene',
          'lastName' : 'Myles',
          'email' : 'pmyles@fakeemail.com',
          'grade' : 2,
          'adviser' : 'Ana Felix',
          'improved' : 2,
          'regressed' : 1,
        } ,
        {
          'firstName' : 'Melissa',
          'lastName' : 'Vernon',
          'email' : 'mvernon@fakeemail.com',
          'grade' : 3,
          'adviser' : 'Ana Felix',
          'improved' : 3,
          'regressed' : 0,
        } ,
        {
          'firstName' : 'Rita',
          'lastName' : 'Jiggers',
          'email' : 'rjiggers@fakeemail.com',
          'grade' : 3,
          'adviser' : 'Ana Felix',
          'improved' : 0,
          'regressed' : 3,
        } ,
    ];

    $scope.gradyears = [1, 2, 3];
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
