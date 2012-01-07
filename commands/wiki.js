var Command = require("../lib/command.js").Command;
var rest = require('restler');
var $ = require('jquery');

wikiMessage = function(room, message, term) {

  var url = "http://en.wikipedia.org/w/api.php?action=opensearch&limit=1&namespace=0&format=xml&search="+ escape(term);

  rest.get(url).on('complete', function(data) {

    var word = $(data).find("Text").text();
    var description = $(data).find("Description").text();
    var image = $(data).find("Image").attr('source');

    if (description.match('may refer to\:')) {
      var wordUrl = $(data).find("Url").text();
      room.speak('Nope, can\'t find \'' +term+'\', try: '+wordUrl, function(error, response) {
        // console.log(response)
      });
    }
    else if (word) {
      room.speak(word+': '+description, function(error, response) {
        // console.log(response)
      });
    }
    else {
      room.speak('Sorry, there is no wikipedia entry for '+term, function(error, response) {
        // console.log(response)
      });
    }
  });
};

initialize = function(val) {
  val.on('wiki', wikiMessage);
};

module.exports.initialize = initialize;

