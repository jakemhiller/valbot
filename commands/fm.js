var Command = require("../lib/command.js").Command;
//var scraper = require('scraper');

fmMessage = function(room, message) {
  if(Command.getMatch('fm', message.body)) {
    room.speak('fm command is not implemented yet');
  };
};

initialize = function(val) {
  val.on('TextMessage', fmMessage);
};


module.exports.initialize = initialize;