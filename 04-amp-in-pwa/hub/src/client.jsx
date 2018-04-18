/* eslint-disable no-plusplus, no-mixed-operators */

import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.jsx';

const BrowserApp = () =>
  <BrowserRouter basename='/04-amp-in-pwa'>
    <App />
  </BrowserRouter>;

ReactDOM.hydrate(<BrowserApp />, document.getElementById('root'));

// This function is needed because Chrome doesn't accept a base64 encoded string
// as value for applicationServerKey in pushManager.subscribe yet
// https://bugs.chromium.org/p/chromium/issues/detail?id=802280
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./serviceworker.js');

  (async () => { // eslint-disable-line consistent-return
    const registration = await navigator.serviceWorker.ready;
    const currentSubscription = await registration.pushManager.getSubscription();

    if (currentSubscription) {
      return currentSubscription;
    }

    const response = await fetch('/key');
    const publicKey = await response.text();

    registration.pushManager.subscribe({
      userVisible: true,
      applicationServerKey: urlBase64ToUint8Array(publicKey),
    });
  })();
}
