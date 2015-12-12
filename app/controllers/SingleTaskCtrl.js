app.controller('SingleTaskCtrl', ['$scope', '$rootScope', '$routeParams', 'FIREBASE_URL', '$firebaseArray', '$firebaseObject', '$location', 'AlertMessage', 'ChromeAlarm', '$filter', function( $scope, $rootScope, $routeParams, FIREBASE_URL, $firebaseArray, $firebaseObject, $location, AlertMessage, ChromeAlarm, $filter) {


	/* DEFINE VARIABLES */

	$scope.pageClass = 'page-task';

	var taskID = $routeParams.task;

	var taskRef = new Firebase(FIREBASE_URL + '/tasks/' + $rootScope.currentUser + '/' + taskID);
	var task = $firebaseObject(taskRef);
	$scope.task = task;

	var alarmName;



	$scope.goalTitle;

	task.$loaded().then(function() {
		$('.loading-animation').hide();
		$('.initial-hidden').fadeIn();

		var goalRef = new Firebase(FIREBASE_URL + '/goals/' + $rootScope.currentUser + '/' + task.goal);
	    var goal = $firebaseObject(goalRef);

	    goal.$loaded().then(function() {
	    	$scope.goalTitle = goal.title;
	  	})


	  	if ( !task.reminder ) {
	  		$scope.task.reminder = task.deadline;
	  	}


	  	
  	})



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

		if ( $scope.updateTaskForm.$invalid ) {

			AlertMessage.invalidForm('updateTaskForm');

		} else {

			taskRef.update({
				title: task.title,
				deadline: task.deadline,
				goal: $scope.goalsList.id,
			})

			$scope.hideModal();
			AlertMessage.sidePopup('success', 'Task updated!');


		}

		

	}




	$scope.updateTaskStatus = function(task) {

		if (task.status === 'active') {
			taskRef.update({
				status: 'complete',
			})

			AlertMessage.taskCompleteSound();
			AlertMessage.sidePopup('success', 'Task completed!');
		}
		else if (task.status === 'complete') {
			taskRef.update({
				status: 'active',
			})
		}


		
	}





	/* ***********************

		DELETE TASK

	*********************** */


	$scope.deleteTask = function(task) {
		taskRef.remove();
		$location.path('/tasks');
		AlertMessage.sidePopup('success', 'Task deleted');
	}








	/* ***********************

		NOTIFICATION ALARMS

	*********************** */

	$scope.addAlarm = function(taskAlarm) {
		ChromeAlarm.create(task.$id, task.goal, taskAlarm);
	    $scope.hideModal();

	    var filteredAlarmDate = $filter('momentDate')(taskAlarm.deadline)
	    AlertMessage.sidePopup('success', 'Alarm set for '+ filteredAlarmDate);
	}

	$scope.removeAlarm = function() {
		ChromeAlarm.remove(task.$id, task.goal);
	    $scope.hideModal();
	    AlertMessage.sidePopup('success', 'Alarm removed');
	}


			
	 


}]);