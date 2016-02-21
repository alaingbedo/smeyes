/**
 * Created by kevin gosse on 22/02/2016.
 */

'use strict';

angular.module('admin').controller('connectionCtrl', ['$scope', '$log', function ($scope, $window, $log) {

    $scope.login = function(e){
        window.href = 'https://smeyes.herokuapp.com';
    };
}]);
