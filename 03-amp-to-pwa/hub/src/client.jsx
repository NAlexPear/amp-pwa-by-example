import { Page } from './components';
import React from 'react';
import ReactDOM from 'react-dom';


ReactDOM.hydrate(<Page />, document.getElementById('root'));

if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./serviceworker.js');
}
