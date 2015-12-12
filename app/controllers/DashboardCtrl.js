app.controller('DashboardCtrl', ['$scope', '$rootScope', 'FIREBASE_URL', '$firebaseArray', '$firebaseObject', '$location', 'AlertMessage', function( $scope, $rootScope,  FIREBASE_URL, $firebaseArray, $firebaseObject, $location, AlertMessage) {



	/* DEFINE VARIABLES */

	$scope.pageClass = 'page-dashboard';

	var tasksRef = new Firebase(FIREBASE_URL + '/tasks/' + $rootScope.currentUser);
	var query = tasksRef.orderByChild("status").equalTo("active");
	var tasks = $firebaseArray(query);
	$scope.tasks = tasks;

	tasks.$loaded().then(function() {
		$('.loading-animation').hide();
		$('.initial-hidden').fadeIn();
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
		},
		{
			quote: "Either write something worth reading or do something worth writing",
			author: "Benjamin Franklin"
		},
		{
			quote: "Action is the foundational key to all success",
			author: "Pablo Picasso"
		},
		{
			quote: "If you want to make an easy job seem mighty hard, just keep putting off doing it",
			author: "Olin Miller"
		},
		{
			quote: "A year from now you may wish you had started today",
			author: "Karen Lamb"
		},
		{
			quote: "You don’t have to see the whole staircase, just take the first step",
			author: "Martin Luther King, Jr"
		},
		{
			quote: "Great acts are made up of small deeds",
			author: "Lao Tzu"
		},
		{
			quote: "Don’t wait. The time will never be just right",
			author: "Napoleon Hill"
		}
	];

	var randomNumber = Math.floor( Math.random() * quotes.length );
	$scope.quote = quotes[randomNumber];




	
	/* UPDATE TASK STATUS */

	$scope.updateTaskStatus = function(task) {

		var taskRef = new Firebase(FIREBASE_URL + '/tasks/' + $rootScope.currentUser + '/' + task.$id);
		var task = $firebaseObject(taskRef);

		task.$loaded().then(function() {

			// 	Only showing active tasks, so only action possible
			// is to mark as complete
			taskRef.update({
				status: 'complete',
			})
			AlertMessage.taskCompleteSound();
			AlertMessage.sidePopup('success', 'Task completed!');

		})
		
	}





	


	

	



}]);