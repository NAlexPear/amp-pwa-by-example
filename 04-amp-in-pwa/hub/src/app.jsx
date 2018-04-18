import React from 'react';
import {
  Route,
  Switch,
} from 'react-router';
import {
  AMPDocument,
  Page,
  Shell,
} from './components';

const App = () =>
  <Shell>
    <Switch>
      <Route exact path='/' component={ Page } />
      <Route path='/article' component={
        () => <AMPDocument src='./article'/>
      }/>
    </Switch>
  </Shell>;

export default App;
