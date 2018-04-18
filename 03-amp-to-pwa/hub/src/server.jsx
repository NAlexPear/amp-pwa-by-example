import JssProvider from 'react-jss/lib/JssProvider';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { SheetsRegistry } from 'react-jss/lib/jss';
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName,
} from 'material-ui/styles';
import { Page } from './components';

const sheetsRegistry = new SheetsRegistry();
const theme = createMuiTheme();
const generateClassName = createGenerateClassName();

const App = () =>
  <JssProvider
    generateClassName={ generateClassName }
    registry={ sheetsRegistry }>
    <MuiThemeProvider theme={ theme } sheetsManager={ new Map() }>
      <Page />
    </MuiThemeProvider>
  </JssProvider>;

const html = renderToString(<App/>);
const css = sheetsRegistry.toString();

export { html, css };
