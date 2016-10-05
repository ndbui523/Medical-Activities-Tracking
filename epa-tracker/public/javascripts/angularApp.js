angular.module('appControllers',[]);
var myApp = angular.module('myApp', ['appControllers','ngRoute']);

//Routing
myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl : '/dashboard/dashboard.html',
  })
  .when('/details/:epa',{
    templateUrl : '/details/epa-details.html',
    caseInsensitiveMatch: true
  })
  .when('/adviser/:adviser',{
    templateUrl : '/adviser/adviser.html',
    caseInsensitiveMatch: true
  })
  /*.otherwise({
    redirectTo  : '/'
  });*/
}]);
