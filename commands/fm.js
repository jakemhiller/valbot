var config    = require("../config.js");
var shorturl  = require('shorturl');
var rest      = require('restler');
var $         = require('jquery');

var results   = require('../fm.json');

fmMessage = function(room, message, term) {

  console.log(results.users);

    $.each(results.users, function() {

    console.log($(this)[0].nickname);

    user = $(this)[0];
    pattern = user.nickname+'(.*)';
    re = new RegExp(pattern, 'i');

    if (term.match(re, '')) {
      var name = $(this)[0].nickname;
      url = 'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user='+user.username+'&api_key='+config.lastfm;
      rest.get(url).on('complete', function(data) {

        var nowplaying = $(data).find("track").attr('nowplaying');

        if (nowplaying == 'true') {
          console.log('Track currently playing')

          var track = $(data).find('track').eq(1);
          var artist = track.children('artist').text();
          var trackName = track.children('name').text();
          var artistUrl = track.children('url').text();

          shorturl(artistUrl, function(result) {
            var currentTrack = artist+': '+trackName+' '+result;

            room.speak(currentTrack, function(error, response) {

            });
          });

        }
        else
        {
          console.log('No track playing')
          var tracks = $(data).find("track");
          var list = '';

          tracks.each(function() {
            var track = $(this);
            var artist = track.children('artist').text();
            var trackName = track.children('name').text();
            var artistUrl = track.children('url').text();
            var result = artist+': '+trackName+'\n';
            list += result;
          });
          var pre = name+'\'s last ten tracks:';

          room.paste(pre+'\n\n'+list, function(error, response) {

          });
        };

      });

      console.log('match: '+term);

    };
  });
};

initialize = function(val) {
    val.on('fm', fmMessage);
};


module.exports.initialize = initialize;
