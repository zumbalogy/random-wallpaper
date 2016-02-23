var http = require('http');
var exec = require('child_process').exec;
function puts(error, stdout, stderr) { console.log(stdout) }

var img_file = "/tmp/script-wallpaper.jpg";

var options = {
  host: 'images.search.yahoo.com',
  path: '/search/images?p=bears+with+beaks'
}

function callback(response) {
  var str = '';

  response.on('data', function (chunk) {
    str += chunk;
  });

  response.on('end', function () {
    var raw_urls = str.match(/imgurl=.+?&/g);
    var clean_urls = raw_urls.map(function(url) {
      return url.substring(7, url.length - 1);
    });
    var urls = clean_urls.map(decodeURIComponent);
    var randPick = Math.floor((urls.length - 1) * Math.random());
    var url = urls[randPick];
    exec('curl ' + url + ' > ' + img_file, puts);
    exec('gsettings set org.cinnamon.desktop.background picture-uri "file://' + img_file + '"', puts);
  });
}

setInterval(function() {
  http.request(options, callback).end();
}, 5000)
