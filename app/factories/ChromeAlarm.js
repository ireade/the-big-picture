app.factory('ChromeAlarm', function(FIREBASE_URL, $firebaseArray, $firebaseObject, $rootScope, $filter) {



	function getAlarmName(taskID, goalID, callback) {

		var taskRef = new Firebase(FIREBASE_URL + '/tasks/' + $rootScope.currentUser + '/' + taskID);
		var task = $firebaseObject(taskRef);

		var goalRef = new Firebase(FIREBASE_URL + '/goals/' + $rootScope.currentUser + '/' + goalID);
	    var goal = $firebaseObject(goalRef);

	    task.$loaded().then(function() {
	    goal.$loaded().then(function() {

	    	var alarmName = 'TaskTitle:' + task.title + 'Due:' + $filter('momentDate')(task.deadline) + 'GoalTitle:' + goal.title + 'TaskID:' + task.$id;

	    	callback(alarmName, task);

	    }) // goal loaded
	    }) // task loaded


	}





	return  {

		create: function(taskID, goalID, taskAlarm) {

			getAlarmName(taskID, goalID, function(alarmName) {

				var date = new Date( taskAlarm.deadline ).getTime();


				// ADD CHROME ALARM
				var options = {
					when: date
					//periodInMinutes: 0.5,
				}
			    chrome.alarms.create(alarmName, options);


			    // ADD TO DATABASE
			    var taskRef = new Firebase(FIREBASE_URL + '/tasks/' + $rootScope.currentUser + '/' + taskID);
				taskRef.update({
			    	reminder: taskAlarm.deadline
			    })

			})

		},

		remove: function(taskID, goalID) {

			getAlarmName(taskID, goalID, function(alarmName, task) {

				// REMOVE CHROME ALARM
				chrome.alarms.clear(alarmName);


			    // REMOVE FROM DATABASE
			    var taskRef = new Firebase(FIREBASE_URL + '/tasks/' + $rootScope.currentUser + '/' + taskID);

			    taskRef.update({
			    	reminder: task.deadline
			    })

			})

		}




	}



})