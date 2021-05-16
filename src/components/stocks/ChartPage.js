import anychart from 'anychart';
import AnyChart from 'anychart-react';
import _ from 'lodash';
import { default as React, useContext, useEffect, useState } from 'react';
import { Divider, Grid, Table } from 'semantic-ui-react';
import GlobalContext from '../../store/GlobalContext';

function ChartPage(props) {
  const [, , api] = useContext(GlobalContext);
  const [data, setData] = useState(null);
  const [, setFormStatus] = useState(null);

  // get just the trades for the button clicked, which is that symbol and date
  const tradeKeys = _.keys(props.trades).filter((key) => {
    return (
      props.trades[key][0]['Symb'] === props.symbol &&
      props.trades[key][0]['DateTime'].includes(props.date)
    );
  });

  useEffect(() => {
    if (props.symbol) {
      setData(null);
      api.fetchChartDataFromApp(props.symbol, props.date, callback);
    }
  }, [props.trades, props.symbol]);

  async function callback(result) {
    setFormStatus({ status: result.status, message: result.message });
    setData(result);
  }

  function MyChart(props) {
    if (!data) return null;

    const chart = anychart.stock();

    const scrubbedData = data.filter((row) => {
      return row[0].includes(props.date);
    });

    var dataTable = anychart.data.table();
    dataTable.addData(scrubbedData);

    let mapping = dataTable.mapAs();
    mapping.addField('open', 1);
    mapping.addField('high', 2);
    mapping.addField('low', 3);
    mapping.addField('close', 4);
    mapping.addField('volume', 5);

    var series = chart.plot(0).candlestick(mapping);
    series.name(`${props.symbol} ${props.date} minute`);
    series.risingFill('red');
    series.risingStroke('red');
    series.fallingFill('green');
    series.fallingStroke('green');

    var plot = chart.plot(0);
    var controller = plot.annotations();

    var valueMapping = dataTable.mapAs({ value: 5 });
    chart.scroller().area(valueMapping);

    var vwap = plot.vwap(mapping);
    vwap.series().stroke('#1976d2', 3);

    let total = 0;
    tradeKeys.forEach((tradeKey) => {
      const trades = props.trades[tradeKey];
      trades.forEach((trade) => {
        total += trade.Qty * trade.Price * (trade.Side === 'B' ? -1 : 1);
        var marker2 = controller.marker();
        marker2.xAnchor(`${props.date}T${trade.Time}.000Z`);
        marker2.valueAnchor(trade.Price);
        let arrow = 'arrow-down';
        let color = 'red';
        if (trade.Side === 'B') {
          arrow = 'arrow-up';
          color = 'green';
      }
        else{
          marker2.offsetY(-20);
        }
        marker2.markerType(arrow);
        marker2.size(20);
        marker2.normal().fill(color);
        marker2.normal().stroke('#006600', 1, '10 2');
        marker2.hovered().stroke('#00b300', 2, '10 2');
        marker2.selected().stroke('#00b300', 4, '10 2');
      });
    });

    chart.selectRange(
      `${props.date}T08:59:00.000Z`,
      `${props.date}T16:00:00.000Z`
    );

    function getTable() {
      let ticketCount = 0;
      let tickets = [];
      let ret = [];
      let total = 0;
      tradeKeys.forEach((tradeKey) => {
        const trades = props.trades[tradeKey];
        trades.forEach((trade) => {
          total += trade.Qty * trade.Price * (trade.Side === 'B' ? -1 : 1);
          const qty = trade.Qty * (trade.Side === 'B' ? -1 : 1);
          ticketCount += qty;
          tickets.push(
            <Table.Row key={JSON.stringify(trade)}>
              <Table.Cell collapsing>{trade.Time}</Table.Cell>
              <Table.Cell>{trade.Side}</Table.Cell>
              <Table.Cell>{trade.Price.toFixed(2)}</Table.Cell>
              <Table.Cell>{trade.Qty}</Table.Cell>
            </Table.Row>
          );
          if (ticketCount === 0) {
            ret.push(
              <Grid.Column>
                <Table celled striped size="small">
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Time</Table.HeaderCell>
                      <Table.HeaderCell>Side</Table.HeaderCell>
                      <Table.HeaderCell>Price</Table.HeaderCell>
                      <Table.HeaderCell>Qty</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {tickets}
                    <Table.Row>
                      <Table.Cell colSpan="5">{total.toFixed(2)}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </Grid.Column>
            );
            tickets = [];
            total = 0;
          }
        });
      });
      return ret;
    }

    return (
      <>
        <Grid columns={4} stackable>
          {getTable()}
        </Grid>

        <Divider />
        <AnyChart
          height={600}
          instance={chart}
          title={`${props.symbol} ${total.toFixed(2)}`}
          key={`${props.symbol} ${total.toFixed(2)}`}
        />
      </>
    );
  }
  return (
    <>
      <MyChart {...props} />
    </>
  );
}

export default ChartPage;
