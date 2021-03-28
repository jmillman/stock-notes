import axios from 'axios';

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
  if (typeof date !== 'string' && typeof 'callback' !== 'function')
    throw new Error('fetchStockNotes input Error');
  const url = `${domain}/stock_notes?date=${date}`;
  const response = await axios.get(url);
  callback(response.data);
}
