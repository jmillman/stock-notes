import { default as React, useContext, useEffect, useState } from 'react';
import GlobalContext from '../../store/GlobalContext';
import AnyChart from 'anychart-react';
import anychart from 'anychart';
import msft from '../../data/msft';
import moment from 'moment';
import { Checkbox, Segment, Divider } from 'semantic-ui-react';
import ChartPage from './ChartPage';

function TradeDetails(props) {

  function getData() {
    let total = 0;
    let trades = [];
    props.trades &&
      props.trades.forEach((trade) => {
        total += trade.Qty * trade.Price * (trade.Side === 'B' ? -1 : 1);
        trades.push(
          <span key={trade.Time}>
              {trade.Time} {trade.Side} {trade.Price} {trade.Qty}
              <Divider />
          </span>
        );
      });
    trades.push(<div key="total">{total.toFixed(2)}</div>);
    return trades;
  }
  return (
    <>
      {getData()}
      <ChartPage {...props} key="ChartPage" />
    </>
  );
}

export default TradeDetails;
