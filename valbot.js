var sys = require('sys'),
    events = require('events');

var Val = function(instance, room_id) {
  this.room_id = room_id;
  this.instance = instance;
};

sys.inherits(Val, events.EventEmitter);

Val.prototype.init = function(room) {
  var commands = this.commands;
  room.listen(function(message){
    for(command in commands[message.type]) {
      self.emit(message.type, room, message);
    };
  })
};

module.exports = Val;
