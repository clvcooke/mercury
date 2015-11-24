var app = angular.module('Agora', ['ngMaterial']);

app.controller('AppController', function ($scope, $http, $mdSidenav) {
    var vm = this;

    vm.currentPos = {
        latitude: '',
        longitue: ''
    }

    vm.meeting = {
        from: {},
        to: {}
    };

    vm.locator = {
        address: '',
        category: ''
    }

    vm.onSubmitLocator = function () {
        var requestString = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
        var latitude = $scope.gPlace.getPlace().geometry.location.lat();
        var longitude = $scope.gPlace.getPlace().geometry.location.lng();
        requestString += "location=" + latitude + ","  + longitude;
        requestString += "&radius=" + vm.radius * 1000;
        json = JSON.stringify({request: requestString});
        console.log(requestString)

        $http({
            url: "http://localhost:3000/test",
            dataType: "json",
            data: json,
            method: "POST",
        }).success(function(res) {
               
            });
    };

    vm.onCreateClick = function() {

    };

    vm.onBrowseClick = function() {

    };

    vm.toggleSidenav = function (menuId) {
        $mdSidenav(menuId).toggle();
    };

    vm.getLocation = function() {
        function recordPosition(position) {
            // vm.fromCoords.latitude = position.coords.latitude;
            // vm.meeting.fromCoords.longitude = position.coords.longitude;
            // vm.meeting.from = "Your location";
        }
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(recordPosition);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

});