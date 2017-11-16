import React from 'react';
import {
  Navbar,
  Nav,
  NavDropdown,
  MenuItem,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import Telemetry from './Telemetry';

const AuthedHeader = ({ user }) => {
  const {
    name,
  } = user;

  return (
    <Navbar inverse>
      <Navbar.Header>
        <Navbar.Brand>
          <Link href="/" to="/">今日なに食べル？</Link>
        </Navbar.Brand>
      </Navbar.Header>
      <Navbar.Collapse>
        <Telemetry />
        <Nav pullRight>
          <NavDropdown id="user-nav-dropdown" title={name}>
            <LinkContainer to="/signout">
              <MenuItem>ログアウト</MenuItem>
            </LinkContainer>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AuthedHeader;
