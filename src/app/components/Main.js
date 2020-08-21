import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';

import { store } from '../store';
import { history } from '../store/history';
import { ConnectedDashboard } from './Dashboard';
import { ConnectedNavigation } from './Navigation';

export const Main = () => (
  <Router history={history}>
    <Provider store={store}>
      <div>
        <ConnectedNavigation />
        <Route exact path='/dashboard' render={() => <ConnectedDashboard />} />
      </div>
    </Provider>
  </Router>
);
