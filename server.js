const express = require('express');
const path = require('path');
const PromiseRouter = require('express-promise-router');


const app = express();

app.use(express.static(
  path.join(__dirname, '01-simple-amp-article'),
));

app.use(express.static(
  path.join(__dirname, '02-amp-with-pwa'),
));

app.listen('8080', () => console.log('Serving AMP + PWA examples on port 8080'));
