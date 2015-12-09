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
		registerUser: function(user) {


		  	var user_uid = userData.uid;
		    
		    userRef.child(user_uid).set({
	    		uid: user_uid,
	    		firstname: user.firstname,
				lastname: user.lastname,
		    });


		},



		logoutUser: function() {

		},




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
			            return true;
			        });
			    }
			});


		},
		requireAuth: function() {
			//return auth.$requireAuth();
		}

	}

});