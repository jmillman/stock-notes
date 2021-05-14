import { default as React } from 'react';
import ChartPage from './ChartPage';

function TradeDetails(props) {
  return (
    <>
      <ChartPage {...props} key="ChartPage" />
    </>
  );
}

export default TradeDetails;
