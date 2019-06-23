const line = require('@line/bot-sdk');

const lineLogin = {
  channelId: '1591386978',
  channelSecret: '530254a074e37f93a067c66ae1dea5f9'
};

const messaging = {
  channelAccessToken: 'mb2h9AU7u+VRJ7yDAsX9UhdpGEgb0JUMNrVGd7rJlMvwEVZsRRWGMd9KctMUUJO7e7/1yfURhU+3mSwyooyTPBf20gGDJZ2BICaZopgEZplxiqKB8G7ZKvIwSt3VYgukHHPo6FNhCtLZhVjszp/2FAdB04t89/1O/w1cDnyilFU=',
  channelSecret: '35132dad74990b001076a8c4a6f8cc67'
};

module.exports = {
  client: new line.Client(messaging),
  middleware: line.middleware(messaging),
  lineLogin,
};