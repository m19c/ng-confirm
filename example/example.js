var app = angular.module('angular-confirm', ['ngConfirm']);

app.controller('MainCtrl', function MainCtrl($scope) {
  $scope.code = 'document.getElementById("body");';

  $scope.cleanUpCode = function cleanUpCode() {
    $scope.code = '';
  };
});
