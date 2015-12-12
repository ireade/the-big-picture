app.factory('AlertMessage', function() {


	return  {

		invalidForm: function(formName) {

			var type = "danger";
			var message = "There is an error with your form.<br> Please try again.";

			$('form[name="'+formName+'"] .error-message-container').html('<div class="alert-message alert-message--'+type+'"><p>'+message+'</p><a href="/#" class="dismiss-alert">Dismiss</a></div>');
		    
			// Dismiss Alert
			$('.dismiss-alert').on('click', function() {
				$('.alert-message').removeClass('alert-message--success alert-message--warning alert-message--danger');
				$('.error-message-container').html('');
				return false;
			})
		},

		taskCompleteSound: function() {

			var audio = document.getElementById('notificationSoundComplete');
			audio.play();
		},

		sidePopup: function(type, message) {

			$('.popup-message').addClass('open');
			$('.popup-message').addClass('popup-message--'+type);
			$('.popup-message').html(message);


			setTimeout(function(){ 
				$('.popup-message').removeClass('open popup-message--success popup-message--warning popup-message--danger');
				$('.popup-message').html('');

			 }, 2000);

		}



	}


	

})