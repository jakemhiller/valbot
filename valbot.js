var sys = require('util'),
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
  room.listen(function(message){
    self.emit(message.type, room, message);
  })
};

module.exports = Val;
