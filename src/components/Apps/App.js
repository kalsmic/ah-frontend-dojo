import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from 'pages/Landing';
import PageNotFound from 'pages/Error';

import 'assets/MainStyle.scss';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={props => <LandingPage {...props} />} />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    );
  }
}
export default App;
