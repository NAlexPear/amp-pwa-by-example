import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from 'material-ui';
import React from 'react';
import { Button } from '../Button';


const Page = () =>
  <Grid
    container
    direction='column'
    justify='space-around'
    style={ { height: '70vh' } }>
    <Grid item>
      <Typography
        gutterBottom
        variant='headline'>
        PWA Landing Page
      </Typography>
      <Typography
        gutterBottom
        variant='title'>
        This page is loaded up as a server-side-rendered React Component.
      </Typography>
      <Typography
        gutterBottom
        variant='body1'>
        Check out the dev tools and see for yourself!
      </Typography>
    </Grid>

    <Card>
      <CardHeader
        subheader='Are you on mobile? Click this button to get some push notifications.'
        title='Push Notifications'/>
      <CardContent>
        <Button />
      </CardContent>
    </Card>
  </Grid>;

export default Page;
