app.controller('DashboardCtrl', ['$scope', '$rootScope', 'FIREBASE_URL', '$firebaseArray', '$firebaseObject', '$location', function( $scope, $rootScope,  FIREBASE_URL, $firebaseArray, $firebaseObject, $location ) {



	/* DEFINE VARIABLES */

	var tasksRef = new Firebase(FIREBASE_URL + '/tasks/' + $rootScope.currentUser);
	var query = tasksRef.orderByChild("status").equalTo("active");
	var tasks = $firebaseArray(query);
	$scope.tasks = tasks;

	tasks.$loaded().then(function() {
		$('.loading-animation').hide();
	})



	/* GENERAL HELPER FUNCTIONS */

	$scope.isOverdue = function(deadline) {
		var today = new Date();
		deadline = new Date(deadline);

		if ( deadline < today ) {
			return true;
		}
	}



	/* QUOTES */

	var quotes = [
		{
			quote: "There is no substitute for hard work",
			author: "Thomas A. Edison"
		},
		{
			quote: "If you spend too much time thinking about a thing, you'll never get it done",
			author: "Bruce Lee"
		},
		{
			quote: "Amateurs sit and wait for inspiration, the rest of us just get up and go to work",
			author: "Stephen King"
		},
		{
			quote: "The society based on production is only productive, not creative",
			author: "Albert Camus"
		},
		{
			quote: "The way to get started is to quit talking and begin doing",
			author: "Walt Disney"
		},
		{
			quote: "It’s not that I’m so smart, it’s just that I stay with problems longer",
			author: "Albert Einstein"
		},
		{
			quote: "Sometimes, things may not go your way, but the effort should be there every single night",
			author: "Michael Jordan"
		},
		{
			quote: "If you’re going through hell, keep going",
			author: "Winston Churchill"
		}
	];


	var ceiling = quotes.length;
	var randomNumber = Math.floor(Math.random() * (ceiling + 1));

	$scope.quote = quotes[randomNumber];






	






	


	

	



}]);