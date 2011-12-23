// npm install n-vimeo
var Command = require("../lib/command.js").Command;
var rest = require('restler');

vimeoMessage = function(msg, room) {
    code = Command.filterMessageVimeo(msg.body);

    url  = 'http://vimeo.com/api/v2/video/'+code+'.json'
    console.log('URL:'+url);

    rest.get(url).on('complete', function(data) {
      var thumb = data[0].thumbnail_large

      room.speak(thumb, function(error, response) {
        console.log('Thumbnail not found'+response)
      });
    });
};


initialize = function(val) {
  //val.on('TextMessage', vimeoMessage);
};

module.exports.initialize = initialize;