import { Page } from './components';
import React from 'react';
import ReactDOM from 'react-dom';


ReactDOM.hydrate(<Page />, document.getElementById('root'));

if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./serviceworker.js');

  (async () => {
    const registration = await navigation.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();

    console.log('registration ->', registration);
  })();
}
