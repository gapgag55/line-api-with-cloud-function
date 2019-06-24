const mock = require('../mock.js');
const { client } = require('../config/line');
const { textMessage, imageMessage, videoMessage } = require('../message');

function messageEvent(event) {
  client.pushMessage(event.source.userId, textMessage(mock.text));
}

// function imageHandle(event) {
//   client.pushMessage(event.source.userId, imageMessage(mock.image.originalContentUrl, mock.image.previewImageUrl));
// }

// function videoHandle(event) {
//   client.pushMessage(event.source.userId, videoMessage(mock.video.originalContentUrl, mock.video.previewImageUrl));
// }

module.exports = messageEvent;