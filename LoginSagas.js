/* ***********************************************************
 * A short word on how to use this automagically generated file.
 * We're often asked in the ignite gitter channel how to connect
 * to a to a third party api, so we thought we'd demonstrate - but
 * you should know you can use sagas for other flow control too.
 *
 * Other points:
 *  - You'll need to add this saga to sagas/index.js
 *  - This template uses the api declared in sagas/index.js, so
 *    you'll need to define a constant in that file.
 *************************************************************/

import {call, put} from 'redux-saga/effects';
import LoginActions from '../Redux/LoginRedux';
import firebase from '../Services/FirebaseApi';

export function* login(api, action) {
  const {loginType, payload} = action;

  try {
    const response = yield call(api.login, loginType, payload);
    yield put(LoginActions.loginSuccess(response));
  } catch (error) {
    console.log('saga error ');
    console.log(error);
    yield put(LoginActions.loginFailure(error));
  }

  /*
  // success?
  if (response.authenticated) {
//     yield call([firebase.analytics, 'logEvent'], 'login', {method})
  } else {
*/

  //   }
}

export function* resetPassword(api, action) {
  const {username} = action;
  const response = yield call(api.resetPassword, username);

  // success?
  if (response.ok) {
    yield put(LoginActions.resetPasswordSuccess(response.data));
  } else {
    yield put(LoginActions.resetPasswordFailure(response.data));
  }
}

export function* signUp(api, action) {
  const {username, password} = action;
  const method = username === 'facebook' ? 'facebook' : 'email';
  try {
    const response = yield call(api.signUp, username, password);
    yield put(LoginActions.signUpSuccess(response));
  } catch (error) {
    yield put(LoginActions.signUpFailure(error));
  }
}

export function* setUser(action) {
  const {user} = action;
  //   yield call([firebase.analytics, 'setUserId'], user && user.id.toString())
}
