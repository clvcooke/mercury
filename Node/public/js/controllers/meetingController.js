app.controller('MeetingController', ['$scope', '$http', function($scope, $http) {
	var vm = this;
	vm.type = "all";
	vm.today = new Date();

	vm.minDate = new Date(
		vm.today.getFullYear(),
		vm.today.getMonth(),
		vm.today.getDate()-1);
	vm.maxDate = new Date(
		vm.today.getFullYear(),
		vm.today.getMonth() + 2,
		vm.today.getDate());

	vm.meeting = {
		subject: "",
		location: [],
		users: [],
		time: vm.today
	}

	vm.submit = function() {
	}

}]);