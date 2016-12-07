angular.module('appControllers').controller('navbarCtrl', ['$scope','cookieService', '$location','$http', function($scope,cookieService, $location,$http){
  $scope.logout = logout;
  $scope.gotoHome = gotoHome;
  $scope.cookieID = cookieService.getCookie('user');

  function logout(){
    cookieService.deleteCookie('user');
    $location.url('/login');
  }

  function gotoHome(){
    $scope.cookieID = cookieService.getCookie('user');

    if(!$scope.cookieID){
      $location.url('/login');
    }
    else{
      $http({
        method: 'GET',
        url: '/users/'+$scope.cookieID,
      }).then(function successCallback(response) {

        if (response.data[0].permissions == 1){
          $location.url('/adviser/'+$scope.cookieID);
        }
        else{
          $location.url('/'+$scope.cookieID);
        }
      }, function errorCallback(response){
        console.log("Error getting user "+$scope.cookieID);
      });
    }
  }

  function gotoFAQ(){

  }

}]);
