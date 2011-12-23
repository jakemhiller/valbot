var Command = require("../lib/command.js").Command;
var scraper = require('scraper');

urbanMessage = function(room, message) {
  if(Command.getMatch('urban', message.body)) {
    console.log('urban');
    term = Command.filterMessage('urban', message.body);
    var url = "http://www.urbandictionary.com/define.php?term=" + escape(term);
    scraper(url, function(err, $) {
        if (err) {
            throw err;
        }

        if ($('div#not_defined_yet').length > 0) {
            room.speak(term + ' is not defined on urbandictionary.com.', function(error, response) {

            });
        }
        else if($('div.definition').length > 0) {
            word = $('td.word').first().text().replace(/\r|\n/, " ");
            definition = $('div.definition').first().text().replace(/\r|\n/, " ");
            //link = "http://www.urbandictionary.com/define.php?term="+escape(term);

        	var urbanDef = word + ': ' + definition;

	        room.speak(urbanDef,
	        function(error, response) {
	            room.speak(url,
	            function(error, response) {

	                });
	        });
		}

    });
  };
};

initialize = function(val) {
  val.on('TextMessage', urbanMessage);
};

module.exports.initialize = initialize;

