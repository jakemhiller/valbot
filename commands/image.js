var Command = require("../lib/command.js").Command;
var rest = require('restler');

var config    = require("../config.js");

var safesearch = config.safesearch;

imageMessage = function(room, message, safesearch) {
  if(Command.getMatch('image', message.body)) {

    term = Command.filterMessage('image', message.body);

    var url = "http://api.bing.net/json.aspx?"

            // Common request fields (required)
            + "AppId=" + config.bing
            + "&Query=" + encodeURI(term)
            + "&Sources=Image"

            // Common request fields (optional)
            + "&Version=2.0"
            + "&Market=en-us"

            if (safesearch == false) {
              + "&Adult=Off"
            }
            else
            {
              + "&Adult=Moderate"
            }

            // Image-specific request fields (optional)
            + "&Image.Count=15"
            + "&Image.Offset=0";

    rest.get(url).on('complete', function(data) {
      var randomImage = Command.getRandom(data.SearchResponse.Image.Results)

      // console.log('data:'+ data.SearchResponse.Image.Results[randomImage].MediaUrl);

      var imageUrl = data.SearchResponse.Image.Results[randomImage].MediaUrl;

      room.speak(imageUrl, function(error, response) {
        // console.log('Image found'+response)
      });
    });

  };
};

initialize = function(val) {
  val.on('TextMessage', imageMessage);
};

module.exports.initialize = initialize;