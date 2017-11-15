import fetch from 'isomorphic-fetch';
import checkStatus from 'fetch-check-http-status';
import actions from '../../constants/actions';

const SERVER_URL = '/api/dependent';

export function fetchAlternatives() {
  return (dispatch) => (async () => {
    try {
      const res = await fetch(`${SERVER_URL}/alternatives`);
      const alternatives = await res.json();

      dispatch({
        type: actions.ALTERNATIVES_FETCHED,
        payload: { alternatives },
      });
    } catch (err) {
      dispatch({
        type: actions.EMIT_ERROR,
        payload: {
          name: '読み込みエラー',
          message: '選択肢の読み込み中にエラーが発生しました．',
          details: err,
        },
      });
    }
  })();
}

export function decideAnswer({ answer }) {
  return (dispatch) => (async () => {
    try {
      const res = await fetch(`${SERVER_URL}/decide`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(answer.toJS()),
      });
      const result = await res.json();

      if (!result.success) {
        throw new Error(result.message);
      }

      dispatch({
        type: actions.ANSWER_DECIDED,
        payload: { answer },
      });
    } catch (err) {
      dispatch({
        type: actions.EMIT_ERROR,
        payload: {
          name: '回答登録エラー',
          message: '選択した回答を登録中にエラーが発生しました．',
          details: err,
        },
      });
    }
  })();
}

export function clearAnswer() {
  return {
    type: actions.CLEAR_ANSWER,
  };
}
