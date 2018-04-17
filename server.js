const express = require('express');
const path = require('path');
const PromiseRouter = require('express-promise-router');
const AMPtoPWA = require('./03-amp-to-pwa/hub/dist/server').default;

const app = express();
const router = new PromiseRouter();
const ampToPwaRouter = new PromiseRouter();
const render = (body) => `
  <!doctype html>
  <html>
    <head>
      <title>AMP + PWA Hub</title>
    </head>
    <body>
      <div id="root">
        ${ body }
      </div>
      <script src="./hub/dist/client.js"></script>
    </body>
  </html>
`;


// Static service for AMP-only implementations
app.use(express.static(
  path.join(__dirname, '01-simple-amp-article'),
));

app.use(express.static(
  path.join(__dirname, '02-amp-with-pwa'),
));

// dynamic service for full-featured PWAs
ampToPwaRouter
  .get('/hub', async (req, res) => res.send(
    render(AMPtoPWA)
  ))
  .get('/hub/dist/client.js', async (req, res) => res.sendFile(
    path.join(__dirname, '03-amp-to-pwa/hub/dist/client.js')
  ))
  .get('/article', async (req, res) => res.sendFile(
    path.join(__dirname, '03-amp-to-pwa/article.amp.html')
  ))
  .get('/serviceworker.js', async (req, res) => res.sendFile(
    path.join(__dirname, '03-amp-to-pwa/serviceworker.js')
  ))
  .get('/manifest.json', async (req, res) => res.sendFile(
    path.join(__dirname, '03-amp-to-pwa/manifest.json')
  ))
  .get('/related_articles.json', async (req, res) => res.sendFile(
    path.join(__dirname, '03-amp-to-pwa/related_articles.json')
  ));

router.use(
  '/03-amp-to-pwa',
  ampToPwaRouter
);

app.use(router);

app.listen('8080', () => console.log('Serving AMP + PWA examples on port 8080'));