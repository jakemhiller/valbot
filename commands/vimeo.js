var Command = require("../lib/command.js").Command;
var rest = require('restler');

vimeoMessage = function(room, message) {
  if(Command.getMatchVimeo(message.body)) {
    code = Command.filterMessageVimeo(message.body);

    url  = 'http://vimeo.com/api/v2/video/'+code+'.json'
    // console.log('URL:'+url);

    rest.get(url).on('complete', function(data) {
      // Thumbnail image
      var thumb = data[0].thumbnail_large;
      room.speak(thumb, function(error, response) {
        // console.log('Thumbnail found'+response)
      });

      // Title + Link
      var titleData = data[0].title;
      var title = titleData+" - "+message.body;

      room.speak(title, function(error, response) {
        // console.log('Thumbnail found'+response)
      });
    });
  };
};


initialize = function(val) {
  val.on('TextMessage', vimeoMessage);
};

module.exports.initialize = initialize;