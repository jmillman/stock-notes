import _ from 'lodash';
import { default as React, useState } from 'react';
import { Button, Divider } from 'semantic-ui-react';
import ChartPage from './ChartPage';

function TradeSelectionPage(props) {
  const [symbolAndDate, setSymbolAndDate] = useState({});

  function getData() {
    let trades = [];
    const dates = _.uniq(props.trades.map((t) => t['Date']));
    dates &&
      dates.forEach((date) => {
        const symbols = _.uniq(
          props.trades.filter((t) => t['Date'] === date).map((t) => t['Symb'])
        );
        let symbolArea = [];
        symbols.forEach((s) => {
          const total = props.trades
            .filter((trade) => {
              return trade['Symb'] === s && trade['DateTime'].includes(date);
            })
            .reduce((total, trade) => {
              total += trade.Qty * trade.Price * (trade.Side === 'B' ? -1 : 1);
              return total;
            }, 0);

          symbolArea.push(
            <Button
              inverted
              color={total > 0 ? 'green' : 'red'}
              key={date + s}
              onClick={() => setSymbolAndDate({ symbol: s, date })}
            >
              {s} {total.toFixed(2)}
            </Button>
          );
        });

        trades.push(
          <span key={date}>
            {date} {symbolArea}
            <Divider />
          </span>
        );
      });
    return trades;
  }

  return (
    <>
      <ChartPage
        {...props}
        symbol={symbolAndDate.symbol}
        date={symbolAndDate.date}
      />
      {getData()}
    </>
  );
}

export default TradeSelectionPage;
