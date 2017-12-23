import * as effects from 'redux-saga/effects';
import {LOGIN_USER_REQUEST} from './constants';
import * as actions from './actions';
import fetch from 'isomorphic-fetch';
// import {delay} from 'redux-saga';

export function* currentUserSaga() {
  // while(true){
  //   yield delay(1000);
  //   console.info('currentUserSaga Running');
  // }
}
export function * getAllUsersSaga () {
  const response = yield effects.call(fetch, 'http://localhost:4444/getallusers');
  const data = yield effects.apply(response, response.json);
  yield effects.put(actions.getAllUsersResponse(data));
}

// export function * loginUserSaga () {
//   let action = yield effects.take(LOGIN_USER_REQUEST);
//   console.info(action);
//   const response = yield effects.call(fetch, 'http://localhost:4444/loginuser?email=jared@pcwaiter.com&password=password');
//   const data = yield effects.apply(response, response.json);
//   yield effects.put(actions.loginUserResponseSuccess(data));
// }
//
function* loginUser(action) {
  const response = yield effects.call(fetch, 'http://localhost:4444/loginuser?email=' + action.user.name + '&password=' + action.user.password);
  const data = yield effects.apply(response, response.json);
  yield effects.put(actions.loginUserResponseSuccess(data));
}
export function * loginUserTakeEverySaga () {
  yield effects.takeEvery(LOGIN_USER_REQUEST, loginUser);
}
