import * as effects from 'redux-saga/effects';
import * as constants from './constants';
import * as actions from './actions/action';
import fetch from 'isomorphic-fetch';
import { getDate } from './selectors/selectors';

export function * getDailyNotesTakeEverySaga () {
  yield effects.takeEvery(constants.GET_DAILY_STOCK_NOTES, getDailyNotesSaga);
}

function * getDailyNotesSaga () {
  const response = yield effects.call(fetch, 'http://127.0.0.1:5000/stock_notes?date=2021-03-23');
  let data = yield effects.apply(response, response.json);
  yield effects.put(actions.getNotesForDateResponse(data));
}

export function * lookupSymbolTakeEverySaga () {
  yield effects.takeEvery(constants.LOOKUP_SYMBOL, lookupSymbolSaga);
}


function * lookupSymbolSaga (action) {
  yield effects.put(actions.lookupSymbolResponse({'status': 'Searching Symbol....'}));
  const response = yield effects.call(fetch, `http://127.0.0.1:5000/lookup_symbol?symbol=${action.symbol}`);
  const data = yield effects.apply(response, response.json);
  let date = yield effects.select(getDate);
  yield effects.put(actions.lookupSymbolResponse(data));
  yield effects.put(actions.getNotesForDate(date));
}




// export function * getAllBetsTakeEverySaga () {
//   console.error("getAllBetsTakeEverySaga");
//   yield effects.takeEvery(constants.GET_ALL_BETS_REQUEST, getAllBetsSaga);
// }

// function * getAllBetsSaga () {
//   console.error("getAllBetsSaga");
//   const response = yield effects.call(fetch, 'http://localhost:4444/getallbets');
//   const data = yield effects.apply(response, response.json);
//   yield effects.put(actions.getAllBetsResponse(data));
// }

// export function * getAllStatsTakeEverySaga () {
//   console.error("getAllStatsTakeEverySaga");
//   yield effects.takeEvery(constants.GET_ALL_STATS_REQUEST, getAllStatsSaga);
// }

// function * getAllStatsSaga () {
//   console.error("getAllStatsSaga");

//   const response = yield effects.call(fetch, 'http://localhost:4444/getallstats');
//   const data = yield effects.apply(response, response.json);
//   yield effects.put(actions.getAllStatsResponse(data));
// }


// export function * getAllTicketsTakeEverySaga () {
//   console.error("getAllTicketsTakeEverySaga");
//   yield effects.takeEvery(constants.GET_ALL_TICKETS_REQUEST, getAllTicketsSaga);
// }

// function * getAllTicketsSaga () {
//   console.error("getAllTicketsSaga");
//   const response = yield effects.call(fetch, 'http://localhost:4444/getalltickets');
//   const data = yield effects.apply(response, response.json);
//   yield effects.put(actions.getAllTicketsResponse(data));
// }

// export function * loginUserTakeEverySaga () {
//   console.error("loginUserTakeEverySaga");
//   yield effects.takeEvery(constants.LOGIN_USER_REQUEST, loginUser);
// }

// function* loginUser(action) {
//   console.error("loginUser");
//   const response = yield effects.call(fetch, 'http://localhost:4444/loginuser?email=' + action.user.name + '&password=' + action.user.password);
//   const data = yield effects.apply(response, response.json);
//   yield effects.put(actions.loginUserResponseSuccess(data));
// }

// export function * submitBetTakeEverySaga () {
//   console.error("submitBetTakeEverySaga");
//   yield effects.takeEvery(constants.SUBMIT_BET, submitBet);
// }

// function* submitBet(action) {
//   console.error("submitBet");
//   const {betType, side, game, price, user, homeScore} = action.bet;
//   const {date, home, away} = game;
//   const {userId} = user;
//   const quantity = 1;
//   const ticket = [betType, date, home, away, homeScore, side].join('_');
//   const url = 'http://localhost:4444/createticket?ticket=' + ticket + '&betType=' + betType + '&side=' + side + '&price=' + price + '&userId=' + userId + '&quantity=' + quantity;
//   const response = yield effects.call(fetch, url);
//   const data = yield effects.apply(response, response.json);
//   if(data.error == false){
//     yield effects.put(actions.submitBetResponseSuccess(data));
//     yield effects.put(actions.cancelBet());
//     yield effects.put(actions.refreshAllTickets());
//   }
//   else {
//     yield effects.put(actions.submitBetResponseFail(data));
//   }
// }
