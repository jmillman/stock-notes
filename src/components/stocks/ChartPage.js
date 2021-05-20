import anychart from 'anychart';
import AnyChart from 'anychart-react';
import _ from 'lodash';
import { default as React, useContext, useEffect, useState } from 'react';
import { Divider, Grid, Table } from 'semantic-ui-react';
import GlobalContext from '../../store/GlobalContext';

function ChartPage(props) {
  const [state, , api] = useContext(GlobalContext);
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

    var plotCandlestick = chart.plot(0);

    var dataTable = anychart.data.table();
    dataTable.addData(scrubbedData);

    let mapping = dataTable.mapAs();
    mapping.addField('open', 1);
    mapping.addField('high', 2);
    mapping.addField('low', 3);
    mapping.addField('close', 4);
    mapping.addField('volume', 5);

    var series = plotCandlestick.candlestick(mapping);
    series.name(`${props.symbol}`);
    series.risingFill('green');
    series.risingStroke('green');
    series.fallingFill('red');
    series.fallingStroke('red');

    chart.scroller().area(dataTable.mapAs({ value: 5 }));

    var plot = chart.plot(0);

    // create second plot
    var volumePlot = chart.plot(1);
    // set yAxis labels formatter
    volumePlot.yAxis().labels().format('{%Value}{scale:(1000)(1)|(k)}');
    // set crosshair y-label formatter
    volumePlot.crosshair().yLabel().format('{%Value}{scale:(1000)(1)|(k)}');

    // create volume series on the plot
    var volumeSeries = volumePlot.column(dataTable.mapAs({ value: 5 }));
    // set series settings
    volumeSeries.name('Volume');

    var vwap = plot.vwap(mapping);
    vwap.series().stroke('#1976d2', 3);

    var controller = plot.annotations();

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
        } else {
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
      `${props.date}T06:00:00.000Z`,
      `${props.date}T16:10:00.000Z`
    );

    // create vertical range annotation on the both plots
    plot
      .annotations()
      .verticalRange({
        xAnchor: `${props.date}T01:00:00.000Z`,
        secondXAnchor: `${props.date}T09:30:00.000Z`,
      })
      .allowEdit(false); // disable edit mode

    plot
      .annotations()
      .verticalRange({
        xAnchor: `${props.date}T16:00:00.000Z`,
        secondXAnchor: `${props.date}T24:00:00.000Z`,
      })
      .allowEdit(false); // disable edit mode

    plot
      .annotations()
      .verticalLine({
        xAnchor: `${props.date}T09:45:00.000Z`,
        stroke: {
          thickness: 2,
          color: '#60727B',
          dash: '10 15',
        },
      })
      .allowEdit(false);

    plot
      .annotations()
      .verticalLine({
        xAnchor: `${props.date}T10:00:00.000Z`,
        stroke: {
          thickness: 2,
          color: '#60727B',
          dash: '10 15',
        },
      })
      .allowEdit(false);
    plot
      .annotations()
      .verticalLine({
        xAnchor: `${props.date}T10:30:00.000Z`,
        stroke: {
          thickness: 2,
          color: '#60727B',
          dash: '10 15',
        },
      })
      .allowEdit(false);

    plot
      .annotations()
      .verticalLine({
        xAnchor: `${props.date}T11:00:00.000Z`,
        stroke: {
          thickness: 2,
          color: '#60727B',
          dash: '10 15',
        },
      })
      .allowEdit(false);

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
        <Table celled striped size="small">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Shs Float</Table.HeaderCell>
              <Table.HeaderCell>Market Cap</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                {_.get(state, `finviz.${props.symbol}['Shs Float']`)}
              </Table.Cell>
              <Table.Cell>
                {_.get(state, `finviz.${props.symbol}['Market Cap']`)}
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>

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
