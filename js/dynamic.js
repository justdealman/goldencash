$(document).ready(function() {
	$('#slider').custom_slider({
		interval: 7000,
		duration: 1000				
	});
	$('#rb table.price tr:last-child td, #lb .change table tr:last-child td').css({'border-bottom-width': '0'});
	$('#lb .contacts ul li:last-child').css({'margin': '0'});
});