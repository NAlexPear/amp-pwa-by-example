import React, { PureComponent } from 'react';
import { Button } from 'material-ui';

async function onClick() {
  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.getSubscription();

  if (subscription && !this.pushRequest) {
    this.pushRequest = await fetch('/push-notify', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ subscription }),
    });

    this.pushRequest = null;
  }
}

class PushButton extends PureComponent {
  constructor(props) {
    super(props);

    this.pushRequest = null;
    this.onClick = onClick.bind(this);
  }

  render() {
    return (
      <Button
        onClick={ this.onClick }
        variant='raised'>
        Notify Me!
      </Button>
    );
  }
}

export default PushButton;
