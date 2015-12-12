var app = angular.module('TheBigPicture', ['ngRoute', 'firebase']);

app.config( ['$compileProvider', function($compileProvider) {   
	$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);
}]);

app.controller('NavCtrl', function($scope, $location) {
	$scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
});
