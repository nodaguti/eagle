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
    this.userWillTransfer(this.props);
  }

  componentWillUpdate(nextProps) {
    this.userWillTransfer(nextProps);
  }

  userWillTransfer(props) {
    this.setState({
      isAuthenticated: !!props.auth.sessionId,
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
