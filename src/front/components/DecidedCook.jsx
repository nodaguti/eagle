import React from 'react';
import {
  ListGroup,
  ListGroupItem,
  ButtonToolbar,
  Button,
  Panel,
  Image,
} from 'react-bootstrap';

function openRecipePage(uri) {
  window.open(uri, '_blank');
}

function showList({ title, list }) {
  return (
    <p>
      <ListGroup>
        <ListGroupItem bsStyle="success"><h3>{title}</h3></ListGroupItem>
        {
          list.map((item) => <ListGroupItem>{item}</ListGroupItem>)
        }
      </ListGroup>
    </p>
  );
}

const DecidedCook = ({ menu, cookActions }) => (
  <Panel
    header={<h3>{menu.title}</h3>}
    footer={
      <ButtonToolbar>
        <Button onClick={() => cookActions.makeSecondThought()} bsStyle="danger">
          別の料理にする
        </Button>
        {
          !menu.uri ? '' : (
            <Button onClick={() => openRecipePage(menu.uri)}>
              詳細を見る
            </Button>
          )
        }
      </ButtonToolbar>
    }
  >
    <p>
      <Image src={menu.imgUri} responsive rounded />
    </p>
    <p>
      {
        !menu.ingredients.length ? '' : (
          showList({ title: '材料', list: menu.ingredients })
        )
      }
      {
        !menu.instructions.length ? '' : (
          showList({
            title: '手順',
            list: menu.instructions.map((item, idx) => `${idx + 1}. ${item}`),
          })
        )
      }
    </p>
  </Panel>
);

export default DecidedCook;
