import React, { PureComponent, Component } from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import { Redirect } from 'react-router';

import { store } from '../store';
import { history } from '../store/history';
import { ConnectedDashboard } from './Dashboard';
import { ConnectedNavigation } from './Navigation';
import { ConnectedTaskDetail } from './TaskDetail';
import { ConnectedLogin } from './Login';

const RouteGuard = (Component) => ({ match }) =>
  !store.getState().session.authenticated ? (
    <Redirect to='/' />
  ) : (
    <Component match={match} />
  );

export const Main = () => (
  <Router history={history}>
    <Provider store={store}>
      <div>
        <ConnectedNavigation />
        <Route exact path='/' component={ConnectedLogin} />

        <Route
          exact
          path='/dashboard'
          render={RouteGuard(ConnectedDashboard)}
        />
        <Route
          exact
          path='/task/:id'
          render={RouteGuard(ConnectedTaskDetail)}
        />
      </div>
    </Provider>
  </Router>
);
