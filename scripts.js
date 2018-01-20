$(function() {
	
	var location;
	
	$.getJSON("https://ipinfo.io", function(pos) {
		location = pos.loc;
	});
});