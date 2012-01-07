var Command = require("../lib/command.js").Command;

fmMessage = function(room, message, term) {
    room.speak('fm command is not implemented yet');
};

initialize = function(val) {
    val.on('fm', fmMessage);
};


module.exports.initialize = initialize;
