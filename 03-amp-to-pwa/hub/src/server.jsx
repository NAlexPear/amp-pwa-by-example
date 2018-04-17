import React from 'react';
import { renderToString } from 'react-dom/server';
import { Page } from './components';

export default renderToString(<Page/>);
