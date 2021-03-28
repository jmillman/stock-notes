import * as constants from '../constants';
export * from './footballBetActions';

export function loginUserRequest(name, password) {
  const user = { name, password };
  return { type: constants.LOGIN_USER_REQUEST, user };
}

export function getAllUsersResponse(data) {
  return { type: constants.GET_ALL_USERS_RESPONSE, data };
}

export function loginUserResponseSuccess(user) {
  return { type: constants.LOGIN_USER_REQUEST_SUCCESS, user };
}

export function loginUserResponseFail() {
  return { type: constants.LOGIN_USER_REQUEST_FAIL };
}

//

export function setDate(date) {
  return { type: constants.SET_DATE, date };
}
export function getNotesForDate(notesDate) {
  return { type: constants.GET_DAILY_STOCK_NOTES, notesDate };
}
export function getNotesForDateResponse(data) {
  return { type: constants.GET_DAILY_STOCK_NOTES_RESPONSE, data };
}

export function lookupSymbol(symbol) {
  return { type: constants.LOOKUP_SYMBOL, symbol };
}
export function lookupSymbolResponse(data) {
  return { type: constants.LOOKUP_SYMBOL_RESPONSE, data };
}
