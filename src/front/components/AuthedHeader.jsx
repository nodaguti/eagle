import React from 'react';
import {
  Navbar,
  Nav,
  NavDropdown,
  MenuItem,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';

const AuthedHeader = ({ user }) => {
  const {
    name,
  } = user;

  return (
    <Navbar inverse>
      <Navbar.Header>
        <Navbar.Brand>
          <Link href="/" to="/">今日何食べル？</Link>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav pullRight>
        <NavDropdown id="user-nav-dropdown" title={name}>
          <LinkContainer to="/signout">
            <MenuItem>ログアウト</MenuItem>
          </LinkContainer>
        </NavDropdown>
      </Nav>
    </Navbar>
  );
};

export default AuthedHeader;
