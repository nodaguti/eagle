import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  ListGroup,
  ListGroupItem,
  ButtonToolbar,
  Button,
  Panel,
  Alert,
} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import * as UserActions from '../redux/actions/user';
import * as DependentActions from '../redux/actions/dependent';

const mapStateToProps = (state) => ({
  dependent: state.dependent,
});

const mapDispatchToProps = (dispatch) => ({
  userActions: bindActionCreators(UserActions, dispatch),
  dependentActions: bindActionCreators(DependentActions, dispatch),
});

class Cook extends Component {
  componentWillMount() {
    if (!this.props.dependent.answer) {
      this.props.dependentActions.fetchAlternatives();
    }
  }

  componentDidMount() {
    this.props.userActions.setRole({ role: 'dependent' });
  }

  goHome() {
    this.props.history.push('/');
  }

  unselect() {
    this.props.dependentActions.clearAnswer();
  }

  render() {
    const {
      dependent,
      dependentActions,
    } = this.props;

    const { decideAnswer } = dependentActions;

    return (
      <div className="container">
        {
          !dependent.answer ? '' : (
            <Alert bsStyle="success">今日の回答は登録済みです．</Alert>
          )
        }
        <Panel
          header={<h3>次の料理の中から夕ご飯を予想してください．</h3>}
          footer={
            <ButtonToolbar>
              <Button onClick={() => this.goHome()}>戻る</Button>
              <Button onClick={() => this.unselect()}>未回答に戻す</Button>
            </ButtonToolbar>
          }
        >
          <ListGroup fill>
            {
              dependent.alternatives.map((alt) => (
                dependent.answer && dependent.answer.title === alt.title ? (
                  <ListGroupItem
                    active
                    onClick={() => decideAnswer({ answer: alt })}
                  >
                    {alt.title}
                  </ListGroupItem>
                ) : (
                  <ListGroupItem
                    onClick={() => decideAnswer({ answer: alt })}
                  >
                    {alt.title}
                  </ListGroupItem>
                )
              ))
            }
          </ListGroup>
        </Panel>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cook));

