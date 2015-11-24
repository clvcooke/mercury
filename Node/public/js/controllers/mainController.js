app.controller('MainController', ['$scope', function( $scope ) {

	$scope.name = "hello";

	$scope.authenticate = function( user, pass ) {
		console.log(user);
		console.log(pass);
	}

}]);