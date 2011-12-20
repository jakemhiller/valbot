var Command   = require("../valbot/lib/command.js").Command;
var Campfire  = require("campfire").Campfire;

var config    = require("../valbot/config.js");

require("../valbot/commands/fm.js");
require("../valbot/commands/image.js");
require("../valbot/commands/vimeo.js");
require("../valbot/commands/lol.js");
require("../valbot/commands/urban.js");

var room_id = config.room_id;

var instance = new Campfire({
  ssl     : config.ssl,
  token   : config.token,
  account : config.account,
});

safesearch = false;

instance.join(room_id, function(error, room) {
  room.listen(function(message) {
    try
    {
      if (Command.getMatch('image', message.body, safesearch)) {
        imageMessage(message, room);
      }
      else if (Command.getMatch('fm', message.body)) {
        fmMessage(message, room);
      }
      else if (Command.getMatchVimeo(message.body)) {
        vimeoMessage(message, room);
      }
      else if (Command.getMatch('lol', message.body)) {
        lolMessage(message, room);
      }
      else if (Command.getMatch('urban', message.body)) {
        urbanMessage(message, room);
      }
       else {
        console.log("Received unknown message:");
        console.log(message);
      };
    }
    catch(err)
    {
      console.log(err);
    };
  });
});
