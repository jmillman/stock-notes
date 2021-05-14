import _ from 'lodash';
import { default as React, useState } from 'react';
import { Button, Divider } from 'semantic-ui-react';
import TradeDetails from './TradeDetails';

function TradesPage(props) {
  const [symbolAndDate, setSymbolAndDate] = useState({});

  function getData() {
    let trades = [];
    const dates = _.uniq(props.trades.map((t) => t['dateTime']));
    dates &&
      dates.forEach((date) => {
        const symbols = _.uniq(
          props.trades
            .filter((t) => t['dateTime'] === date)
            .map((t) => t['Symb'])
        );
        let symbolArea = [];
        symbols.forEach((s) => {
          symbolArea.push(
            <Button
              inverted
              color="red"
              key={date + s}
              onClick={() => setSymbolAndDate({ symbol: s, date })}
            >
              {s}
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
      <TradeDetails
        {...props}
        symbol={symbolAndDate.symbol}
        date={symbolAndDate.date}
      />
      {getData()}
    </>
  );
}

export default TradesPage;
