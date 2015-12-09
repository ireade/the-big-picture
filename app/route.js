app.config(function($routeProvider) {

	$routeProvider

		.when('/', {
			controller: 'DashboardCtrl',
			templateUrl: 'views/dashboard.html',
			resolve: {
				currentAuth: function(Authentication) {
					return Authentication.waitForAuth();
				},
			}
		})


		.when('/settings', {
			controller: 'SettingsCtrl',
			templateUrl: 'views/settings.html',
			resolve: {
				currentAuth: function(Authentication) {
					return Authentication.waitForAuth();
				},
			}
		})


		/* Goals */

		.when('/goals', {
			controller: 'GoalsCtrl',
			templateUrl: 'views/goals.all.html',
			resolve: {
				currentAuth: function(Authentication) {
					return Authentication.waitForAuth();
				},
			}
		})
		.when('/goals/:goal', {
			controller: 'SingleGoalCtrl',
			templateUrl: 'views/goals.single.html',
			resolve: {
				currentAuth: function(Authentication) {
					return Authentication.waitForAuth();
				},
			}
		})


		/* Tasks */

		.when('/tasks', {
			controller: 'TasksCtrl',
			templateUrl: 'views/tasks.all.html',
			resolve: {
				currentAuth: function(Authentication) {
					return Authentication.waitForAuth();
				},
			}
		})
		.when('/tasks/:task', {
			controller: 'SingleTaskCtrl',
			templateUrl: 'views/tasks.single.html',
			resolve: {
				currentAuth: function(Authentication) {
					return Authentication.waitForAuth();
				},
			}
		})




		.otherwise({
			redirectTo: '/'
		});



});