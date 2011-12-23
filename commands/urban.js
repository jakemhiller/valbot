var Command = require("../lib/command.js").Command;
var scraper = require('scraper');

urbanMessage = function(msg, room) {
  console.log('urban');
  term = Command.filterMessage('urban', msg.body);
    scraper("http://www.urbandictionary.com/define.php?term="+term, function(err, $) {
      if (err) {throw err;}

      if ($('div.definition').length > 0) {
        word = $('td.word').first().text().replace(/\r|\n/," ");
        definition = $('div.definition').first().text().replace(/\r|\n/," ");
        link = "http://www.urbandictionary.com/define.php?term="+term;
      }

      var urbanDef = word+': '+definition;

      room.speak(urbanDef, function(error, response) {
        room.speak(link, function(error, response) {

        });
      });

    });

};

initialize = function(val) {
  val.on('TextMessage', urbanMessage);
};

module.exports.initialize = initialize;

