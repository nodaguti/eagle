import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Button,
  Panel,
  Thumbnail,
  Grid,
  Row,
  Col,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { withRouter } from 'react-router-dom';

import * as UserActions from '../redux/actions/user';

const mapStateToProps = (state) => ({
  user: state.user,
  cook: state.cook,
  dependent: state.dependent,
});

const mapDispatchToProps = (dispatch) => ({
  userActions: bindActionCreators(UserActions, dispatch),
});

const renderCookOrDependent = () => (
  <div>
    <LinkContainer to="/cook">
      <Button bsSize="large" block>
        作る <span role="img" aria-label="flexed bicep"> 💪</span>
      </Button>
    </LinkContainer>
    <LinkContainer to="/dependent">
      <Button bsSize="large" block>
        食べる <span role="img" aria-label="dish"> 🍽</span>
      </Button>
    </LinkContainer>
  </div>
);

const renderCookPanel = (recipe) => (
  <div>
    {
      (!recipe) ? (
        <div>
          <p>
            あなたは今日、料理をすることは決まっていますが、なにを作るかは未定です。
          </p>
          <p>
            <LinkContainer to="/cook">
              <Button>作る料理を決める</Button>
            </LinkContainer>
          </p>
        </div>
      ) : (
        <div>
          <p>
            あなたは今日、以下の料理を作る予定です。
          </p>
          <Grid>
            <Row>
              <Col xs={6} md={4}>
                <Thumbnail src={recipe.imgUri}>
                  <h3>{recipe.title}</h3>
                  <p>{recipe.description}</p>
                  <p>
                    <LinkContainer to="/cook">
                      <Button>詳細を見る</Button>
                    </LinkContainer>
                  </p>
                </Thumbnail>
              </Col>
            </Row>
          </Grid>
        </div>
      )
    }
  </div>
);

const renderDependentPanel = (recipe) => (
  <div>
    <p>
      あなたは今日、「{recipe.title}」が夕飯に出てくるのではないかと予想しています。
    </p>
    <p>
      <LinkContainer to="/dependent">
        <Button>詳細を見る</Button>
      </LinkContainer>
    </p>
  </div>
);

const Home = ({ user, cook, dependent, userActions }) => {
  const { role } = user;
  const { menu } = cook;
  const { answer } = dependent;
  let primaryPanel;

  if (role === '') primaryPanel = renderCookOrDependent();
  if (role === 'cook') primaryPanel = renderCookPanel(menu);
  if (role === 'dependent') {
    primaryPanel = answer ? renderDependentPanel(answer) : renderCookOrDependent();
  }

  return (
    <div className="container">
      <Panel bsStyle="success" header={<h2>今日の夕飯、どうする？</h2>}>
        {primaryPanel}
      </Panel>

      <Panel bsStyle="success" header={<h2>今までの実績</h2>}>
        3位！
      </Panel>
    </div>
  );
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));

