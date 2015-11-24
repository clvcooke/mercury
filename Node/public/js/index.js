var app = angular.module('Agora', ['ngMaterial']);

app.controller('AppController', function ($scope, $http, $mdSidenav) {
    var vm = this;
    $scope.onSubmitClick = function () {
        $http.get("http://localhost:3000/select?username=" + vm.meeting.address + "&password=" + vm.meeting.category)
            .success(function (res) {
               
            });
    };

    $scope.onCreateClick = function() {

    };

    $scope.onBrowseClick = function() {

    };

    vm.toggleSidenav = function (menuId) {
        $mdSidenav(menuId).toggle();
    };


});

app.controller.meeting = {
    address: '',
    category: '',
};















