import JssProvider from 'react-jss/lib/JssProvider';
import React from 'react';
import { StaticRouter } from 'react-router';
import { renderToString } from 'react-dom/server';
import { SheetsRegistry } from 'react-jss/lib/jss';
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName,
} from 'material-ui/styles';
import App from './app.jsx';

const sheetsRegistry = new SheetsRegistry();
const theme = createMuiTheme();
const generateClassName = createGenerateClassName();

const render = (body, styles) => `
  <!doctype html>
  <html>
    <head>
      <title>AMP + PWA Hub</title>
      <script async src="https://cdn.ampproject.org/shadow-v0.js"></script>
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

const ServerApp = () =>
  <JssProvider
    generateClassName={ generateClassName }
    registry={ sheetsRegistry }>
    <MuiThemeProvider theme={ theme } sheetsManager={ new Map() }>
      <StaticRouter basename='/04-amp-in-pwa' context={ {} }>
        <App />
      </StaticRouter>
    </MuiThemeProvider>
  </JssProvider>;

const html = renderToString(<ServerApp/>);
const css = sheetsRegistry.toString();

export default render(html, css);
