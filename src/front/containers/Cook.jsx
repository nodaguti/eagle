import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UndecidedCook from '../components/UndecidedCook';
import DecidedCook from '../components/DecidedCook';

import * as UserActions from '../redux/actions/user';
import * as CookActions from '../redux/actions/cook';

const mapStateToProps = (state) => ({
  cook: state.cook,
});

const mapDispatchToProps = (dispatch) => ({
  userActions: bindActionCreators(UserActions, dispatch),
  cookActions: bindActionCreators(CookActions, dispatch),
});

class Cook extends Component {
  componentDidMount() {
    this.props.userActions.setRole({ role: 'cook' });
  }

  render() {
    const {
      cook,
      userActions,
      cookActions,
    } = this.props;

    return (cook.menu !== null) ? (
      <div className="container">
        <DecidedCook
          cookActions={cookActions}
          menu={cook.menu}
        />
      </div>
    ) : (
      <div className="container">
        <UndecidedCook
          setRole={userActions.setRole}
          cookActions={cookActions}
          recommendations={cook.recommendations}
        />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Cook);

