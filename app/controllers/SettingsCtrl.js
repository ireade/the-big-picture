app.controller('SettingsCtrl', ['$scope', '$rootScope', 'FIREBASE_URL', '$firebaseArray', '$firebaseObject', '$location', 'Authentication', function( $scope, $rootScope,  FIREBASE_URL, $firebaseArray, $firebaseObject, $location, Authentication) {



	/* DEFINE VARIABLES */

	$scope.pageClass = 'page-about';

	$scope.shareURL = "https://chrome.google.com/webstore/detail/ihbhhiololfcfppohmejkkangdaejeei/";
	$scope.shareText = "The Big Picture, a Chrome Extension for keeping track of your long term goals";


	/* GENERAL HELPER FUNCTIONS */

	$scope.showModal = function(modalName) {
		$('.modal-container').addClass('showing');
		$('.'+modalName).addClass('showing');
	}

	$scope.hideModal = function() {
		$('.modal-container').removeClass('showing');
		$('.modal').removeClass('showing');
	}






	

}]);