app.controller('TasksCtrl', ['$scope', '$rootScope', 'FIREBASE_URL', '$firebaseArray', '$firebaseObject', '$location', 'CorrectDate', function( $scope, $rootScope,  FIREBASE_URL, $firebaseArray, $firebaseObject, $location, CorrectDate ) {


	/* DEFINE VARIABLES */

	var tasksRef = new Firebase(FIREBASE_URL + '/tasks/' + $rootScope.currentUser);
	$scope.tasks = $firebaseArray(tasksRef);




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




	/* CREATE TASK */

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
		})
	})

	$scope.addTask = function(task) {

		var newTask = {
			title: task.title,
			deadline: CorrectDate(task.deadline),
			goal: $scope.goalsList.id,
			status: 'active',
			reminder: task.reminder ? CorrectDate(task.reminder) : "",
			date_added: Firebase.ServerValue.TIMESTAMP
		}

		tasksRef.push(newTask);

		$scope.hideModal();

	}



	$scope.updateTaskStatus = function(task) {

		var taskRef = new Firebase(FIREBASE_URL + '/tasks/' + $rootScope.currentUser + '/' + task.$id);
		var task = $firebaseObject(taskRef);

		task.$loaded().then(function() {

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

		})
		
	}



	

}]);







app.controller('minGoalsCtrl', ['$scope', '$rootScope', 'FIREBASE_URL', '$firebaseObject', function( $scope, $rootScope, FIREBASE_URL, $firebaseObject ) {


	$scope.goalTitle;

	$scope.getGoalTitle = function(id) {

		var goalRef = new Firebase(FIREBASE_URL + '/goals/' + $rootScope.currentUser + '/' + id);
	    var goal = $firebaseObject(goalRef);

	    goal.$loaded().then(function() {
	    	$scope.goalTitle = goal.title;
      	})

	}

}]);