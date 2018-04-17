import React from 'react';

function onClick(){
  console.log('button clicked!');
}

const Page = () =>
  <main>
    <h1>PWA Landing Page</h1>
    <p>This page is loaded up as a server-side-rendered React Component. Check out the dev tools and see for yourself!</p>

    <h2>Push Notifications</h2>
    <p>Are you on mobile? Click this button to get some push notifications.</p>
    <button onClick={ onClick } type='button'>Notify Me!</button>
  </main>

export default Page;
