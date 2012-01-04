var http      = require('http');
var url       = require('url');

var config    = require("../config.js");

lolMessage = function(room, message, term) {
    var gifUrl = config.lolFolder + term + ".gif";
    var siteUrl = url.parse(gifUrl);

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
  		if(httpResponse.statusCode == 200){
  			room.speak(siteUrl.href, function(error, response){
  			  console.log("image message sent: %s.", response.msg.created_at);
  			});
  		} else {
  			room.speak('Sorry, I couldn\'t find the GIF '+term+'.gif.', function(error, response){
  				console.log("couldn't find GIF %s.gif", term);
  			});
  		}
  	});
  	site.on('error', function(e){
  		console.log('Problem with request: ' + e.message);
  	});
  	site.end();
};

initialize = function(val) {
  val.on('lol', lolMessage);
};

module.exports.initialize = initialize;
