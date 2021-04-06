import moment from 'moment';
import _ from 'lodash';

export default function (state, action) {
  let retState;
  switch (action.type) {
    case 'refreshSettingsFromLocalStorage':
      retState = Object.assign({}, state, { settings: action.settings });
      return retState;
    case 'settings':
      const settings = _.cloneDeep(_.get(state, 'settings', {})) || {};
      _.set(settings, action.key, action.value);
      window.localStorage.setItem('settings', JSON.stringify(settings));
      retState = Object.assign({}, state, { settings });
      return retState;
    case 'notesLoaded':
      retState = Object.assign({}, state, { notes: action.data });
      return retState;
    case 'noteCreated':
      retState = Object.assign({}, state, { noteAddedTimeStamp: moment() });
      return retState;
    case 'symbolCreated':
      retState = Object.assign({}, state, { symbolAddedTimeStamp: moment() });
      return retState;
    case 'taskCompleted':
      retState = Object.assign({}, state, { data: action.data });
      return retState;
    case 'loginUser':
      retState = Object.assign({}, state, { loggedInUser: action.user });
      return retState;
    case 'taskLists':
      retState = Object.assign({}, state, { taskLists: action.data });
      return retState;
    case 'views':
      retState = Object.assign({}, state, { views: action.data });
      return retState;
    case 'USERS':
      retState = Object.assign({}, state, { users: action.users });
      return retState;
    case 'ITEMTYPES':
      const itemTypes = action.itemTypes.reduce((accum, current) => {
        accum[current.id] = current;
        return accum;
      }, {});
      retState = Object.assign({}, state, { itemTypes: itemTypes });
      return retState;
    case 'REPORT':
      return state;
    default:
      return state;
  }
}
