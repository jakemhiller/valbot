var Command = require("../nodevalbot/lib/command.js").Command;
var Campfire = require("campfire").Campfire;

require("../nodevalbot/commands/fm.js");
require("../nodevalbot/commands/image.js");
require("../nodevalbot/commands/vimeo.js");
require("../nodevalbot/commands/lol.js");
require("../nodevalbot/commands/urban.js");

var room_id = roomnumber;

var instance = new Campfire({
  ssl     : true,
  token   : "token",
  account : "site name",
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