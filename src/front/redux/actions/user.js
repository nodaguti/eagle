import actions from '../../constants/actions';

export function setRole({ role }) {
  return {
    type: actions.SET_ROLE,
    payload: { role },
  };
}

export function addScore({ scoreDiff, reason }) {
  return {
    type: actions.ADD_SCORE,
    payload: { scoreDiff, reason },
  };
}
