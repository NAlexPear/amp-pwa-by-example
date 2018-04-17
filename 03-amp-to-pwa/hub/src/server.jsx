import { Page } from './components';
import React from 'react';
import { renderToString } from 'react-dom/server';

export default renderToString(<Page/>);
