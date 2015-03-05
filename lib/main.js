var WebTorrent = require('webtorrent');
var tmpFs;
var client = new WebTorrent();
document.onDocumentReady = function () {
  document.getElementById('seed').onclick = seed;
}

function seed() {
    var blob = new Blob(['Lorem Ipsum'], {type: 'text/plain'});
    client.seed(blob, {name: 'test.txt'}, function onTorrent (torrent) {
      // Client is seeding the file!
      console.log('Torrent info hash:', torrent.infoHash)
    })
}

function onInitFs(fs) {
  console.log('Opened file system: ' + fs.name);
  console.log('Client created.');
  tmpFs = fs;
  seed();
}
function errorHandler(e) {
  var msg = '';
  switch (e.code) {
    case FileError.QUOTA_EXCEEDED_ERR:
      msg = 'QUOTA_EXCEEDED_ERR';
      break;
    case FileError.NOT_FOUND_ERR:
      msg = 'NOT_FOUND_ERR';
      break;
    case FileError.SECURITY_ERR:
      msg = 'SECURITY_ERR';
      break;
    case FileError.INVALID_MODIFICATION_ERR:
      msg = 'INVALID_MODIFICATION_ERR';
      break;
    case FileError.INVALID_STATE_ERR:
      msg = 'INVALID_STATE_ERR';
      break;
    default:
      msg = 'Unknown Error';
      break;
  };
  console.log('Error: ' + msg);
}

window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;

window.requestFileSystem(window.TEMPORARY, 5*1024*1024 /*5MB*/, onInitFs, errorHandler);


