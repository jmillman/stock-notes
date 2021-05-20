import _ from 'lodash';
import { default as React, useState } from 'react';
import { Button, Divider } from 'semantic-ui-react';
import ChartPage from './ChartPage';
import DailyChartPage from './DailyChartPage';

function TradeSelectionPage(props) {
  // const [symbolAndDate, setSymbolAndDate] = useState({});
  const [symbolAndDate, setSymbolAndDate] = useState({
    symbol: 'AGEN',
    date: '2021-05-18',
  });

  function getData() {
    let trades = [];
    const dates = _.uniq(
      _.keys(props.trades).map((key) => {
        return props.trades[key][0].Date;
      })
    );

    dates &&
      dates.forEach((date) => {
        const symbols = _.uniq(
          _.keys(props.trades).map((key) => {
            return props.trades[key][0].Date === date
              ? props.trades[key][0].Symb
              : null;
          })
        ).filter((symb) => symb);

        let symbolArea = [];
        symbols.forEach((s) => {
          let total = 0;

          const tradeKeys = _.keys(props.trades).filter((key) => {
            return (
              props.trades[key][0]['Symb'] === s &&
              props.trades[key][0]['DateTime'].includes(date)
            );
          });
          tradeKeys.forEach((tradeKey) => {
            const trades = props.trades[tradeKey];
            trades.forEach((trade) => {
              total += trade.Qty * trade.Price * (trade.Side === 'B' ? -1 : 1);
            });
          });

          symbolArea.push(
            <Button
              inverted
              color={total > 0 ? 'green' : 'red'}
              key={date + s}
              onClick={() => setSymbolAndDate({ symbol: s, date })}
            >
              {s} {total.toFixed(0)}
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
      <DailyChartPage
        {...props}
        symbol={symbolAndDate.symbol}
        date={symbolAndDate.date}
      />
      {getData()}
    </>
  );
}

export default TradeSelectionPage;
