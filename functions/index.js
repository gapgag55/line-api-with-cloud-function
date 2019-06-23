const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const routes = require('./routes');

const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));
app.use(bodyParser.json());

// Register entire routes
routes(app);

// Expose Express API as a single Cloud Function:
exports.nipa = functions.https.onRequest(app);