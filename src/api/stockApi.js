import axios from 'axios';
import moment from 'moment';

// lookup_symbol?symbol=${action.symbol}
const domain = 'http://127.0.0.1:5000/';

export async function addSymbol(symbol, callback) {
  try {
    const url = `${domain}/lookup_symbol?symbol=${symbol}`;
    const response = await axios.get(url);
    if (response.data) {
      callback(response.data);
    }
  } catch (ex) {
    console.error(ex);
  }
}

export async function fetchStockNotes(date, callback) {
  if (typeof date !== 'string' && typeof callback !== 'function')
    throw new Error('fetchStockNotes input Error');
  const url = `${domain}/stock_notes?date=${date}`;
  const response = await axios.get(url);
  callback(response.data);
}

export async function fetchMyNotes(callback) {
  if (typeof callback !== 'function')
    throw new Error('fetchMyNotes input Error');
  const url = `${domain}/get_notes`;
  const response = await axios.get(url);
  if (callback) {
    callback(response.data.data);
  }
}

export async function saveNote(symbol, title, body, date, callback) {
  const bodyFormData = new FormData();
  bodyFormData.set('symbol', symbol);
  bodyFormData.set('title', title);
  bodyFormData.set('body', body);
  bodyFormData.set('edit_id', date);
  bodyFormData.set('date_stamp', moment().format());
  const url = `${domain}/save_note`;
  const response = await axios.post(url, bodyFormData);
  if (callback) {
    callback(response.data);
  }
}
