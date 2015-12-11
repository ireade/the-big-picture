app.controller('GoalsCtrl', ['$scope', '$rootScope', 'FIREBASE_URL', '$firebaseArray', '$firebaseObject', '$location', 'AlertMessage', function( $scope, $rootScope,  FIREBASE_URL, $firebaseArray, $firebaseObject, $location, AlertMessage) {


	/* DEFINE VARIABLES */

	$scope.pageClass = 'page-goals';

	var goalsRef = new Firebase(FIREBASE_URL + '/goals/' + $rootScope.currentUser);
	var goals = $firebaseArray(goalsRef);
	$scope.goals = goals;

	goals.$loaded().then(function() {
		$('.loading-animation').hide();
		$('.initial-hidden').fadeIn();
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

	


	$scope.addGoal = function(goal) {

		if ( $scope.addGoalForm.$invalid ) {

			AlertMessage.invalidForm('addGoalForm');

		} else {

			var newGoal = {
				title: goal.title,
				description: goal.description ? goal.description : "",
				deadline: goal.deadline,
				status: 'active',
				date_added: Firebase.ServerValue.TIMESTAMP

			}

			goalsRef.push(newGoal);
			$scope.hideModal();

		}

		

	}


	$scope.goalsFilter = {
		status: $scope.goalsFilterStatus
	}

	$scope.goalsFilterStatus = "active";

	$('input[name="goalsFilterStatus"]').on('change', function() {
		$scope.goalsFilter.status = $scope.goalsFilterStatus;
		console.log($scope.goalsFilter);
	})




}]);




app.controller('minGoalTasksCtrl', ['$scope', '$rootScope', 'FIREBASE_URL', '$firebaseArray', function( $scope, $rootScope, FIREBASE_URL, $firebaseArray ) {


	$scope.completePercentage;

	$scope.getCompletePercentage = function(goalID) {

		var tasksRef = new Firebase(FIREBASE_URL + '/tasks/' + $rootScope.currentUser);
		var query = tasksRef.orderByChild("goal").equalTo(goalID);
		var tasks = $firebaseArray(query);

		var completedTasksNo = 0;

		tasks.$loaded().then(function() {

			for (i = 0; i < tasks.length; i++) {

				if ( tasks[i].status === 'complete' ) {
					completedTasksNo++;
				}

				if ( i === (tasks.length - 1) ) {
					$scope.completePercentage = ( completedTasksNo / tasks.length ) * 100;
				}
			}

		})
	}



}]);