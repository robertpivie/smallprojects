
var app = angular.module('matchApp', []);

app.controller('tagsCtrl', ['$scope','$http', function($scope, $http) {

	$http.get('./tags.json')
	.success(function(successData){
		$scope.tags = successData;
	})
	.error(function(error){
		console.log(error);
	});

	$scope.source = null;
	$scope.exchange = function(element, tag) {
		if ($scope.source === null) {
			tag.isExchanging = !tag.isExchanging;//change styles
			$scope.source = tag;//store
		} else {
			//swap
			var target = tag.name;//get target
			var temporary = $scope.source.name;
			$scope.source.name = target;
			tag.name = temporary;
			//change styles
			$scope.source.isExchanging = !$scope.source.isExchanging;
			//reset
			$scope.source = null;
		}
		console.log(element);
	}
}]);