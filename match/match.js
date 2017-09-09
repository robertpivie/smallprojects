
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
	$scope.exchange = function(tag) {
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
	}
	$scope.unlink = function(parent, tag) {
		function deleteLeft(parent, tag) {
			//a more civilized weapon for deleting to the left
			function rightMost(parent, tag) {
				if (tag.right.length === 0 && tag.left.length === 0) {
					return tag;
				} else if (tag.left.length !== 0 && tag.right.length === 0) {
					return rightMost(tag, tag.left[0]);
				} else {
					return rightMost(tag, tag.right[0]);
				}
			}

			if (tag.left.length === 0 && tag.right.length === 0) {//remove left
				parent.left = [];
			} else if (tag.left.length === 0 && tag.right.length !== 0) {//place right in parent left
				parent.left = tag.right;
			} else if (tag.left.length !== 0 && tag.right.length === 0) {//place left in parent left
				parent.left = tag.left;
			} else {//make right most
				parent.left.name = rightMost(tag, tag.left[0]).name;
			}
		}

		//a more civilized weapon for deleting to the right
		function deleteRight(parent, tag) {
			function leftMost(parent, tag) {
				if (tag.right.length === 0 && tag.left.length === 0) {
					return tag;
				} else if (tag.left.length === 0 && tag.right.length !== 0) {
					return leftMost(tag, tag.right[0]);
				} else {
					return leftMost(tag, tag.left[0]);
				}
			}

			if (tag.left.length === 0 && tag.right.length === 0) {//remove left
				parent.right = [];
			} else if (tag.left.length === 0 && tag.right.length !== 0) {//place right in parent left
				parent.right = tag.right;
			} else if (tag.left.length !== 0 && tag.right.length === 0) {//place left in parent left
				parent.right = tag.left;
			} else {//make right most
				parent.right.name = leftMost(tag, tag.right[0]).name;
			}
		}

		try {
			console.log('parent:'+parent);
			console.log('tag:'+tag);
			if (parent.left[0] === tag) {//deleting a left
					parent.left = [];
			} else if (parent.right[0] === tag) {//deleting a right
					parent.right = [];
			}
		} catch (e) {
			console.log(e);
			alert('this node cannot be unlinked');
		}
	}
}]);