app.controller('MeetingController', ['$scope', '$http', '$cookies', '$q', function ($scope, $http, $cookies, $q) {
    var vm = this;
    vm.today = new Date();
    vm.minDate = new Date(
        vm.today.getFullYear(),
        vm.today.getMonth(),
        vm.today.getDate());

    vm.meeting = {
        title: "",
        type: "All",
        location: "",
        date: vm.today,
        time: vm.today,
        users: []
    };

    vm.users = [];

    $scope.updateMap = function() {
    	var latitude = 0;
    	var longitude = 0;
    	var places = 0;
    	$.each($scope.gPlace, function(key, val) {
    		if (val.getPlace()) {
    			places += 1;
    			latitude += val.getPlace().geometry.location.lat();
	            longitude += val.getPlace().geometry.location.lng();
    		}
        });
        latitude /= places;
        longitude /= places;
        vm.map.panTo({lat: latitude, lng: longitude}); 
    }

    vm.loadMap = function() {
    	vm.map = new google.maps.Map(document.getElementById('map'), {
    		center: {lat: 0, lng: 0},
    		zoom: 8
	    });
    }

    vm.addUser = function() {
    	vm.users.push("");
    }

    vm.deleteUser = function() {
    	var index = vm.users.length - 1;
    	vm.users.splice(index, 1);
        $scope.gPlace.splice(index, 1);
        $scope.updateMap();
    }

    vm.submit = function () {
        //create the user object if we don't have it
        var userId = $cookies.get('user_id');
        //convert the meeting to epoch
        vm.meeting.time = Date.parse(vm.meeting.date);

        if (!userId) {
            $http.post('/api/user/', '').then(function (response) {
                $cookies.put('user_id', response.data);
                userId = response.data;
            });
        }

        $q.when(userId).then(function () {
            vm.meeting.users = [userId];
            //save the meeting data in a meeting object
            $http.post('/api/meeting/', vm.meeting).then(function (response) {
                //patch the user with a new location
                var data = {
                    meeting_id: response.data,
                    location: vm.meeting.location
                }
                $http.patch('/api/user/' + userId, data);
            });
        });
    }

}]);