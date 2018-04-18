import React from 'react';
import { Button } from 'material-ui';

function onClick() {
  console.log('button clicked!');
}

const PushButton = () =>
  <Button
    onClick={ onClick }
    variant='raised'>
    Notify Me!
  </Button>;

export default PushButton;
