import * as constants from '../constants';
export * from './footballBetActions';

export function loginUserRequest(name, password){
  const user = {name, password};
  return {type: constants.LOGIN_USER_REQUEST, user};
}

export function getAllUsersResponse(data){
  return {type: constants.GET_ALL_USERS_RESPONSE, data};
}

export function loginUserResponseSuccess(user){
  return {type: constants.LOGIN_USER_REQUEST_SUCCESS, user};
}

export function loginUserResponseFail(){
  return {type: constants.LOGIN_USER_REQUEST_FAIL};
}

// 

export function getNotesForDate(notesDate){
  console.error("444");
  return {type: constants.GET_DAILY_STOCK_NOTES, notesDate};
}
export function getNotesForDateResponse(data){
  return {type: constants.GET_DAILY_STOCK_NOTES_RESPONSE, data};
}