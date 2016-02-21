'use strict';

app
    .controller('PasteurCtrl', [
        '$rootScope', '$scope', '$modal', '$http', 'MyService', function($rootScope, $scope, $modal, $http, MyService) {

            $scope.currentRoom = {};
            $scope.currentConnected = [];


            MyService.getRooms("pasteur").then(function(resp) {
              $scope.currentRoom = resp;
              MyService.getCurrentConnected($scope.currentRoom.id).then(function(resp) {
                $scope.currentConnected = resp;
              });
            }, function(err) {
              console.log(err);
            });


            


            $scope.openModal = function (index) {
              var modalInstance = $modal.open({
                animation: false,
                templateUrl: 'myModal.html',
                controller: 'ModalInstanceCtrl',
                resolve: {
                  currentUser: function () {
                    return $scope.currentConnected[index];
                  }
                }
            })
        }
    }]);



app.controller('ModalInstanceCtrl', function ($scope, $modalInstance, currentUser) {
  $scope.user = currentUser;

  $scope.ok = function () {
    $modalInstance.close();
  };
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});