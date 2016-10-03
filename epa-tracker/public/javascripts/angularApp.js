angular.module('appControllers',[]);
var myApp = angular.module('myApp', ['appControllers','ngRoute']);

//Routing
myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl : '/dashboard/dashboard.html',
  })
  .when('/Details/:epa',{
    templateUrl : '/details/epa-details.html'
  })
  .when('/Adviser/:adviser',{
    templateUrl : '/adviser/adviser.html'
  })
  /*.otherwise({
    redirectTo  : '/'
  });*/
}]);
