angular.module('app').service('MyService', function($http, $q) {
  return {
    'getRooms': function(room) {
      var defer = $q.defer();
      $http.get('/rooms').success(function(resp){
      	var r = {};
      	angular.forEach(resp, function(value, key) {
      	    if (value.name == room) {
      	        r = value;
      	    }
      	});
        defer.resolve(r);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    },
    'getCurrentConnected': function(id) {
      var defer = $q.defer();
      $http.get('/connections/current/room/' + id).success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    }
  }})