app.factory('CorrectDate', function() {
	return function(d) {

		var rawDate = d.split(" ")[0];
	  	var rawTime = d.split(" ")[1];

	  	var year = rawDate.split("-")[2];
	  	var month = rawDate.split("-")[1];
	  	var day = rawDate.split("-")[0];

	  	var date = year+'-'+month+'-'+day + " " + rawTime;

	  	return date;

	}
})

