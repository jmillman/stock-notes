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
  const url = `${domain}/minute_data?symbol=${symbol}&date=${date}`;
  const response = await axios.get(url);
  if (response.status === 200) {
    const ret = response.data.data.map((row) => {
      row[0] = moment(row[0]).subtract(8, 'hour').toISOString();
      return row;
    });
    callback(ret);
  }
}

export async function fetchDailyChartData(symbol, callback) {
  if (typeof symbol !== 'string' && typeof callback !== 'function')
    throw new Error('fetchDailyChartData input Error');
  const url = `${domain}/daily_data?symbol=${symbol}`;
  const response = await axios.get(url);
  if (response.status === 200) {
    // There is an issue on the chart date conversoin where it sets it to the next day so strip it for daily
    const scrubbed = response.data.data.map((row)=>{
      const newDate = row[0].split(' ')[0];
      row[0] = newDate
      return row;
    })
    callback(scrubbed);
  }
}

export async function fetchTrades(date, callback) {
  if (typeof symbol !== 'string' && typeof callback !== 'function')
    throw new Error('get_trades input Error');
  const url = `${domain}/get_trades?date=${date}`;
  let response = await axios.get(url);
  if (response.status === 200) {
    // sort by date, symbol, time, if the last trade is the same symbol, same direction, within 2 min, add it to previous
    // Buy 20 SPY 10:10:11, BUY 80 SPY 10:10:12 would make one row of BUY 100 SPY 10:10:11
    let trades = JSON.parse(response.data.data);
    // trades = _.sortBy(trades, ['Symb', 'DateTime']);
    // trades = _.sortBy(trades, ['Date', 'Symb', 'Time']);
    trades = _.orderBy(
      trades,
      ['Date', 'Symb', 'Time'],
      ['desc', 'asc', 'asc']
    );

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

    let tradesObj = {};
    let openOrders = [];
    let orderCount = 0;
    trades.forEach((trade) => {
      openOrders.push(trade);
      orderCount += trade.Qty * (trade.Side === 'B' ? -1 : 1);
      // if orderCount is 0 buy and sell orders equal, trade closed
      if (orderCount === 0) {
        tradesObj[
          `${openOrders[0].DateTime} ${openOrders[0].Symb} ${
            openOrders[0].Side === 'SS' ? 'Short' : 'Long'
          }`
        ] = openOrders;
        openOrders = [];
      }
    });

    callback(tradesObj);
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

export async function fetchFinviz(callback) {
  if (typeof callback !== 'function')
    throw new Error('fetchFinviz input Error');
  const url = `${domain}/stock_notes?date=ALL`;
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
