app.factory('LoadingAnm', function() {
	return {
		show: function() {
			$('.loading-animation-container').show();
		},
		hide: function() {
			$('.loading-animation-container').hide();
		},
		withinPageHide: function() {
			$('.main-initial-hidden').show();
			$('.loading-animation-in-page').hide()
		}
	}
})