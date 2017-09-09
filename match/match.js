var app = angular.module('matchApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/home');

	$stateProvider
	.state('home', {
		url: '/home',
		templateUrl: './home.html'
	})
	.state('profile', {
		url: '/profile',
		templateUrl: './profile.html'
	})
	.state('tags', {
		url: '/tags',
		templateUrl: './tags.html'
	})

});

app.config(['$compileProvider', function ($compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|data|file|sms|tel):/);
}]);

app.directive('onFileChange', function() {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
			var onChangeHandler = scope.$eval(attrs.onFileChange);
			element.bind('change', onChangeHandler);
		}
	};
});

app.controller('tagsCtrl', ['$scope','$http', function($scope, $http) {

	$scope.tags = [{"name":"edit me", "left":[], "right":[]}];

	$scope.add = function(tag) {
		if (tag.left.length === 0) {//add left
			tag.left.push({"name":"edit me", "left":[], "right":[]});
		} else if (tag.right.length === 0) {//add right
			tag.right.push({"name":"edit me", "left":[], "right":[]});
		}
	};

	$scope.source = null;
	$scope.exchange = function(tag) {
		if ($scope.source === null) {
			tag.isExchanging = !tag.isExchanging;//change styles
			$scope.source = tag;//store
		} else {//swap
			var target = tag.name;//get target
			var temporary = $scope.source.name;
			$scope.source.name = target;
			tag.name = temporary;
			$scope.source.isExchanging = !$scope.source.isExchanging;//change styles
			$scope.source = null;//reset
		}
	};

	$scope.canUnlinkTag = function(tag, parent) {
		return typeof parent !== "undefined";
	}
	$scope.unlinkTag = function(tag, parent) {
		if (parent.left[0] === tag) {//unlink left
			parent.left = [];
		} else if (parent.right[0] === tag) {//unlink right
			parent.right = [];
		}
	};

	$scope.downloadName = "tags"
	$scope.showDownload = false;
	$scope.download = function() {
		return "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify($scope.tags));
	}

	$scope.showUpload = false;
	$scope.uploadFile = function() {
		try {
			var file = document.getElementById('file').files[0];

			var reader = new FileReader();

			reader.onloadend = function(e) {
				$scope.tags = JSON.parse(e.target.result);
				$scope.showUpload = false;
				$scope.$apply();
			}

			reader.readAsBinaryString(file);
		} catch (e) {
			alert(e);
		}
	}
}]);