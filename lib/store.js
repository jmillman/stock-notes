import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers/reducer';
import createSagaMiddleware from 'redux-saga';
import * as sagas from './sagas';

const initSagas = (sagasMiddleware) => {
  Object.values(sagas).forEach(sagasMiddleware.run.bind(sagasMiddleware));
};
// const initialState = {};

export default (() => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    reducers,
    // initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(sagaMiddleware)
  );
  initSagas(sagaMiddleware);

  // import co from 'co';
  // import * as effects from 'redux-saga/effects';
  // import { delay, eventChannel, channel } from 'redux-saga';
  //for testing saga stuff in the browser
  // window.store = store;
  // // window.co = co;
  // window.run = (generatorFn)=>sagaMiddleware.run(generatorFn);
  // window.effects = effects;
  // window.dispatch = (action)=>store.dispatch(action);
  // window.delay = delay;
  // window.eventChannel = eventChannel;
  // window.actionChannel = effects.actionChannel;
  // window.channel = channel;

  return store;
})();
