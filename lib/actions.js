import {LOGIN_USER_REQUEST, LOGIN_USER_REQUEST_SUCCESS, LOGIN_USER_REQUEST_FAIL, GET_ALL_USERS_RESPONSE} from './constants';

export function loginUserRequest(name, password){
  const user = {name, password};
  return {type: LOGIN_USER_REQUEST, user};
}

export function getAllUsersResponse(data){
  return {type: GET_ALL_USERS_RESPONSE, data};
}

export function loginUserResponseSuccess(user){
  return {type: LOGIN_USER_REQUEST_SUCCESS, user};
}

export function loginUserResponseFail(){
  return {type: LOGIN_USER_REQUEST_FAIL};
}
