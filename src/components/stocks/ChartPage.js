import anychart from 'anychart';
import AnyChart from 'anychart-react';
import _ from 'lodash';
import moment from 'moment';
import { default as React, useContext, useEffect, useState } from 'react';
import { Container, Divider, Label } from 'semantic-ui-react';
import GlobalContext from '../../store/GlobalContext';

function ChartPage(props) {
  const [, , api] = useContext(GlobalContext);
  const [data, setData] = useState(null);
  const [, setFormStatus] = useState(null);

  useEffect(() => {
    if (props.symbol) {
      setData(null);
      api.fetchChartDataFromApp(props.symbol, props.date, callback);
    }
  }, [props.trades, props.symbol]);

  async function callback(result) {
    setFormStatus({ status: result.status, message: result.message });
    if (result.status === 'success') {
      setData(result.data);
    }
  }

  function MyChart() {
    if (!data) return null;

    const chart = anychart.stock();

    var firstPlot = chart.plot(0);
    const scrubbedData = data
      .map((row) => {
        row[0] = moment(row[0]).subtract(8, 'hour').toISOString();
        return row;
      })
      .filter((row) => {
        return row[0].includes(props.date);
      });
    const version = 6;
    if (version === 6) {
      var dataTable = anychart.data.table();
      dataTable.addData(scrubbedData);

      let mapping = dataTable.mapAs();
      mapping.addField('open', 1);
      mapping.addField('high', 2);
      mapping.addField('low', 3);
      mapping.addField('close', 4);
      mapping.addField('volume', 5);
      // chart type
      // set the series
      var series = chart.plot(0).candlestick(mapping);
      series.name('ACME Corp. stock prices');

      // firstPlot.area(msftDataTable.mapAs({ value: 4 })).name(props.symbol);
      // chart.scroller().area(msftDataTable.mapAs({ value: 4 }));

      var plot = chart.plot(0);
      var controller = plot.annotations();
      let total = 0;
      let total2 = 0;
      let trade_tickets = [];

      var valueMapping = dataTable.mapAs({ value: 5 });
      chart.scroller().area(valueMapping);

      var vwap = plot.vwap(mapping);
      vwap.series().stroke('#1976d2', 3);

      props.trades.forEach((trade) => {
        if (
          trade['Symb'] === props.symbol &&
          trade['dateTime'] === props.date
        ) {
          trade_tickets.push(trade);
          total += trade.Qty * trade.Price * (trade.Side === 'B' ? -1 : 1);
          var marker2 = controller.marker();
          marker2.xAnchor(`${props.date}T${trade.Time}.000Z`);
          marker2.valueAnchor(trade.Price);
          let arrow = 'arrow-down';
          let color = '#FF0000';
          if (trade.Side === 'B') {
            arrow = 'arrow-up';
            color = '#00FFFF';
          }
          marker2.markerType(arrow);
          marker2.size(20);
          marker2.offsetY(-10);
          marker2.normal().fill(color);
          marker2.normal().stroke('#006600', 1, '10 2');
          marker2.hovered().stroke('#00b300', 2, '10 2');
          marker2.selected().stroke('#00b300', 4, '10 2');
        }
      });

      chart.selectRange(
        `${props.date}T08:59:00.000Z`,
        `${props.date}T16:00:00.000Z`
      );

      trade_tickets.sort(
        (a, b) =>
          moment(`${a.dateTime} ${a.Time}`) - moment(`${b.dateTime} ${b.Time}`)
      );

      function getTrades(trade_tickets) {
        let trades = _.cloneDeep(trade_tickets);
        trades = trades.reduce((accum, trade) => {
          total2 += trade.Qty * trade.Price * (trade.Side === 'B' ? -1 : 1);
          const tradeWithinOneMinute = _.find(_.keys(accum), (t) => {
            // return (trade.Side === accum[t].Side);
            return (
              Math.abs(
                moment
                  .duration(
                    moment(t).diff(moment(`${trade.dateTime} ${trade.Time}`))
                  )
                  .asMinutes()
              ) <= 2 && trade.Side === accum[t].Side
            );
          });
          if (tradeWithinOneMinute) {
            const firstTrade = accum[tradeWithinOneMinute];
            // Just add the Qty, and average the price
            firstTrade.Price =
              (firstTrade.Price * firstTrade.Qty + trade.Price * trade.Qty) /
              (firstTrade.Qty + trade.Qty);
            firstTrade.Qty = firstTrade.Qty + trade.Qty;
          } else {
            accum[`${trade.dateTime} ${trade.Time}`] = trade;
          }
          return accum;
        }, {});

        return Object.values(trades);
      }

      return (
        <>
          {getTrades(trade_tickets).map((trade) => {
            return (
              <Label key={JSON.stringify(trade)}>
                {trade.Time} {trade.Side} {trade.Price} {trade.Qty} {trade.Side}
              </Label>
            );
          })}
          <Divider />
          {/* {JSON.stringify(
            trade_tickets.sort(
              (a, b) =>
                moment(`${a.dateTime} ${a.Time}`) -
                moment(`${b.dateTime} ${b.Time}`)
            )
          )} */}
          <Container>{total}</Container>
          <Container>{total2}</Container>
          <AnyChart height={600} instance={chart} title={props.symbol} />
        </>
      );
    }
  }
  return (
    <>
      <MyChart />
    </>
  );
}

export default ChartPage;
