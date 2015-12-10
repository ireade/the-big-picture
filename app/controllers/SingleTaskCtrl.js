app.controller('SingleTaskCtrl', ['$scope', '$rootScope', '$routeParams', 'FIREBASE_URL', '$firebaseArray', '$firebaseObject', '$location', 'CorrectDate', 'AlertMessage', function( $scope, $rootScope, $routeParams, FIREBASE_URL, $firebaseArray, $firebaseObject, $location, CorrectDate, AlertMessage ) {


	/* DEFINE VARIABLES */

	$scope.pageClass = 'page-task';

	var taskID = $routeParams.task;

	var taskRef = new Firebase(FIREBASE_URL + '/tasks/' + $rootScope.currentUser + '/' + taskID);
	var task = $firebaseObject(taskRef);
	$scope.task = task;



	$scope.goalTitle;

	task.$loaded().then(function() {
		$('.loading-animation').hide();
		$('.initial-hidden').fadeIn();

		var goalRef = new Firebase(FIREBASE_URL + '/goals/' + $rootScope.currentUser + '/' + task.goal);
	    var goal = $firebaseObject(goalRef);

	    goal.$loaded().then(function() {
	    	$scope.goalTitle = goal.title;
	  	})


	  	//$scope.task.deadline = ReversedDate(task.deadline);


	  	if ( !task.reminder ) {
	  		$scope.task.reminder = task.deadline;
	  	}


	  	
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

		if ( $scope.updateTaskForm.$invalid ) {

			AlertMessage.invalidForm('updateTaskForm');

		} else {

			// taskRef.update({
			// 	title: task.title,
			// 	deadline: CorrectDate(task.deadline),
			// 	goal: $scope.goalsList.id,
			// 	reminder: CorrectDate(task.reminder)
			// })


			/* NOTIFICATION */

			var alarms = [];
			chrome.storage.sync.get('alarms', function(items) {
				alarms = items.alarms;
			});
			

			var now = new Date();
			var date = new Date( CorrectDate(task.reminder) ).getTime();

			var timeoutTime = date - now;

			var newAlarm = {
				type: 'basic', 
			    title: "This is a notification", 
			    message: task.title,
			    iconUrl: "assets/icons/icon48.png",
			    alarmID: task.$id,
			    alarmDate: timeoutTime
			}

			console.log(newAlarm);
			alarms.push(newAlarm);

			chrome.storage.sync.set({alarms: alarms}, function() {

		    });


		}

		

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



	/* ***********************

		DELETE TASK

	*********************** */


	$scope.deleteTask = function(task) {

		taskRef.remove();
		$location.path('/tasks');

	}








}]);