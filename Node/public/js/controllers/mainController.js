app.controller('MainController', ['$scope', '$http', '$mdSidenav', 'GooglePlaces','$cookies', function ($scope, $http, $mdSidenav, GooglePlaces, $cookies) {
    var vm = this;
    vm.type = "all";
    vm.types = GooglePlaces.types;
    vm.prettyType = GooglePlaces.prettyType;
    $scope.gPlace = [];
    vm.gModel = [];

    vm.onSubmitLocator = function () {
        var requestString = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
        var latitude = 0;
        var longitude = 0;
        var places = $scope.gPlace.length;
        $.each($scope.gPlace, function(key, val) {
            latitude += val.getPlace().geometry.location.lat();
            longitude += val.getPlace().geometry.location.lng();
        });
        latitude /= places;
        longitude /= places;
        requestString += "location=" + latitude + ","  + longitude;
        requestString += "&radius=" + vm.radius * 1000;
        requestString += vm.type === 'all' ? '' : '&type='+ vm.type;
        json = JSON.stringify({request: requestString});

        $http({
            url: "http://localhost:3000/locator",
            dataType: "json",
            data: json,
            method: "POST",
        }).success(function(res) {
            //convert string to Json
            res = JSON.parse(res);
            var results = res.results;
            console.log(results);
            // $.each(results, function(key, val) {
                // console.log(val.name);
            // });
        });
    };

    vm.onAddLocation = function() {
        vm.gModel.push("");
    };

    vm.test = function() {
        $.each($scope.gPlace, function(key, val) {
            console.log(val.getPlace())
        })
        console.log(vm.gModel)
    };

    vm.toggleSidenav = function (menuId) {
        $mdSidenav(menuId).toggle();
    };

    vm.deleteLocation = function() {
        var index = vm.gModel.length - 1;
        vm.gModel.splice(index, 1);
        $scope.gPlace.splice(index, 1);
    }

    vm.foo = function() {
        console.log(vm.gModel[index])
        console.log($scope.gPlace[index])
    }

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

    vm.hideOverlay = function() {
        document.getElementById("overlay").style.display = 'none';
    }

    //check if we already stored a cookie
    var userId = $cookies.get('userId');
    //if we don't create an empty mongo user for them
    if (!userId) {
        $http.post('/api/user/','').then(function(response){
            $cookies.put('userId', response.data);
        });
    }

}]);