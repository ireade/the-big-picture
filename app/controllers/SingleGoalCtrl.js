app.controller('SingleGoalCtrl', ['$scope', '$rootScope', '$routeParams', 'FIREBASE_URL', '$firebaseArray', '$firebaseObject', '$location', 'CorrectDate', function( $scope, $rootScope, $routeParams, FIREBASE_URL, $firebaseArray, $firebaseObject, $location, CorrectDate ) {



	/* DEFINE VARIABLES */

	var goalID = $routeParams.goal;

	var goalRef = new Firebase(FIREBASE_URL + '/goals/' + $rootScope.currentUser + '/' + goalID);
	var goal = $firebaseObject(goalRef);
	$scope.goal = goal;

	var tasksRef = new Firebase(FIREBASE_URL + '/tasks/' + $rootScope.currentUser);
	var query = tasksRef.orderByChild("goal").equalTo(goalID);
	var tasks = $firebaseArray(query);
	$scope.tasks = tasks;

	$scope.completedTasksNo = 0;

	tasks.$loaded().then(function() {
		angular.forEach(tasks, function(task) {
			if ( task.status === 'complete' ) {
				$scope.completedTasksNo++;
			}
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

		UPDATE GOAL

	*********************** */

	$scope.updateGoal = function(goal) {

		goalRef.update({
			title: goal.title,
			description: goal.description,
			deadline: CorrectDate(goal.deadline),
		})

		$scope.hideModal();

	}

	$scope.updateGoalStatus = function(goal) {

		if (goal.status === 'active') {
			goalRef.update({
				status: 'complete',
			})
		}
		else if (goal.status === 'complete') {
			goalRef.update({
				status: 'active',
			})
		}

	}




	/* ***********************

		MANAGE GOAL'S TASKS 

	*********************** */

	$scope.quickAddTask = function(task) {

		var newTask = {
			title: task.title,
			deadline: CorrectDate(task.deadline),
			reminder: task.reminder ? CorrectDate(task.reminder) : "",
			goal: goalID,
			status: 'active',
			date_added: Firebase.ServerValue.TIMESTAMP
		}

		tasksRef.push(newTask);

		$scope.task = "";

		$scope.hideModal();

	};

	$scope.updateTaskStatus = function(task) {

		var taskRef = new Firebase(FIREBASE_URL + '/tasks/' + $rootScope.currentUser + '/' + task.$id);
		var task = $firebaseObject(taskRef);

		task.$loaded().then(function() {

			if (task.status === 'active') {
				$scope.completedTasksNo++
				taskRef.update({
					status: 'complete',
				})
			}
			else if (task.status === 'complete') {
				$scope.completedTasksNo--
				taskRef.update({
					status: 'active',
				})

				if (goal.status === 'complete') {
					goalRef.update({
						status: 'active',
					})
				}
			}

		})
		
	}



}]);