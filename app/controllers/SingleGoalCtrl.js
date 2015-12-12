app.controller('SingleGoalCtrl', ['$scope', '$rootScope', '$routeParams', 'FIREBASE_URL', '$firebaseArray', '$firebaseObject', '$location', 'AlertMessage', function( $scope, $rootScope, $routeParams, FIREBASE_URL, $firebaseArray, $firebaseObject, $location, AlertMessage ) {



	/* DEFINE VARIABLES */

	$scope.pageClass = 'page-goal';

	var goalID = $routeParams.goal;

	var goalRef = new Firebase(FIREBASE_URL + '/goals/' + $rootScope.currentUser + '/' + goalID);
	var goal = $firebaseObject(goalRef);
	$scope.goal = goal;

	goal.$loaded().then(function() {
		$('.loading-animation').hide();
		$('.initial-hidden').fadeIn();
	})

	var tasksRef = new Firebase(FIREBASE_URL + '/tasks/' + $rootScope.currentUser);
	var query = tasksRef.orderByChild("goal").equalTo(goalID);
	var tasks = $firebaseArray(query);
	$scope.tasks = tasks;

	$scope.completedTasksNo = 0;

	tasks.$loaded().then(function() {
		angular.forEach(tasks, function(task) {
			if ( task.status === 'complete' ) {
				$scope.completedTasksNo++;

				$scope.tasksCompleted = ($scope.completedTasksNo === tasks.length) && (tasks.length > 0);
			}
		})

	})

	$scope.tasksCompleted = ($scope.completedTasksNo === tasks.length) && (tasks.length > 0);



	/* GENERAL HELPER FUNCTIONS */

	$(".dateTimePickerBox").DateTimePicker({
    	isPopup: false,
    	dateTimeFormat: "yyyy-MM-dd hh:mm:ss"
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

		if ( $scope.updateGoalForm.$invalid ) {

			AlertMessage.invalidForm('updateGoalForm');

		} else {

			goalRef.update({
				title: goal.title,
				description: goal.description,
				deadline: goal.deadline,
			})

			$scope.hideModal();
			AlertMessage.sidePopup('success', 'Goal updated!');

		}

	}

	$scope.updateGoalStatus = function(goal) {

		if (goal.status === 'active') {
			goalRef.update({
				status: 'complete',
			})
			AlertMessage.taskCompleteSound();
			AlertMessage.sidePopup('success', 'Goal completed!');
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

		if ( $scope.quickAddTaskForm.$invalid ) {

			AlertMessage.invalidForm('quickAddTaskForm');

		} else {

			var newTask = {
				title: task.title,
				deadline: task.deadline,
				reminder: task.deadline,
				goal: goalID,
				status: 'active',
				date_added: Firebase.ServerValue.TIMESTAMP
			}

			tasksRef.push(newTask);

			$scope.task = "";

			$scope.hideModal();
			AlertMessage.sidePopup('success', 'Task added!');

		}

		

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
				AlertMessage.taskCompleteSound();
				AlertMessage.sidePopup('success', 'Task completed!');

				$scope.tasksCompleted = ($scope.completedTasksNo === tasks.length) && (tasks.length > 0);
			}
			else if (task.status === 'complete') {
				$scope.completedTasksNo--
				taskRef.update({
					status: 'active',
				})

				$scope.tasksCompleted = ($scope.completedTasksNo === tasks.length) && (tasks.length > 0);

				if (goal.status === 'complete') {
					goalRef.update({
						status: 'active',
					})
				}
			}

		})
		
	}



	/* ***********************

		DELETE GOAL

	*********************** */


	$scope.deleteGoal = function(goal) {

		for (i = 0; i < tasks.length; i++) {

			var task = new Firebase(FIREBASE_URL + '/tasks/' + $rootScope.currentUser + '/' + tasks[i].$id);
			task.remove();

			if ( i === (tasks.length - 1) ) {
				goalRef.remove();
				$location.path('/goals');
				AlertMessage.sidePopup('success', 'Goal deleted');
			}
		}

	}



}]);