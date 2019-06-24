const fetch = require('node-fetch');
const qs = require('qs');
const { lineLogin, middleware } = require('./config/line');
const { messageEvent } = require('./events');

function webhook(req, res) {
  const { events } = req.body;
  console.log(events);
  Promise
    .all(events.map(event => eventHandle(event)))
    .then(result => res.status(200).send('success'))
    .catch(error => res.status(500).send('No sending message'));
}

function eventHandle(event) {
  switch (event.type) {
    case 'message':
    case 'text':
      messageEvent(event);
      // imageHandle(event);
      // videoHandle(event);
      break;
    default: break;
  }

  return true;
}

function auth(req, res) {
  // console.log(req.body);

  // Step1: User goes to "https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1591386978&redirect_uri=https://us-central1-lineoa-celeb.cloudfunctions.net/nipa/auth&state=12345abcde&scope=openid%20profile&nonce=09876xyz"

  // Step2: Get code from Step 1 via redirect URL [GET]
  const code = req.query.code;

  // Step3: Redirect URL sends code to get accessToken [POST] https://api.line.me/oauth2/v2.1/token grant_type, client_id, client_secret, code, redirect_uri
  const data = {
    grant_type: 'authorization_code',
    client_id: lineLogin.channelId,
    client_secret: lineLogin.channelSecret,
    code,
    redirect_uri: 'https://us-central1-lineoa-celeb.cloudfunctions.net/nipa/auth'
  };

  fetch('https://api.line.me/oauth2/v2.1/token', {
    method: 'post',
    body: qs.stringify(data),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })
  .then(res => res.json())
  .then(response => {
    const { access_token } = response;
    req.body.accessToken = access_token;
    profile(req, res);
    return true;
  })
  .catch(error => res.send(error));
}

function profile(req, res) {
  const { accessToken  } = req.body;

  // Step 4: Get user profile GET https://api.line.me/v2/profile Authorization: Bearer {access token}
  fetch('https://api.line.me/v2/profile', {
    headers: { 'Authorization': `Bearer ${accessToken}` },
  })
  .then(res => res.json())
  .then(response => {
    const { userId } = response;
    res.send(userId);
    return true;
  })
  .catch(error => res.json(error));

  // Step 5: Done!
}

module.exports = function(app) {
  app.post('/webhook', webhook);
  app.post('/profile', profile);
  app.get('/auth', auth);
  // app.post('/webhook', middleware, webhook);
}