var Command   = require("../valbot/lib/command.js").Command;
var Campfire  = require("campfire").Campfire;
var Val       = require("./valbot.js")
var fs        = require("fs");

var config    = require("../valbot/config.js");

var commandPath = './commands/';

function bootCommands(val) {
  fs.readdir(commandPath, function(err, files) {
    if (err) throw err;
    files.forEach(function(file) {
      bootCommand(file, val);
    });
  });
};

function bootCommand(file, room) {
  var command = require(commandPath + file);
  command.initialize(val);
};

var room_id = config.room_id;

var instance = new Campfire({
  ssl     : config.ssl,
  token   : config.token,
  account : config.account,
});

var val = new Val(instance, room_id);

bootCommands(val);

instance.join(room_id, function(error, room) {
  val.init(room);
});
