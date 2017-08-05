var mealdr = angular.module("mealdr", ['ngMaterial']);

mealdr.controller("mealdr", function($scope, $http, $mdDialog) {
	
	$scope.showLogin = function(event) {
		$mdDialog.show({
			controller: DialogController,
			templateUrl: "./templates/loginTemplate.html",
			parent: angular.element(document.body),
			targetEvent: event,
			clickOutsideToClose: true,
			fullscreen: $scope.customFullscreen
		})
		.then(function(token) {
			$scope.authenticationToken = token;
		}, function() {
			$scope.authenticationToken = "";
		});
	};
	
    $http({
        method : "GET",
        url : "./data/meals.json"
    }).then(function mySucces(meals) {
        $scope.meals = meals.data;
    }, function myError(response) {
        $scope.meals = {};
    });
	
	$scope.newKey = "";
	$scope.newMeal = {
		"key" : "",
        "created" : "",
        "ingredients" : [{"amount":"","name":""}],
        "instructions" : [{"name" : ""}],
        "image" : "./images/default.png"
	}
	$scope.addIngredient = function() { 
		$scope.newMeal.ingredients.push({"amount":"","name":""}); 
	}
	$scope.removeIngredient = function(index) {
		$scope.newMeal.ingredients.splice(index, 1);
	}
	$scope.addInstruction = function() { 
		$scope.newMeal.instructions.push({"name" : ""}); 
	}
	$scope.removeInstruction = function(index) {
		$scope.newMeal.instructions.splice(index, 1);
	}
	$scope.saveNewMeal = function () {
		//add meal
		$scope.meals[$scope.newKey] = $scope.newMeal;
		//write meal to storage
		var mealString = JSON.stringify($scope.newMeal)
		$http({
			method : "GET",
			url : "http://localhost/cgi-bin/mealdrAddMeal.py?meal=" + mealString
		}).then(function mySucces(meals) {
			$scope.meals = meals.data;
		}, function myError(response) {
			$scope.meals = {};
		});
		//clear new meal
		$scope.newKey = "";
		$scope.newMeal = {
			"key" : "",
			"created" : "",
			"ingredients" : [{"amount":"","name":""}],
			"instructions" : [{"name" : ""}],
			"image" : "./images/default.png"
		}
	}
	
	function DialogController($scope, $mdDialog) {
		$scope.status = "Login";
		
		$scope.cancel = function() {
			$mdDialog.cancel();
		};
		$scope.login = function() {
			var url = "http://localhost/cgi-bin/mealdrAuth.py?email="+$scope.email+"&password="+$scope.password;
			$http({
				method : "GET",
				url : url
			}).then(function success(token) {
				sessionStorage.auth = token.data;
				console.log(sessionStorage.auth);
				$mdDialog.hide();
			}, function error(response) {
				$scope.status = response.statusText;
			});
		};
	}
    
});