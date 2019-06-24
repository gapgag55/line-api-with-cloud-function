const { client } = require('../config/line');
const mock = require('../mock.js');
const { textMessage, imageMessage, videoMessage } = require('../message');

function messageEvent(event) {
  client.pushMessage(event.source.userId, textMessage(mock.text));
}

module.exports = messageEvent;

// function imageHandle(event) {
//   client.pushMessage(event.source.userId, imageMessage(mock.image.originalContentUrl, mock.image.previewImageUrl));
// }

// function videoHandle(event) {
//   client.pushMessage(event.source.userId, videoMessage(mock.video.originalContentUrl, mock.video.previewImageUrl));
// }