import React from 'react';
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';
import { Home } from '../Screens';

export const withRoutes = (WrappedLayout) => {
  const Routes = () => (
    <WrappedLayout>
      <Switch>
        <Route component={Home} exact path="/home" />
        <Redirect from="/" to="/home" />
      </Switch>
    </WrappedLayout>
  );

  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
};
