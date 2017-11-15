import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';

import * as AuthActions from '../redux/actions/auth';

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  authActions: bindActionCreators(AuthActions, dispatch),
});

class SignOut extends Component {

  componentWillMount() {
    this.props.authActions.signOut();
  }

  render() {
    return this.props.auth.sessionId ? (
      <div>ログアウトしています...</div>
    ) : (
      <Redirect to="/signin" />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignOut);
