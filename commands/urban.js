var Command = require("../lib/command.js").Command;
var rest = require('restler');

urbanMessage = function(room, message, term) {
  // The iphone formatted search page returns JSON, yay!
  var url = "http://www.urbandictionary.com/iphone/search/define?term=" + escape(term);

  rest.get(url).on('complete', function(data) {

    if (data.result_type == 'exact') {
      urban_result = data.list[1].word +': '+ data.list[1].definition + data.list[1].permalink;
    }
    else
    {
      urban_result = "Sorry, there is no Urban Dictionary definition for "+term;
    };

    room.speak(urban_result, function(error, response) {

    });
  });
};

initialize = function(val) {
  val.on('urban', urbanMessage);
};

module.exports.initialize = initialize;

