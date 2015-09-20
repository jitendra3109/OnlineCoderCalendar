$(document).ready(function() {
	var req = new XMLHttpRequest();
	req.open("GET", "http://contesttrackerapi.herokuapp.com/", false);
	req.send();
	var jsonData = JSON.parse(req.responseText);

	for ( i = 0; i < jsonData["result"]["upcoming"].length; i++ ) {
		var temp = jsonData["result"]["upcoming"][i];  
		$('.upcoming').append("<div class=\"post-preview\"><a href=\""+temp.url+"\"><h2 class=\"post-title\">"+temp.Name+"</h2><h3 class=\"post-subtitle\">"+temp["Duration"]+"</h3></a><p class=\"post-meta\">Hosted by "+temp.Platform+"  | Starts: "+temp.StartTime+"</p><hr>");
	}
});
