import { default as React, useContext, useEffect, useState } from 'react';
import GlobalContext from '../../store/GlobalContext';
import AnyChart from 'anychart-react';
import anychart from 'anychart';
import msft from '../../data/msft';
import moment from 'moment';
import { Checkbox, Segment } from 'semantic-ui-react';
import ChartPage from './ChartPage';

function TradeDetails(props) {
  const [selectedTrades, setSelectedTrades] = useState([]);

  useEffect(() => {
    // initially select all trades
    const tmp = [];
    props.trades.forEach((trade) => {
      tmp.push(trade.Time);
    });
    setSelectedTrades(tmp);
  }, [props.trades]);

  function handleClickCheckbox(tradeTime) {
    if (selectedTrades && selectedTrades.includes(tradeTime)) {
      setSelectedTrades(selectedTrades.filter((t) => t !== tradeTime));
    } else {
      setSelectedTrades(selectedTrades.concat(tradeTime));
    }
  }

  function getData() {
    let total = 0;
    let trades = [];
    props.trades &&
      props.trades.forEach((trade) => {
        total += trade.Qty * trade.Price * (trade.Side === 'B' ? -1 : 1);
        trades.push(
          <>
            <Segment key={trade.Time}>
              <Checkbox
                label={trade.Time}
                onClick={(e, data) => handleClickCheckbox(trade.Time)}
                checked={selectedTrades && selectedTrades.includes(trade.Time)}
              />
              {trade.Time} {trade.Side} {trade.Price} {trade.Qty}
            </Segment>
          </>
        );
      });
    trades.push(<div key="total">{total.toFixed(2)}</div>);
    return trades;
  }
  return (
    <>
      {getData()}
      <ChartPage {...props} selectedTrades={selectedTrades} key="a" />
    </>
  );
}

export default TradeDetails;
