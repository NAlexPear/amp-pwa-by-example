import {
  AppBar,
  Typography,
} from 'material-ui';
import React from 'react';


const Shell = ({ children }) =>
  <React.Fragment>
    <AppBar position='fixed'>
      <Typography variant='subheading'>
        App Shell
      </Typography>
    </AppBar>

    { children }
  </React.Fragment>;

export default Shell;
