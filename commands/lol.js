var Command = require("../lib/command.js").Command;
var http = require('http');
var url = require('url');

lolMessage = function(msg, room) {

    var term = Command.filterMessage('lol', msg.body);
    var gifUrl = "http://lol.jaykillah.net/tmp/" + term + ".gif";
    var siteUrl = url.parse(gifUrl);

	//DEBUG
	//console.log('REQUEST:');
	//console.log(siteUrl);
	
	var requestOptions = {
		host: siteUrl.host,
		port: siteUrl.port,
		path: siteUrl.pathname,
		method: "GET"
	}
	
	var site = http.request(requestOptions, function(request){
		//console.log('!STATUS: '+ request.statusCode);
	});
	site.on('response', function(httpResponse){
		//DEBUG
		//console.log('STATUS: %s', httpResponse.statusCode);
		if(httpResponse.statusCode == 200){
			//DEBUG
			console.log('should speak %s now', siteUrl.href);
			room.speak(siteUrl.href, function(error, response){
				//console.log("image message sent: %s.", response.msg.created_at);
			});
		} else {
			room.speak('Sorry, I couldn\'t find the GIF '+term+'.gif.', function(error, response){
				//console.log("couldn't find GIF %s.gif", term);
			});
		}
	});
	site.on('error', function(e){
		console.log('Problem with request: ' + e.message);
	});
	site.end();
    //room.speak("http://lol.jaykillah.net/tmp/"+term+".gif", function(error, response) {
    // console.log("Image Message sent:" + response.msg.created_at + ".");
    //});
};