import * as effects from 'redux-saga/effects';
import * as constants from './constants';
import * as actions from './actions';
import fetch from 'isomorphic-fetch';
// import {delay} from 'redux-saga';

export function * getAllUsersSaga () {
  const response = yield effects.call(fetch, 'http://localhost:4444/getallusers');
  const data = yield effects.apply(response, response.json);
  yield effects.put(actions.getAllUsersResponse(data));
}

export function * getAllBetsTakeEverySaga () {
  yield effects.takeEvery(constants.GET_ALL_BETS_REQUEST, getAllBetsSaga);
}

function * getAllBetsSaga () {
  const response = yield effects.call(fetch, 'http://localhost:4444/getallbets');
  const data = yield effects.apply(response, response.json);
  yield effects.put(actions.getAllBetsResponse(data));
}

export function * getAllStatsTakeEverySaga () {
  yield effects.takeEvery(constants.GET_ALL_STATS_REQUEST, getAllStatsSaga);
}

function * getAllStatsSaga () {
  const response = yield effects.call(fetch, 'http://localhost:4444/getallstats');
  const data = yield effects.apply(response, response.json);
  yield effects.put(actions.getAllStatsResponse(data));
}


export function * getAllTicketsTakeEverySaga () {
  yield effects.takeEvery(constants.GET_ALL_TICKETS_REQUEST, getAllTicketsSaga);
}

function * getAllTicketsSaga () {
  const response = yield effects.call(fetch, 'http://localhost:4444/getalltickets');
  const data = yield effects.apply(response, response.json);
  yield effects.put(actions.getAllTicketsResponse(data));
}

export function * loginUserTakeEverySaga () {
  yield effects.takeEvery(constants.LOGIN_USER_REQUEST, loginUser);
}

function* loginUser(action) {
  const response = yield effects.call(fetch, 'http://localhost:4444/loginuser?email=' + action.user.name + '&password=' + action.user.password);
  const data = yield effects.apply(response, response.json);
  yield effects.put(actions.loginUserResponseSuccess(data));
}

export function * submitBetTakeEverySaga () {
  yield effects.takeEvery(constants.SUBMIT_BET, submitBet);
}

function* submitBet(action) {
  const {betType, side, game, price, user, homeScore} = action.bet;
  const {date, home, away} = game;
  const {userId} = user;
  const quantity = 1;
  const ticket = [betType, date, home, away, homeScore, side].join('_');
  const url = 'http://localhost:4444/createticket?ticket=' + ticket + '&betType=' + betType + '&side=' + side + '&price=' + price + '&userId=' + userId + '&quantity=' + quantity;
  const response = yield effects.call(fetch, url);
  const data = yield effects.apply(response, response.json);
  if(data.error == false){
    yield effects.put(actions.submitBetResponseSuccess(data));
    yield effects.put(actions.cancelBet());
    yield effects.put(actions.refreshAllTickets());
  }
  else {
    yield effects.put(actions.submitBetResponseFail(data));
  }
}
