import React from 'react';
import {
  PageHeader,
  ButtonToolbar,
  Button,
  Well,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Home = () => (
  <div className="container">
    <PageHeader>今日の夕飯、どうする？</PageHeader>
    <div style={{ maxWidth: '60%', margin: '0 auto 10px' }}>
      <LinkContainer to="/cook">
        <Button bsSize="large" block>
          作る
          <span role="img" aria-label="flexed bicep">💪</span>
        </Button>
      </LinkContainer>
      <LinkContainer to="/dependent">
        <Button bsSize="large" block>
          食べる
          <span role="img" aria-label="dish">🍽</span>
        </Button>
      </LinkContainer>
    </div>
  </div>
);

export default Home;
