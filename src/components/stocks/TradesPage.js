import { default as React, useContext, useEffect, useState } from 'react';
import GlobalContext from '../../store/GlobalContext';
import AnyChart from 'anychart-react';
import anychart from 'anychart';
import msft from '../../data/msft';
import moment from 'moment';
import ChartPage from './ChartPage';
import TradeDetails from './TradeDetails';

function TradesPage(props) {
  return (
    <>
      Trades Page
      <TradeDetails {...props} />
    </>
  );
}

export default TradesPage;
