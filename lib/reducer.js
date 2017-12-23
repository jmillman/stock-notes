import {LOGIN_USER_REQUEST_SUCCESS, LOGIN_USER_REQUEST_FAIL, GET_ALL_USERS_RESPONSE} from './constants';
import {combineReducers} from 'redux';

function loggedInUserReducer(currentUser = {}, action) {
  switch(action.type){
    case LOGIN_USER_REQUEST_SUCCESS:
      return action.user;
    case LOGIN_USER_REQUEST_FAIL:
      return {};
    default:
      return currentUser;
  }
}

function allUsersReducer(allUsers = [], action) {
  switch(action.type){
    case GET_ALL_USERS_RESPONSE:
      return action.data;
    default:
      return allUsers;
  }
}

export default combineReducers({
  loggedInUser: loggedInUserReducer,
  allUsers: allUsersReducer
});
