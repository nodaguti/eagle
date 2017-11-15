import { combineReducers } from 'redux';
import cook from './cook';
import user from './user';
import auth from './auth';
import error from './error';

export default combineReducers({
  auth,
  user,
  cook,
  error,
});
