// https://images.search.yahoo.com/search/images?p=birds+with+arms
// https://images.search.yahoo.com/images/view;_ylt=AwrB8qBrgMxWlB4AWgKJzbkF;_ylu=X3oDMTIyOWM5ZnAxBHNlYwNzcgRzbGsDaW1nBG9pZAM1ZmIwOTA5MTAzMGEwN2I3MWM1NmNjYjI2NzlkMjYyZARncG9zAzYEaXQDYmluZw--?.origin=&back=https%3A%2F%2Fimages.search.yahoo.com%2Fsearch%2Fimages%3Fp%3Dbirds%2Bwith%2Barms%26tab%3Dorganic%26ri%3D6&w=620&h=496&imgurl=www.clickypix.com%2Fwp-content%2Fuploads%2F2013%2F08%2Fbirds-with-freaky-human-arms-27.jpg&rurl=http%3A%2F%2Fwww.clickypix.com%2Fbirds-freaky-human-arms-44-pictures%2F&size=77.2KB&name=posted+in+funny+pictures+tagged+%3Cb%3Ebirds%3C%2Fb%3E+%3Cb%3Earms%3C%2Fb%3E+%3Cb%3Ebirds+with+arms%3C%2Fb%3E+freaky&p=birds+with+arms&oid=5fb09091030a07b71c56ccb2679d262d&fr2=&fr=&tt=posted+in+funny+pictures+tagged+%3Cb%3Ebirds%3C%2Fb%3E+%3Cb%3Earms%3C%2Fb%3E+%3Cb%3Ebirds+with+arms%3C%2Fb%3E+freaky&b=0&ni=130&no=6&ts=&tab=organic&sigr=11t0q6bnc&sigb=12glrvgkg&sigi=12grjbclc&sigt=12mf0df14&sign=12mf0df14&.crumb=VQ24.W5pMAY&
//
//
// http://www.clickypix.com/wp-content/uploads/2013/08/birds-with-freaky-human-arms-27.jpg

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


// TODO, try to get large images from yahoo
