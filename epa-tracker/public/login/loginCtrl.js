angular.module('appControllers').controller('loginCtrl', ['$scope','$http','cookieService','$location',function($scope,$http,cookieService,$location){
  $scope.checkLogin = checkLogin;

  function checkLogin(){
    var formLogin = $('#loginid').val();
    cookieService.makeCookie('user',formLogin);
    //console.log("2");

    $http({
      method: 'GET',
      url: '/users/'+formLogin,
    }).then(function successCallback(response) {

      if (response.data[0].permissions == 1){
        $location.url('/adviser/'+formLogin);
      }
      else{
        $location.url('/'+formLogin);
      }

    }, function errorCallback(response){
      console.log("Error getting user "+formLogin)
    });

  }
  //console.log(cookieService.getCookie('student'));
}]);
