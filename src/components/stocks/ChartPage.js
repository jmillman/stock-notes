import anychart from 'anychart';
import AnyChart from 'anychart-react';
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
    setData(result);
  }

  function MyChart() {
    if (!data) return null;

    const chart = anychart.stock();

    var firstPlot = chart.plot(0);
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
    // chart type
    // set the series
    var series = chart.plot(0).candlestick(mapping);
    series.name('ACME Corp. stock prices');

    // firstPlot.area(msftDataTable.mapAs({ value: 4 })).name(props.symbol);
    // chart.scroller().area(msftDataTable.mapAs({ value: 4 }));

    var plot = chart.plot(0);
    var controller = plot.annotations();
    let total = 0;
    let trade_tickets = [];

    var valueMapping = dataTable.mapAs({ value: 5 });
    chart.scroller().area(valueMapping);

    var vwap = plot.vwap(mapping);
    vwap.series().stroke('#1976d2', 3);

    props.trades.forEach((trade) => {
      if (
        trade['Symb'] === props.symbol &&
        trade['DateTime'].includes(props.date)
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

    return (
      <>
        {trade_tickets.map((trade) => {
          return (
            <Label key={JSON.stringify(trade)}>
              {trade.Time} {trade.Side} {trade.Price} {trade.Qty} {trade.Side} X
            </Label>
          );
        })}
        <Divider />
        <Container>{total.toFixed(2)}</Container>
        <AnyChart height={600} instance={chart} title={props.symbol} />
      </>
    );
  }
  return (
    <>
      <MyChart />
    </>
  );
}

export default ChartPage;
