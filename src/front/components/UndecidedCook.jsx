import React, { Component } from 'react';
import {
  ButtonToolbar,
  Button,
  Panel,
  ListGroup,
  ListGroupItem,
  Media,
} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

class UndecidedCook extends Component {
  componentWillMount() {
    this.props.cookActions.fetchRecommendations();
  }

  goHome = () => {
    this.props.history.push('/');
  }

  abandonCooking = () => {
    this.props.setRole({ role: '' });
    this.props.cookActions.clearCook();
    this.props.history.push('/');
  }

  enterOriginalMenu = ({ decideOriginalMenu }) => {
    const title = window.prompt('独自メニューのタイトルを入力してください', '');

    if (title) {
      decideOriginalMenu({ title });
    }
  }

  showRecipeList = ({ title, list, decideMenu }) => {
    if (list.isEmpty()) {
      return '';
    }

    return (
      <ListGroup fill>
        <ListGroupItem bsStyle="success">{title}</ListGroupItem>

        {
          list.map((recipe) => (
            <ListGroupItem
              onClick={() => decideMenu({ menu: recipe })}
            >
              <Media>
                <Media.Left>
                  <img
                    width={64}
                    height={64}
                    src={recipe.imgUri}
                    alt={recipe.title}
                  />
                </Media.Left>
                <Media.Body>
                  <Media.Heading>{recipe.title}</Media.Heading>
                  <p>{recipe.description}</p>
                </Media.Body>
              </Media>
            </ListGroupItem>
          ))
        }
      </ListGroup>
    );
  }

  render() {
    const {
      recommendations,
      cookActions,
    } = this.props;
    const {
      decideMenu,
      decideOriginalMenu,
    } = cookActions;

    return (
      <Panel
        title="おすすめメニュー"
        footer={
          <ButtonToolbar>
            <Button onClick={() => this.goHome()}>
              戻る
            </Button>
            <Button onClick={() => this.abandonCooking()} bsStyle="danger">
              作るのをやめる
            </Button>
            <Button onClick={() => this.enterOriginalMenu({ decideOriginalMenu })}>
              リストにないメニューを作る
            </Button>
          </ButtonToolbar>
        }
      >
        {
          this.showRecipeList({
            title: '📡 室温からのスマートリコメンド',
            list: recommendations.device,
            decideMenu,
          })
        }
        {
          this.showRecipeList({
            title: '旬のおすすめ',
            list: recommendations.seasonal,
            decideMenu,
          })
        }
        {
          this.showRecipeList({
            title: '週間ランキング',
            list: recommendations.ranking,
            decideMenu,
          })
        }
      </Panel>
    );
  }
}

export default withRouter(UndecidedCook);
