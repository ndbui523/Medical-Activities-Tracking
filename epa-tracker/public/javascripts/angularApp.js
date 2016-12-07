angular.module('appControllers',[]);
var myApp = angular.module('myApp', ['appControllers','ngRoute','ngCookies']);

//Routing
myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/login',{
    templateUrl: '/login/login.html',
  })
  .when('/unauthorized',{
    templateUrl : '/unauth/unauthorized.html',
  })
  .when('/:id', {
    templateUrl : '/dashboard/dashboard.html',
  })
  .when('/:id/details/:epa',{
    templateUrl : '/details/epa-details.html',
    caseInsensitiveMatch: true
  })
  .when('/adviser/:id',{
    templateUrl : '/adviser/adviser.html',
    caseInsensitiveMatch: true
  })
  /*.otherwise({
    redirectTo  : '/'
  });*/
}]);
