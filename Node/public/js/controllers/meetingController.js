app.controller('MeetingController', ['$scope', '$http', '$cookies', '$q', function ($scope, $http, $cookies, $q) {
    var vm = this;
    vm.today = new Date();

    vm.minDate = new Date(
        vm.today.getFullYear(),
        vm.today.getMonth(),
        vm.today.getDate());

    //not sure why we should restrict this?
    vm.maxDate = new Date(
        vm.today.getFullYear(),
        vm.today.getMonth() + 2,
        vm.today.getDate());

    vm.meeting = {
        title: "",
        type: "All",
        location: "",
        date: vm.today,
        time: vm.today,
        users: []
    };

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