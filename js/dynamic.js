function zoom() {
	if ( $(window).width() < 480 ) {
		var zoom = $(window).width()/480;
	}
	else {
		var zoom = 1;
	}
	$('body').css({
		'zoom': zoom
	});
}
$(document).ready(function() {
	$('#slider').custom_slider({
		interval: 7000,
		duration: 1000				
	});
	$('#rb table.price tr:last-child td, #lb .change table tr:last-child td').css({'border-bottom-width': '0'});
	$('#lb .contacts ul li:last-child').css({'margin': '0'});
	if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		$('body').addClass('mobile');
		$('body').append('<button class="dropmenu">Menu</button>');
		$('.dropmenu').bind('click', function() {
			$('#menu').stop(true,true).slideToggle(0);
		});
		$('html').click(function() {
			$('#menu').stop(true,true).hide();
		});
		$('#menu, .dropmenu').click(function(event){
			event.stopPropagation();
		});
		zoom();
	}
});
$(document).resize(function() {
	if ( $('.mobile').length > 0 ) {
		zoom();
	}
});