import {GET_GAMES} from './constants';

export default function gamesReducer(state = [], action) {
  switch(action){
    case GET_GAMES:
      return state;
    default:
      return state;
  }
}
