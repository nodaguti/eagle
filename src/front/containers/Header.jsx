import React from 'react';
import { connect } from 'react-redux';
import GuestHeader from '../components/GuestHeader';
import AuthedHeader from '../components/AuthedHeader';

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const Header = ({ auth }) => (
  auth.sessionId ? <AuthedHeader user={auth.user} /> : <GuestHeader />
);

export default connect(mapStateToProps)(Header);
