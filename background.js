chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.create({'url': chrome.extension.getURL('index.html')}, function(tab) {
	  // Tab opened.
	});
});

var alarms;

chrome.storage.sync.get('alarms', function(items) {
	alarms = items.alarms;

	checkAlarms();
});

function addNotification(alarm) {
	chrome.notifications.create(
	    alarm.alarmID,
	    {   
		    type: 'basic', 
		    title: alarm.title, 
		    message: alarm.message,
		    iconUrl: "assets/icons/icon48.png"
	    },
	    function() {
			console.log("notification created");
		}
	);
}

function callSetTimeOut(alarmObj, time) {
	console.log(time);
	console.log(alarmObj);
	setTimeout( function() { addNotification( alarmObj ) } , time);
}


function checkAlarms() {
	for (i = 0; i < alarms.length; i++) {
		callSetTimeOut(alarms[i], alarms[i].alarmDate);
	}
}