var Command = require("../lib/command.js").Command;

lolMessage = function(msg, room) {

  term = Command.filterMessage('lol', msg.body);

    room.speak("http://lol.jaykillah.net/tmp/"+term+".gif", function(error, response) {
      // console.log("Image Message sent:" + response.msg.created_at + ".");
    });

};