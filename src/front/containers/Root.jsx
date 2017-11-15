import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Auth from '../containers/Auth';
import Header from '../containers/Header';
import Home from '../components/Home';
import Cook from '../containers/Cook';
import Dependent from '../containers/Dependent';
import SignIn from '../containers/SignIn';
import SignOut from '../containers/SignOut';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <div>
        <Header />

        <Switch>
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signout" component={SignOut} />
          <Auth>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/cook" component={Cook} />
              <Route exact path="/dependent" component={Dependent} />
            </Switch>
          </Auth>
        </Switch>
      </div>
    </Router>
  </Provider>
);

export default Root;
