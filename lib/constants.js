export const GET_GAMES = 'GET_GAMES';
export const TEST_ACTION = 'TEST_ACTION';
export const INCREMENT_ID = 'INCREMENT_ID';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const GET_ALL_TICKETS_REQUEST = 'GET_ALL_TICKETS_REQUEST';
export const LOGIN_USER_REQUEST_SUCCESS = 'LOGIN_USER_REQUEST_SUCCESS';
export const LOGIN_USER_REQUEST_FAIL = 'LOGIN_USER_REQUEST_FAIL';
export const GET_ALL_USERS_RESPONSE = 'GET_ALL_USERS_RESPONSE';

export const SET_BET_VIEW_OPTIONS_FOOTBALL_DATE = 'SET_BET_VIEW_OPTIONS_FOOTBALL_DATE';
export const SET_BET_VIEW_OPTIONS_FOOTBALL_GAME = 'SET_BET_VIEW_OPTIONS_FOOTBALL_GAME';
export const SET_BET_VIEW_OPTIONS_BET_TYPE = 'SET_BET_VIEW_OPTIONS_BET_TYPE';
export const INITIALIZE_FOOTBALL_BET_OPTIONS = 'INITIALIZE_FOOTBALL_BET_OPTIONS';
export const CREATE_BET = 'CREATE_BET';
export const CANCEL_BET = 'CANCEL_BET';
export const SUBMIT_BET = 'SUBMIT_BET';
export const SUBMIT_BET_SUCCESS = 'SUBMIT_BET_SUCCESS';
export const SUBMIT_BET_FAIL = 'SUBMIT_BET_FAIL';
export const GET_ALL_TICKETS_RESPONSE = 'GET_ALL_TICKETS_RESPONSE';

export const BET_TYPE_FOOTBALL_TO_WIN = 'FOOTBALL_TO_WIN';
export const BET_TYPE_FOOTBALL_POINT_TOTAL = 'FOOTBALL_POINT_TOTAL';
export const BET_TYPE_FOOTBALL_POINT_DIFFERENTIAL = 'FOOTBALL_POINT_DIFFERENTIAL';
export const FOOTBALL_BET_TYPES = [BET_TYPE_FOOTBALL_TO_WIN, BET_TYPE_FOOTBALL_POINT_TOTAL, BET_TYPE_FOOTBALL_POINT_DIFFERENTIAL];

let footballDates = ['Week 16', 'Week 15', 'Week 14'];
// let footballTeams = ['patriots', 'cowboys', 'eagles', 'raiders', 'seahawks', 'giants', 'steelers', 'vikings', 'buffalo', 'cardinals'];

const gameBuilder = function(date, homeTeamName, awayTeamName) {
  return {date: date, home: homeTeamName, away: awayTeamName};
};

const getGames = () => {
  let retArray = new Array();
  retArray.push(gameBuilder('Week 16', 'buffalo', 'patriots'));
  retArray.push(gameBuilder('Week 16', 'giants', 'cardinals'));
  retArray.push(gameBuilder('Week 16', 'seahawks', 'dallas'));
  retArray.push(gameBuilder('Week 16', 'raiders', 'eagles'));
  return retArray;
};

export const footballData = {
  dates: footballDates,
  betTypes: FOOTBALL_BET_TYPES,
  // teams: footballTeams,
  games: getGames()
};

export const footballGameToWinPropsBetTypes = {
  homeScore: [21, 14, 10, 7, 3, 1, -1, -7, -10, -14, -21]
};
