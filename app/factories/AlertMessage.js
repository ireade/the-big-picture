app.factory('AlertMessage', function() {


	return  {

		invalidForm: function(formName) {


			console.log("called");

			var type = "danger";
			var message = "There is an error with your form.<br> Please try again.";



			$('form[name="'+formName+'"] .error-message-container').html('<div class="alert-message alert-message--'+type+'"><p>'+message+'</p><a href="/#" class="dismiss-alert">Dismiss</a></div>');
		    
			// Dismiss Alert
			$('.dismiss-alert').on('click', function() {
				$('.alert-message').removeClass('alert-message--success, alert-message--warning, alert-message--danger');
				$('.error-message-container').html('');
				return false;
			})
		},



	}


	

})