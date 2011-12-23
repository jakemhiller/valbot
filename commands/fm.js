var Command = require("../lib/command.js").Command;
//var scraper = require('scraper');

fmMessage = function(room, message) {
  if(message.body.match(/\/fm/)) {
    room.speak('fm command is not implemented yet');
  };
};

initialize = function(val) {
  val.on('TextMessage', fmMessage);
};


module.exports.initialize = initialize;