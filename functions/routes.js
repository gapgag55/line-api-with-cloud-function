const { client, middleware } = require('./line');
const { textMessage, imageMessage, videoMessage } = require('./message');
const mock = require('./mock.js');

function webhook(req, res) {
  const { events } = req.body;

  Promise
    .all(events.map(event => eventHandle(event)))
    .then(result => res.status(200).send('success'))
    .catch(error => res.status(500).send('No sending message'));
}

function eventHandle(event) {
  switch (event.type) {
    case 'message':
    case 'text':
      messageHandle(event);
      imageHandle(event);
      videoHandle(event);
      break;
    default: break;
  }

  return true;
}

function messageHandle(event) {
  client.pushMessage(event.source.userId, textMessage(mock.text));
}

function imageHandle(event) {
  client.pushMessage(event.source.userId, imageMessage(mock.image.originalContentUrl, mock.image.previewImageUrl));
}

function videoHandle(event) {
  client.pushMessage(event.source.userId, videoMessage(mock.video.originalContentUrl, mock.video.previewImageUrl));
}

module.exports = function(app) {
  app.post('/webhook', webhook);
  // app.post('/webhook', middleware, webhook);
}