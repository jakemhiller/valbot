var Command = function(command) {
  this.command = command;
};

// Actions

Command.getMatch = function(keyword, text) {
  pattern = '^\/'+keyword+'(.*)';
  re = new RegExp(pattern);
  return text.match(re);
};

Command.filterMessage = function(keyword, text) {
  pattern = '^\/'+keyword+' ';
  re = new RegExp(pattern);
  return text.replace(re, '');
};

Command.getRandom = function(objects) {
  count = objects.length;
  number = Math.floor(Math.random() * count + 1 );
  return number;
};

// Special Actions -----------------------

//VIMEO
Command.getMatchVimeo = function(text) {
  pattern = 'http://vimeo\.com\/(\d|\w)*';
  re = new RegExp(pattern);
  return text.match(re);
};

Command.filterMessageVimeo = function(text) {
  pattern = 'http\:\/\/vimeo\.com\/';
  re = new RegExp(pattern)
  return text.replace(re, '');
};

exports.Command = Command;
