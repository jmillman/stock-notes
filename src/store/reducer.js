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
    case 'finvizLoaded':
      retState = Object.assign({}, state, { finviz: action.data });
      return retState;
    case 'noteCreated':
      retState = Object.assign({}, state, { noteAddedTimeStamp: moment() });
      return retState;
    case 'symbolCreated':
      retState = Object.assign({}, state, { symbolAddedTimeStamp: moment() });
      return retState;
    default:
      return state;
  }
}
