import React from 'react';
import { connect } from 'react-redux';
import GuestHeader from '../components/GuestHeader';
import AuthedHeader from '../components/AuthedHeader';

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
});

const Header = ({ auth, user }) => (
  auth.sessionId ? <AuthedHeader user={user} /> : <GuestHeader />
);

export default connect(mapStateToProps)(Header);
