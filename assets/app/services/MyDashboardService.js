angular.module('app').service('MyDashboardService', function($http, $q) {
  return {
    'getPercent': function() {
      var defer = $q.defer();
      $http.get('/rooms/availability').success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    }
  }})