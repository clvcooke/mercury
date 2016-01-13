app.controller('MeetingController', ['$scope', '$http', '$cookies', '$q', 'GooglePlaces', function ($scope, $http, $cookies, $q, GooglePlaces) {
    var vm = this;
    vm.types = GooglePlaces.types;
    vm.prettyType = GooglePlaces.prettyType;

    vm.today = new Date();
    vm.minDate = new Date(
        vm.today.getFullYear(),
        vm.today.getMonth(),
        vm.today.getDate());

    vm.meeting = {
        id: "",
        title: "",
        type: "All",
        locations: [],
        time: vm.today,
        users: []
    };

    vm.users = [];

    $scope.gPlace = [];

    $scope.update = function() {
    	var latitude = 0;
    	var longitude = 0;
    	var places = 0;
    	$.each($scope.gPlace, function(key, val) {
            var place = val.getPlace();
    		if (place) {
                vm.users[key].location.latitude = place.geometry.location.lat();
                vm.users[key].location.longitude = place.geometry.location.lng();
                vm.users[key].location.name = place.formatted_address;
    			places += 1;
    			latitude += place.geometry.location.lat();
	            longitude += place.geometry.location.lng();
    		}
        });
        if ($scope.gPlace.length > 0) {
            latitude /= places;
            longitude /= places;
            vm.map.panTo({lat: latitude, lng: longitude}); 
        }
    }

    vm.load = function() {
        var url = window.location.href;
        ind = url.lastIndexOf("/") + 1;
        vm.meeting.id = url.slice(ind, ind + 24);
        $http.get('/api/meeting/' + vm.meeting.id).then(function (response) {
            var meeting = response.data;
            vm.meeting.title = response.data.title;
            vm.meeting.type = response.data.type;
            vm.meeting.users = response.data.users;
            vm.meeting.time = new Date(response.data.time);
        });
        $scope.update();
    }

    vm.loadMap = function() {
    	vm.map = new google.maps.Map(document.getElementById('map'), {
    		center: {lat: 0, lng: 0},
    		zoom: 8
	    });
    }

    vm.addUser = function() {
    	vm.users.push({name: "", location:{}});
    }

    vm.deleteUser = function() {
    	var index = vm.users.length - 1;
    	vm.users.splice(index, 1);
        $scope.gPlace.splice(index, 1);
        $scope.update();
    }

}]);

app.controller('CreateMeetingController', ['$scope', '$http', '$cookies', '$q', function ($scope, $http, $cookies, $q) {
    vm = this;

    vm.today = new Date();
    vm.minDate = new Date(
        vm.today.getFullYear(),
        vm.today.getMonth(),
        vm.today.getDate());

    vm.meeting = {
        title: "",
        type: "All",
        locations: [],
        time: vm.today
    };

    $scope.gPlace = [];

    vm.submit = function () {
        vm.meeting.locations.push($scope.gPlace[0]);
        //create the user object if we don't have it
        var userId = $cookies.get('user_id');
        var meeting = angular.copy(vm.meeting);
        //convert the meeting to epoch
        meeting.time = Date.parse(vm.meeting.time);

        if (!userId) {
            $http.post('/api/user/', '').then(function (response) {
                $cookies.put('user_id', response.data);
                userId = response.data;
            });
        }

        $q.when(userId).then(function () {
            vm.meeting.users = [userId];
            //save the meeting data in a meeting object
            $http.post('/api/meeting/', meeting).then(function (response) {
                //patch the user with a new location
                var data = {
                    meeting_id: response.data,
                    locations: vm.meeting.locations
                }
                $http.patch('/api/user/' + userId, data);
            });
        });
    }
}]);