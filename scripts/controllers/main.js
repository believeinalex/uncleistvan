'use strict';

function LoginCtrl ($scope, $http, $cookies) {
	if ($cookies.email != undefined) {
		window.location = '#/home';
	}

  	$scope.login = function() {


  		$http({method: 'GET', url: 'https://api.mongolab.com/api/1/databases/heroku_app18718971/collections/Users?apiKey=qGPnK5ZwGiBqZ5AcYgGJz8Q2QuJ7MLe5'}).
		  success(function(data, status, headers, config) {
		    for (var i = 0; i < data.length; i++) {
		    	if ($scope.email == data[i].email) {
		    		$cookies.email = $scope.email;
		    		$cookies.name = data[i].name;

					window.location = '#/home';
		    	}
		    }
		  }).
		  error(function(data, status, headers, config) {
		    console.log(data);
		  });
  	}

}

function HomeCtrl ($scope, $http, $cookies) {
	console.log('test');
	$scope.addingEvent = false;
	if (!$cookies.email) {
		window.location = "#/login";
		return;
	} else {
		$scope.email = $cookies.email;
		$scope.name = $cookies.name;
	}

	$scope.logout = function() {
		delete $cookies.name;
		delete $cookies.email;
		window.location = "#";
	}

	function getFreshData() {
		$http({method: 'GET', url: 'https://api.mongolab.com/api/1/databases/heroku_app18718971/collections/Users?apiKey=qGPnK5ZwGiBqZ5AcYgGJz8Q2QuJ7MLe5'}).
		  success(function(data, status, headers, config) {
		    $scope.users = data;
		  }).
		  error(function(data, status, headers, config) {
		    console.log(data);
		});

		$http({method: 'GET', url: 'https://api.mongolab.com/api/1/databases/heroku_app18718971/collections/Events?apiKey=qGPnK5ZwGiBqZ5AcYgGJz8Q2QuJ7MLe5'}).
		  success(function(data, status, headers, config) {
		    $scope.events = data;
		    console.log($scope.events);
		  }).
		  error(function(data, status, headers, config) {
		    console.log(data);
		});
	}

	$scope.isInEvent = function (user, e) {
		return e.attending.indexOf(user.name) > -1 ? true : false; 
	}

	$scope.toggleAttending = function (user, e) {
		if (user.email == $scope.email) {
			var index = e.attending.indexOf(user.name);
			console.log(e);
			if (index > -1) {
				e.attending.splice(index, 1);
			} else {
				e.attending.push(user.name);
			}
			console.log(e);
			
			$http({method: 'POST', url: 'https://api.mongolab.com/api/1/databases/heroku_app18718971/collections/Events/?apiKey=qGPnK5ZwGiBqZ5AcYgGJz8Q2QuJ7MLe5', data: e}).
		  		success(function(data, status, headers, config) {
		  		}).
		  		error(function(data, status, headers, config) {
		    		console.log(data);
				});
		}
	}

	$scope.submitEvent = function() {
		var newEvent = JSON.stringify({
			"name": $scope.eventName,
			"date": $scope.eventDate,
			"format": $scope.eventFormat,
			"attending": [$scope.name]
		});
		console.log(newEvent);
	}


	getFreshData();

	

}
