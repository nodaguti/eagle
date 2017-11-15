import fetch from 'isomorphic-fetch';
import checkStatus from 'fetch-check-http-status';
import actions from '../../constants/actions';

const SERVER_URL = '/api/cook';

export function fetchRecommendations() {
  return (dispatch) => (async () => {
    try {
      const res = await fetch(`${SERVER_URL}/recommendations`);
      const recommendations = await res.json();

      dispatch({
        type: actions.RECOMMENDATIONS_FETCHED,
        payload: { recommendations },
      });
    } catch (err) {
      dispatch({
        type: actions.EMIT_ERROR,
        payload: {
          name: '読み込みエラー',
          message: 'レシピリストの読み込み中にエラーが発生しました．',
          details: err,
        },
      });
    }
  })();
}

export function decideMenu({ menu }) {
  return (dispatch) => (async () => {
    try {
      const res = await fetch(`${SERVER_URL}/decide`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(menu.toJS()),
      });
      const result = await res.json();

      if (!result.success) {
        throw new Error(result.message);
      }

      dispatch({
        type: actions.MENU_DECIDED,
        payload: { menu },
      });
    } catch (err) {
      dispatch({
        type: actions.EMIT_ERROR,
        payload: {
          name: 'レシピ登録エラー',
          message: '選択したレシピを登録中にエラーが発生しました．',
          details: err,
        },
      });
    }
  })();
}

export function decideOriginalMenu({ title }) {
  return (dispatch) => (async () => {
    try {
      const res = await fetch(`${SERVER_URL}/decide`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      });
      const result = await res.json();

      if (!result.success) {
        throw new Error(result.message);
      }

      dispatch({
        type: actions.ORIGINAL_MENU_DECIDED,
        payload: { title },
      });
    } catch (err) {
      dispatch({
        type: actions.EMIT_ERROR,
        payload: {
          name: 'レシピ登録エラー',
          message: 'レシピを登録中にエラーが発生しました．',
          details: err,
        },
      });
    }
  })();
}

export function makeSecondThought() {
  return {
    type: actions.CLEAR_MENU,
  };
}

export function clearCook() {
  return {
    type: actions.CLEAR_COOK,
  };
}
