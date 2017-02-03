var request = require('request');


// Extract URLs from a string
var findUrls = (text) => {
  var source = (text || '').toString();
  var urlArray = [];
  var url;
  var matchArray;
  // Regular expression to find FTP, HTTP(S) and email URLs.
  var regexToken = /(((ftp|https?):\/\/)[\-\w@:%_\+.~#?,&\/\/=]+)|((mailto:)?[_.\w-]+@([\w][\w\-]+\.)+[a-zA-Z]{2,3})/g;
  // Iterate through any URLs in the text.
  while( (matchArray = regexToken.exec( source )) !== null ) {
      var token = matchArray[0];
      urlArray.push( token );
  }
  return urlArray;
}

// make API requests as a proxy for the front end
var externalRequest = {
  // link preview api (http://www.linkpreview.net/)
  linkPreview: function(target) {
    request({
      uri: 'http://www.linkpreview.net/',
      qs: {
        key: '58938a7d097b0590f713356c5c1fb7d74a0e589166b5a',
        q: target
      }
    }, function(err, res, body) {
      if (err) {return console.log(err);}
      return res;
    })
  }
}


exports.externalRequest = externalRequest;
exports.findUrls = findUrls;