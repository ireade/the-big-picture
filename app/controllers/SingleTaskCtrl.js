app.controller('SingleTaskCtrl', ['$scope', '$rootScope', '$routeParams', 'FIREBASE_URL', '$firebaseArray', '$firebaseObject', '$location', 'CorrectDate', function( $scope, $rootScope, $routeParams, FIREBASE_URL, $firebaseArray, $firebaseObject, $location, CorrectDate ) {


	/* DEFINE VARIABLES */

	var taskID = $routeParams.task;

	var taskRef = new Firebase(FIREBASE_URL + '/tasks/' + $rootScope.currentUser + '/' + taskID);
	var task = $firebaseObject(taskRef);
	$scope.task = task;


	$scope.goalTitle;

	task.$loaded().then(function() {
		var goalRef = new Firebase(FIREBASE_URL + '/goals/' + $rootScope.currentUser + '/' + task.goal);
	    var goal = $firebaseObject(goalRef);

	    goal.$loaded().then(function() {
	    	$scope.goalTitle = goal.title;
	  	})
  	})



	/* GENERAL HELPER FUNCTIONS */

	$(".dateTimePickerBox").DateTimePicker({
    	isPopup: false
    });

	$scope.showModal = function(modalName) {
		$('.modal-container').addClass('showing');
		$('.'+modalName).addClass('showing');
	}

	$scope.hideModal = function() {
		$('.modal-container').removeClass('showing');
		$('.modal').removeClass('showing');
	}

	$scope.isOverdue = function(deadline) {
		var today = new Date();
		deadline = new Date(deadline);

		if ( deadline < today ) {
			return true;
		}
	}



	/* ***********************

		UPDATE TASK

	*********************** */

	// Dropdown Menu of Goals
	var goalsRef = new Firebase(FIREBASE_URL + '/goals/' + $rootScope.currentUser);
	var goals = $firebaseArray(goalsRef);
	$scope.goalsListOptions = [];

	goals.$loaded().then(function() {
		angular.forEach(goals, function(goal) {
			$scope.goalsListOptions.push({
				name: goal.title,
				id: goal.$id
			})

			// Set current goal
			if ( goal.$id === task.goal ) {
				$scope.goalsList = {
					name: goal.title,
					id: goal.$id
				}
			}
 		})
	})


	$scope.updateTask = function(task) {

		taskRef.update({
			title: task.title,
			deadline: CorrectDate(task.deadline),
			goal: $scope.goalsList.id,
			reminder: CorrectDate(task.reminder)
		})

	}




	$scope.updateTaskStatus = function(task) {

		if (task.status === 'active') {
			taskRef.update({
				status: 'complete',
			})
		}
		else if (task.status === 'complete') {
			taskRef.update({
				status: 'active',
			})
		}
		
	}



}]);