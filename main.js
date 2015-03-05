var client = new WebTorrent();
console.log('Client created.');
client.seed("some content", function onTorrent (torrent) {
  // Client is seeding the file!
  console.log('Torrent info hash:', torrent.infoHash)
})
