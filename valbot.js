var sys = require('sys'),
    events = require('events');

var Val = function(instance, room_id) {
  
  this.room_id = room_id;
  this.instance = instance;

  events.EventEmitter.call(this);
  
};

Val.super_ = events.EventEmitter;
Val.prototype = Object.create(events.EventEmitter.prototype, {
    constructor: {
        value: Val,
        enumerable: false
    }
});

Val.prototype.init = function(room) {
  var self = this;
  self.on('TextMessage', self.command);
  room.listen(function(message){
    self.emit(message.type, room, message);
  })
};

Val.prototype.command = function(room, message) {
  var re = /^\/([^\s]*) (.*)/;
  console.log(message.body);
  if(matches = message.body.match(re)) {
    var command = matches[1];
    var arguments = matches[2];
    self.emit(command, arguments);
  }
};

module.exports = Val;
