import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Route,
  Redirect,
  withRouter,
} from 'react-router-dom';

const mapStateToProps = (state) => ({
  auth: state.auth,
});

class Auth extends Component {
  componentWillMount() {
    this.onAuthStateChanged(!!this.props.auth.sessionId);
  }

  componentWillUpdate(nextProps) {
    console.log(nextProps.auth.sessionId, this.state.isAuthenticated);

    if (!!nextProps.auth.sessionId !== this.state.isAuthenticated) {
      this.onAuthStateChanged(!!nextProps.auth.sessionId);
    }
  }

  onAuthStateChanged(nextState) {
    this.setState({
      isAuthenticated: nextState,
    });
  }

  render() {
    return (
      this.state.isAuthenticated ? (
        <Route>{this.props.children}</Route>
      ) : (
        <Redirect to="/signin" />
      )
    );
  }
}

export default withRouter(connect(mapStateToProps)(Auth));
