/* eslint-disable no-plusplus, no-mixed-operators */

import React from 'react';
import ReactDOM from 'react-dom';
import { Page } from './components';


ReactDOM.hydrate(<Page />, document.getElementById('root'));

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
    const subscription = await registration.pushManager.subscribe({
      userVisible: true,
      applicationServerKey: urlBase64ToUint8Array(publicKey),
    });

    fetch('/push-notify', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ subscription }),
    });
  })();
}
