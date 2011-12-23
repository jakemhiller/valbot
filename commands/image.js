var Command = require("../lib/command.js").Command;
var scraper = require('scraper');

imageMessage = function(msg, room, safesearch) {

    term = Command.filterMessage('image', msg.body);

    if (safesearch == true) {
      url = 'http://www.google.com/images?as_q='+term+'&um=1&hl=en&biw=1536&bih=983&gbv=1&sout=1&output=search&tbs=isch:1,isz:lt,islt:qsvga,ift:jpg&btnG=Google+Search&as_epq=&as_oq=&as_eq=&as_sitesearch=&as_st=y';
    }
    else
    {
      url = 'http://www.google.com/images?as_q='+term+'&um=1&hl=en&biw=1536&bih=983&gbv=1&sout=1&output=search&tbs=isch:1,isz:lt,islt:qsvga,ift:jpg&btnG=Google+Search&as_epq=&as_oq=&as_eq=&safe=off&as_sitesearch=&as_st=y'
    }

    scraper(url, function(err, $) {
      if (err) {throw err;}

      image = $('.images_table td a').eq(Command.getRandom($('.images_table td a')));

      var imageURL = image.attr('href').match(/imgres[\?]imgurl=(.*?)[\&]imgrefurl/).pop();

      imageURL.replace('%2520', '%20');

      room.speak(imageURL, function(error, response) {
        // console.log("Image Message sent:" + response.msg.created_at + ".");
      });

    });
};

initialize = function(val) {
  //val.on('TextMessage', imageMessage);
};

module.exports.initialize = initialize;