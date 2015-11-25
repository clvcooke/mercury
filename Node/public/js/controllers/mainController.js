app.controller('MainController', ['$scope', '$http', '$mdSidenav', 'Categories', function ($scope, $http, $mdSidenav, Categories) {
    var vm = this;

    vm.meeting = {
        from: {},
        to: {}
    };

    vm.locator = {
        address: '',
        category: ''
    }
    vm.category = "all";
    vm.categories = Categories.categories;
    vm.prettyCategory = Categories.prettyCategory;

    vm.onSubmitLocator = function () {
        var requestString = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
        var latitude = $scope.gPlace.getPlace().geometry.location.lat();
        var longitude = $scope.gPlace.getPlace().geometry.location.lng();
        requestString += "location=" + latitude + ","  + longitude;
        requestString += "&radius=" + vm.radius * 1000;
        requestString += vm.category === 'all' ? '' : '&category="'+ vm.category;
        json = JSON.stringify({request: requestString});
        console.log(requestString);

        $http({
            url: "http://localhost:3000/locator",
            dataType: "json",
            data: json,
            method: "POST",
        }).success(function(res) {
                console.log('Success');
            });
    };

    vm.onCreateClick = function() {
        console.log(vm.category)
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

}]);