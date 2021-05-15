import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';

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

export async function fetchChartData(symbol, date, callback) {
  if (
    typeof symbol !== 'string' &&
    typeof date !== 'string' &&
    typeof callback !== 'function'
  )
    throw new Error('fetchChartData input Error');
  const url = `${domain}/daily_data?symbol=${symbol}&date=${date}`;
  const response = await axios.get(url);
  if (response.status === 200) {
    const ret = response.data.data.map((row) => {
      row[0] = moment(row[0]).subtract(8, 'hour').toISOString();
      return row;
    });
    callback(ret);
  }
}

export async function fetchTrades(date, callback) {
  if (typeof symbol !== 'string' && typeof callback !== 'function')
    throw new Error('get_trades input Error');
  const url = `${domain}/get_trades?date=${date}`;
  let response = await axios.get(url);
  if (response.status === 200) {
    var start = new Date().getTime();

    // sort by date, symbol, time, if the last trade is the same symbol, same direction, within 2 min, add it to previous
    // Buy 20 SPY 10:10:11, BUY 80 SPY 10:10:12 would make one row of BUY 100 SPY 10:10:11
    let trades = JSON.parse(response.data.data);
    // trades = _.sortBy(trades, ['Symb', 'DateTime']);
    trades = _.sortBy(trades, ['Date', 'Symb', 'Time']);

    let lastTrade = null;
    trades = trades.reduce((accum, trade) => {
      const tradeWithinTwoMinute =
        lastTrade &&
        Math.abs(
          moment
            .duration(moment(lastTrade.DateTime).diff(moment(trade.DateTime)))
            .asMinutes()
        ) <= 2 &&
        trade.Side === lastTrade.Side &&
        trade.Symb === lastTrade.Symb;

      if (tradeWithinTwoMinute) {
        // Just add the Qty, and average the price
        lastTrade.Price =
          (lastTrade.Price * lastTrade.Qty + trade.Price * trade.Qty) /
          (lastTrade.Qty + trade.Qty);
        lastTrade.Qty = lastTrade.Qty + trade.Qty;
      } else {
        accum[`${trade.DateTime}${trade.Symb}${trade.Side}`] = trade;
        lastTrade = trade;
      }
      return accum;
    }, {});
    lastTrade = null;

    trades = Object.values(trades);

    console.log(
      'Elapsed ' + (new Date().getTime() - start) / 1000 + ' seconds.'
    );

    callback(trades);
  }
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

export async function deleteNote(date, callback) {
  const bodyFormData = new FormData();
  bodyFormData.set('edit_id', date);
  const url = `${domain}/delete_note`;
  const response = await axios.post(url, bodyFormData);
  if (callback) {
    callback(response.data);
  }
}
