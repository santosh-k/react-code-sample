import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  loginRequest: ['loginType', 'payload'],
  loginSuccess: ['user'],
  loginFailure: ['message'],
  resetPasswordRequest: ['username'],
  resetPasswordSuccess: ['message'],
  resetPasswordFailure: ['message'],
  signUpRequest: ['username', 'password'],
  signUpSuccess: ['user'],
  signUpFailure: ['message'],
});

export const LoginTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  user: null,
  done: null,
  fetching: null,
  message: null,
  error: null,
});

/* ------------- Selectors ------------- */

export const LoginSelectors = {
  getUser: state => state.login.user,
  getLogin: state => state.login,
  getLoginError: state => state.login.message || {},
};

/* ------------- Reducers ------------- */

// ///////////////
// Login & Sign Up
// ///////////////
// request the data from an api
export const loginRequest = (state, {data}) =>
  state.merge({done: false, fetching: true, user: null, message: null});

// successful api lookup
export const loginSuccess = (state, action) => {
  const {user} = action;
  console.warn('USER::::' + JSON.stringify(user));
  return state.merge({done: true, fetching: false, error: null, user});
};

// Something went wrong somewhere.
export const requestFailure = (state, action) => {
  const {message} = action;
  return state.merge({done: true, fetching: false, error: true, message});
};

// //////////////
// Reset Password
// //////////////
// request the data from an api
export const resetPasswordRequest = (state, {data}) =>
  state.merge({done: false, fetching: true, user: null, message: null});

// successful api lookup
export const resetPasswordSuccess = (state, action) => {
  const {message} = action;
  const error = message.result !== 'success';
  return state.merge({done: true, fetching: false, error, message});
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: loginRequest,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGIN_FAILURE]: requestFailure,
  [Types.RESET_PASSWORD_REQUEST]: resetPasswordRequest,
  [Types.RESET_PASSWORD_SUCCESS]: resetPasswordSuccess,
  [Types.RESET_PASSWORD_FAILURE]: requestFailure,
  [Types.SIGN_UP_REQUEST]: loginRequest,
  [Types.SIGN_UP_SUCCESS]: loginSuccess,
  [Types.SIGN_UP_FAILURE]: requestFailure,
});
