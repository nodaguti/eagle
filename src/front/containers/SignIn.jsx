import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import {
  Well,
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
} from 'react-bootstrap';

import * as AuthActions from '../redux/actions/auth';

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  authActions: bindActionCreators(AuthActions, dispatch),
});

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
    </FormGroup>
  );
}

class SignIn extends Component {

  signIn = () => {
    const {
      idInput,
      passwordInput,
    } = this;

    const id = idInput.value;
    const password = passwordInput.value;

    this.props.authActions.signIn({ id, password });
  };

  render() {
    console.log(this.props.auth.toJS());

    return this.props.auth.sessionId ? (
      <Redirect to="/" />
    ) : (
      <div className="container">
        <Well bsSize="large">
          <form>
            <FieldGroup
              id="formControlsId"
              type="text"
              label="ID"
              inputRef={(i) => { this.idInput = i; }}
              placeholder="Enter your ID"
            />
            <FieldGroup
              id="formControlsPassword"
              label="Password"
              type="password"
              placeholder="Enter your password"
              inputRef={(i) => { this.passwordInput = i; }}
            />
            <Button onClick={() => this.signIn()}>
              ログイン
            </Button>
          </form>
        </Well>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignIn);
