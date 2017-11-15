import actions from '../../constants/actions';

export function signIn({ id, password }) {
  // TODO: Implement a genuine authentication process
  if (!id || !password) {
    return {
      type: actions.SIGN_IN_FAILED,
    };
  }

  const sessionId = Buffer.from(id).toString('base64');
  const user = {
    name: id,
  };

  return {
    type: actions.SIGN_IN_SUCCEEDED,
    payload: { sessionId, user },
  };
}

export function signOut() {
  return {
    type: actions.SIGN_OUT,
  };
}
