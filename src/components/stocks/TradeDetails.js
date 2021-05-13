import { default as React, useContext, useEffect, useState } from 'react';
import _ from 'lodash';
import GlobalContext from '../../store/GlobalContext';
import AnyChart from 'anychart-react';
import anychart from 'anychart';
import msft from '../../data/msft';
import moment from 'moment';
import { Checkbox, Segment, Divider } from 'semantic-ui-react';
import ChartPage from './ChartPage';

function TradeDetails(props) {

  return (
    <>
      <ChartPage {...props} key="ChartPage" />
    </>
  );
}

export default TradeDetails;
