import * as constants from '../constants';
import {combineReducers} from 'redux';

function loggedInUserReducer(currentUser = {}, action) {
  switch(action.type){
    case constants.LOGIN_USER_REQUEST_SUCCESS:
      return action.user;
    case constants.LOGIN_USER_REQUEST_FAIL:
      return {};
    default:
      return currentUser;
  }
}

function allUsersReducer(allUsers = [], action) {
  switch(action.type){
    case constants.GET_ALL_USERS_RESPONSE:
      return action.data;
    default:
      return allUsers;
  }
}

function allTicketsReducer(allTickets = [], action) {
  switch(action.type){
    case constants.GET_ALL_TICKETS_RESPONSE:
      return action.data;
    default:
      return allTickets;
  }
}


function footballGameDataReducer(footballGameData = {}, action) {
  // console.info(footballGameData);
  if(footballGameData == 'asdfasdf')
    return null;

  switch(action.type){
    default:
      return constants.footballData;
  }
}

function footballBetViewOptionsReducer(viewOptions = {}, action) {
  switch(action.type){
    case constants.INITIALIZE_FOOTBALL_BET_OPTIONS:{
      let date = action.footballGameData.dates[0];
      let game = action.footballGameData.games.filter((game)=>{return game.date == date;})[0];
      let betType = constants.BET_TYPE_FOOTBALL_TO_WIN;
      return Object.assign({}, viewOptions,
        { date,
          game,
          betType
        });
    }
    case constants.SET_BET_VIEW_OPTIONS_FOOTBALL_DATE:{
      return Object.assign({}, viewOptions, {date: action.data.date});
    }
    case constants.CREATE_BET:{
      return Object.assign({}, viewOptions, {bet: action.bet});
    }
    case constants.CANCEL_BET:{
      return Object.assign({}, viewOptions, {bet: null});
    }
    case constants.SET_BET_VIEW_OPTIONS_FOOTBALL_GAME:
      return Object.assign({}, viewOptions, {game: action.game});
    case constants.SET_BET_VIEW_OPTIONS_BET_TYPE:
      return Object.assign({}, viewOptions, {betType: action.betType});
    default:
      return viewOptions;
  }
}

export default combineReducers({
  loggedInUser: loggedInUserReducer,
  allUsers: allUsersReducer,
  footballGameData: footballGameDataReducer,
  footballBetViewOptions: footballBetViewOptionsReducer,
  allTicketsData: allTicketsReducer
});
