app.factory('addAlertMessage', function() {


	return function(type, message) {

		var alertMessageContainer = $('.alert-message-container');

		alertMessageContainer.html('<div class="alert-message alert-message--'+type+'"><p>'+message+'</p><a href="/#" class="dismiss-alert">Dismiss</a></div>');

	    
		// Dismiss Alert
		$('.dismiss-alert').on('click', function() {
			$('.alert-message').removeClass('alert-message--success, alert-message--warning, alert-message--danger');
			$('.alert-message-container').html('');

			return false;
		})
	}

})

app.factory('AlertMessage', function() {


	return  {

		default: function(type, message) {

			var alertMessageContainer = $('.alert-message-container');

			alertMessageContainer.html('<div class="alert-message alert-message--'+type+'"><p>'+message+'</p><a href="/#" class="dismiss-alert">Dismiss</a></div>');

		    
			// Dismiss Alert
			$('.dismiss-alert').on('click', function() {
				$('.alert-message').removeClass('alert-message--success, alert-message--warning, alert-message--danger');
				$('.alert-message-container').html('');

				return false;
			})

		},

		custom: function(type, message, url, linktext, reload) {

			var alertMessageContainer = $('.alert-message-container');

			alertMessageContainer.html('<div class="alert-message alert-message--'+type+'"><p>'+message+'</p><a href="'+url+'" class="alert-link">'+linktext+'</a></div>');
		    
			// Dismiss Alert
			$('.alert-link').on('click', function() {
				$('.alert-message').removeClass('alert-message--success, alert-message--warning, alert-message--danger');
				$('.alert-message-container').html('');

				if (reload) {
					window.location.reload();
				}
			})
		},

		invalidForm: function() {

			var type = "danger";
			var message = "There is an error with your form.<br> Please try again.";

			var alertMessageContainer = $('.alert-message-container');

			alertMessageContainer.html('<div class="alert-message alert-message--'+type+'"><p>'+message+'</p><a href="/#" class="dismiss-alert">Dismiss</a></div>');
		    
			// Dismiss Alert
			$('.dismiss-alert').on('click', function() {
				$('.alert-message').removeClass('alert-message--success, alert-message--warning, alert-message--danger');
				$('.alert-message-container').html('');
				return false;
			})
		},

		confirmAction: function(message, linktext, callback) {


			var alertMessageContainer = $('.alert-message-container');

			alertMessageContainer.html('<div class="alert-message alert-message--warning"><h3>Are you sure?</h3><p>'+message+'</p><a class="a alert-link alert-link--yes">'+linktext+'</a><br><a class="a alert-link alert-link--no">No, dismiss</a></div>');
		    
			// Dismiss Alert
			$('.alert-link').on('click', function() {
				$('.alert-message').removeClass('alert-message--success, alert-message--warning, alert-message--danger');
				$('.alert-message-container').html('');

				if ( $(this).hasClass('alert-link--yes') ) {
					callback(true)
				} else {
					callback(false)
				}
			})

		}

	}


	

})