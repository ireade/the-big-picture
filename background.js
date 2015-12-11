chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.create({'url': chrome.extension.getURL('index.html')}, function(tab) {
	  // Tab opened.
	});
});



function getAlarmDetails(alarmName) {

	var taskTitle = alarmName.split("TaskTitle:")[1];
	taskTitle = taskTitle.split("Due:")[0];

	var taskDue = alarmName.split("Due:")[1];
	taskDue = taskDue.split("GoalTitle:")[0];

	var goalTitle = alarmName.split("GoalTitle:")[1];
	goalTitle = goalTitle.split("TaskID:")[0];

	var taskID = alarmName.split("TaskID:")[1];

	var alarmDetails = {
		taskTitle: taskTitle,
		taskDue: taskDue,
		goalTitle: goalTitle,
		taskID: taskID
	}

	return alarmDetails;

}


chrome.alarms.onAlarm.addListener(function( alarm ) {

	//console.log("Got an alarm!", alarm);

	var alarmName = alarm.name;
	var alarmDetails = getAlarmDetails(alarmName);

	var notificationMessage = ' "'+ alarmDetails.taskTitle + '" for "'+ alarmDetails.goalTitle + '" is due ' + alarmDetails.taskDue;


	chrome.notifications.create(
	    alarmName,
	    {   
		    type: 'basic', 
		    title: "Task Reminder", 
		    message: notificationMessage,
		    iconUrl: "assets/icons/icon48.png",
		    buttons: [{ title: 'View Task' }],
		    isClickable: true,
	    },
	    function() {}
	);



});



chrome.notifications.onButtonClicked.addListener(function(alarmName) {

	var alarmDetails = getAlarmDetails(alarmName);

	var taskPage = chrome.extension.getURL('index.html') + '#/tasks/' + alarmDetails.taskID;

	chrome.tabs.create({'url': taskPage}, function(tab) {
	  // Tab opened.
	});

});




