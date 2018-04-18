const express = require('express');
const path = require('path');
const PromiseRouter = require('express-promise-router');
const webPush = require('web-push');
const { html, css } = require('./03-amp-to-pwa/hub/dist/server');

const app = express();
const router = new PromiseRouter();
const ampToPwaRouter = new PromiseRouter();
const { publicKey, privateKey } = webPush.generateVAPIDKeys();
const render = (body, styles) => `
  <!doctype html>
  <html>
    <head>
      <title>AMP + PWA Hub</title>
      <style>
        ${styles}
      </style>
    </head>
    <body>
      <div id="root">
        ${body}
      </div>
      <script src="./hub/dist/client.js"></script>
    </body>
  </html>
`;

// Set up push notifications
webPush.setVapidDetails(
  'http://localhost:8080',
  publicKey,
  privateKey,
);

app.get('/key', async (req, res) => res.send(publicKey));

app.post('/push-notify', async (req, res) => {
  const { subscription } = req.body;
  const payload = null;

  await webPush.sendNotification(subscription, payload);

  res.sendStatus(201);
});

// Static service for AMP-only implementations
app.use(express.static(path.join(__dirname, '01-simple-amp-article')));

app.use(express.static(path.join(__dirname, '02-amp-with-pwa')));

// dynamic service for full-featured PWAs
ampToPwaRouter
  .get(
    '/hub',
    async (req, res) => res.send(render(html, css)),
  )
  .get(
    '/hub/dist/client.js',
    async (req, res) => res.sendFile(path.join(__dirname, '03-amp-to-pwa/hub/dist/client.js')),
  )
  .get(
    '/article',
    async (req, res) => res.sendFile(path.join(__dirname, '03-amp-to-pwa/article.amp.html')),
  )
  .get(
    '/serviceworker.js',
    async (req, res) => res.sendFile(path.join(__dirname, '03-amp-to-pwa/serviceworker.js')),
  )
  .get(
    '/manifest.json',
    async (req, res) => res.sendFile(path.join(__dirname, '03-amp-to-pwa/manifest.json')),
  )
  .get(
    '/related_articles.json',
    async (req, res) => res.sendFile(path.join(__dirname, '03-amp-to-pwa/related_articles.json')),
  );

router.use(
  '/03-amp-to-pwa',
  ampToPwaRouter,
);

app.use(router);

/* eslint-disable no-console */
app.listen('8080', () => console.log('Serving AMP + PWA examples on port 8080'));
