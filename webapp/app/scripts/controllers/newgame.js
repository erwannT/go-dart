'use strict';

/**
 * @ngdoc function
 * @name gdApp.controller:NewgamectrlCtrl
 * @description
 * # NewgamectrlCtrl
 * Controller of the gdApp
 */
angular.module('gdApp')
  .controller('NewGameCtrl', ['$scope', '$location', 'dataService', function ($scope, $location, dataService) {

    $scope.alerts = [];

    $scope.boards = ["Rennes","Nantes","Lyon","Paris"];

    $scope.selectedBoard = ""

    $scope.closeAlert = function (index) {
      $scope.alerts.splice(index, 1);
    };

    dataService.styles().then(
      function (data) {
        $scope.styles = data.styles;
      },
      function (rejection) {
        $scope.alerts.push({type: 'danger', msg: rejection});
      });


    dataService.games().then(
      function (data) {
        $scope.games = data;
      },
      function (rejection) {
        $scope.alerts.push({type: 'danger', msg: rejection});
      });

    $scope.newGame = function (style,board) {

      console.log('New Game of style : ', style);
      console.log('Board : ', board)
      dataService.newGame(style,board).then(
        function (gameId) {
          console.log('new game created with id', gameId);
          $location.url('game/' + gameId);
        },
        function (reject) {
          $scope.alerts.push({type: 'danger', msg: reject});
        }
      );
    };

    $scope.joinGame = function (gameId) {
      $location.url('game/' + gameId);
    };

  }]);