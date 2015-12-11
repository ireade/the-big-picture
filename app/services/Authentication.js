app.factory('Authentication', function(FIREBASE_URL, $firebaseArray, $firebaseObject, $rootScope, $location) {




	var userRef = new Firebase(FIREBASE_URL + '/users');

	function getRandomToken() {
	    var randomPool = new Uint8Array(32);
	    crypto.getRandomValues(randomPool);
	    var hex = '';
	    for (var i = 0; i < randomPool.length; ++i) {
	        hex += randomPool[i].toString(16);
	    }
	    return hex;
	}






	return {
		waitForAuth: function() {
			

			chrome.storage.sync.get('userid', function(items) {
			    var userid = items.userid;
			    if (userid) {
			    	$rootScope.currentUser = userid;
			        return true;
			    } else {
			        userid = getRandomToken();

			        chrome.storage.sync.set({userid: userid}, function() {
			        	$rootScope.currentUser = userid;

			        	userRef.child(userid).set({
				    		browser: true,
					    });

			            return true;
			        });
			    }
			});


		}

	}

});