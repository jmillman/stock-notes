// This is a wrapper to provide the application with global state, access the reducer to modify state
// exposes actions or api calls
// A component can access the context like this.... any updates to state will cause a rerender
// const [state, reducer, actions] = useContext(AppContext);
// The main app provides the context using this statement
// export default withGlobalContext(App);

import React, { useReducer, useEffect } from 'react';
import { createContext } from 'react';
import reducer from '../store/reducer';
import {
  fetchItems,
  deleteItem,
  addItemType,
  fetchUsers,
  fetchItemTypes,
  deleteItemType,
  AddItemInput,
  AddUserInput,
} from '../api/restApi';
import {
  addSymbol,
  fetchStockNotes,
  saveNote,
  fetchMyNotes,
  deleteNote,
  fetchChartData,
  fetchTrades,
  fetchDailyChartData,
} from '../api/stockApi';
import { useCookies } from 'react-cookie';
import moment from 'moment';

const GlobalContext = createContext();
export default GlobalContext;

export function withGlobalContext(Component) {
  return function contextComponent(props) {
    useEffect(() => {
      const settingsFromLocalStorage = window.localStorage.getItem('settings');
      dispatch({
        type: 'refreshSettingsFromLocalStorage',
        settings: JSON.parse(settingsFromLocalStorage),
      });
    }, []);

    const [state, dispatch] = useReducer(reducer, {
      data: [],
      taskLists: [],
      itemTypes: [],
      views: [],
      users: [],
      symbolAddedTimeStamp: null,
      noteAddedTimeStamp: null,
      notes: [],
    });
    const [userIdCookie, setUserIDCookie] = useCookies(['userId']);

    const fetchItemsFromApp = (userId) => {
      fetchItems(userId, (result) => {
        const taskCompleted = result.filter(
          (item) => item.recordType === 'taskCompleted'
        );
        const taskLists = result.filter(
          (item) => item.recordType === 'taskList'
        );
        const views = result.filter((item) => item.recordType === 'view');
        dispatch({ type: 'views', data: views });
        dispatch({ type: 'taskLists', data: taskLists });
        dispatch({ type: 'taskCompleted', data: taskCompleted });
      });
    };

    const fetchItemTypesFromApp = (userId) => {
      fetchItemTypes(userId, (result) =>
        dispatch({ type: 'ITEMTYPES', itemTypes: result })
      );
    };

    const fetchUsersFromApp = () => {
      fetchUsers((result) => {
        if (userIdCookie.userId) {
          const loggedInUser = result.find(
            ({ id }) => id === userIdCookie.userId
          );
          loginUserFromApp(loggedInUser);
        }
        dispatch({ type: 'USERS', users: result });
      });
    };

    // This will fetch all items, if necessary
    useEffect(() => {
      fetchUsersFromApp();
    }, []);

    const currentDate = moment().format('YYYY-MM-DD');

    const addItemTypeFromApp = (
      name,
      dataType_1,
      dataName_1,
      dataType_2,
      dataName_2,
      successCallback
    ) => {
      addItemType(
        state.loggedInUser.id,
        name,
        dataType_1,
        dataName_1,
        dataType_2,
        dataName_2,
        (result) => {
          successCallback(result);
          fetchItemTypesFromApp(state.loggedInUser.id);
        }
      );
    };

    const updateSettings = (key, value) => {
      dispatch({ type: 'settings', key, value });
    };

    const addSymbolFromApp = (symbol, successCallback) => {
      addSymbol(symbol, (result) => {
        dispatch({ type: 'symbolCreated' });
        successCallback(result);
      });
    };

    const fetchStockNotesFromApp = (date, successCallback) => {
      fetchStockNotes(date, (result) => {
        successCallback(result);
      });
    };

    const fetchTradesFromApp = (date, successCallback) => {
      fetchTrades(date, (result) => {
        successCallback(result);
      });
    };

    const fetchChartDataFromApp = (symbol, date, successCallback) => {
      fetchChartData(symbol, date, (result) => {
        successCallback(result);
      });
    };

    const fetchDailyChartDataFromApp = (symbol, successCallback) => {
      fetchDailyChartData(symbol, (result) => {
        successCallback(result);
      });
    };

    const fetchMyNotesFromApp = () => {
      fetchMyNotes((data) => {
        dispatch({ type: 'notesLoaded', data });
      });
    };

    const saveNoteFromApp = (symbol, title, body, date, successCallback) => {
      saveNote(symbol, title, body, date, (result) => {
        dispatch({ type: 'noteCreated' });
        successCallback(result);
        fetchMyNotesFromApp();
      });
    };

    const deleteNoteFromApp = (date, successCallback) => {
      deleteNote(date, (result) => {
        successCallback(result);
        fetchMyNotesFromApp();
      });
    };

    const createListFromApp = (name, checkboxValues, callback) => {
      const addItem = new AddItemInput(
        state.loggedInUser.id,
        'taskList',
        name,
        currentDate,
        null,
        checkboxValues
      );
      addItem.save((result) => {
        fetchItemsFromApp(state.loggedInUser.id);
        callback(result);
      });
    };

    const editListFromApp = (id, name, checkboxValues, callback) => {
      const item = new AddItemInput(
        state.loggedInUser.id,
        'taskList',
        name,
        currentDate,
        null,
        checkboxValues
      );
      item.editAndSave(id, (result) => {
        fetchItemsFromApp(state.loggedInUser.id);
        callback(result);
      });
    };

    const createUserFromApp = (userName, callback) => {
      const addUser = new AddUserInput(userName);

      addUser.save((result) => {
        callback(result);
        fetchUsersFromApp();
        // fetchItemsFromApp();
        // addSuccessCallback();
      });
    };

    const addItemFromApp = (value, typeId, date, addSuccessCallback) => {
      const addItem = new AddItemInput(
        state.loggedInUser.id,
        'taskCompleted',
        value,
        date,
        typeId,
        null
      );

      addItem.save((result) => {
        fetchItemsFromApp(state.loggedInUser.id);
        addSuccessCallback(result);
      });
    };

    const editViewFromApp = (viewId, name, viewJson, callback) => {
      const editItem = new AddItemInput(
        state.loggedInUser.id,
        'view',
        name,
        currentDate,
        null,
        viewJson
      );
      editItem.editAndSave(viewId, (result) => {
        fetchItemsFromApp(state.loggedInUser.id);
        callback(result);
      });
    };

    const addViewFromApp = (name, viewJson, callback) => {
      const addItem = new AddItemInput(
        state.loggedInUser.id,
        'view',
        name,
        currentDate,
        null,
        viewJson
      );

      addItem.save((result) => {
        fetchItemsFromApp(state.loggedInUser.id);
        callback(result);
      });
    };

    const deleteItemFromApp = (id, callback) => {
      deleteItem(id, (result) => {
        if (callback) {
          callback(result);
        }

        fetchItemsFromApp(state.loggedInUser.id);
      });
    };

    const deleteItemTypeFromApp = (id, callback) => {
      deleteItemType(id, (result) => {
        callback(result);
        fetchItemTypesFromApp(state.loggedInUser.id);
      });
    };

    const loginUserFromApp = (user) => {
      setUserIDCookie('userId', user.id);
      dispatch({ type: 'loginUser', user: user });
      fetchItemsFromApp(user.id);
      fetchItemTypesFromApp(user.id);
    };

    const api = {
      addItemFromApp,
      fetchItemsFromApp,
      deleteItemFromApp,
      addItemTypeFromApp,
      deleteItemTypeFromApp,
      createListFromApp,
      addViewFromApp,
      createUserFromApp,
      loginUserFromApp,
      editViewFromApp,
      editListFromApp,
      userIdCookie,
      addSymbolFromApp,
      fetchStockNotesFromApp,
      saveNoteFromApp,
      deleteNoteFromApp,
      fetchMyNotesFromApp,
      updateSettings,
      fetchChartDataFromApp,
      fetchTradesFromApp,
      fetchDailyChartDataFromApp,
    };

    return (
      <GlobalContext.Provider value={[state, dispatch, api]}>
        <Component {...props} />
      </GlobalContext.Provider>
    );
  };
}
