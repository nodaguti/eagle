import React from 'react';
import {
  Navbar,
  Nav,
  NavItem,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';

const GuestHeader = () => (
  <Navbar inverse>
    <Navbar.Header>
      <Navbar.Brand>
        <Link href="/" to="/">今日何食べル？</Link>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav pullRight>
      <LinkContainer to="/signin">
        <NavItem>ログイン</NavItem>
      </LinkContainer>
    </Nav>
  </Navbar>
);

export default GuestHeader;
