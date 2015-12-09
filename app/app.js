var app = angular.module('TheBigPicture', ['ngRoute', 'firebase']);

app.constant('FIREBASE_URL', 'https://thebigpicture.firebaseio.com/');


app.config( ['$compileProvider', function($compileProvider) {   

	$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);
	
}]);

