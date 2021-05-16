import anychart from 'anychart';
import AnyChart from 'anychart-react';
import _ from 'lodash';
import moment from 'moment';
import { default as React, useContext, useEffect, useState } from 'react';
import { Divider, Grid, Table } from 'semantic-ui-react';
import GlobalContext from '../../store/GlobalContext';

function DailyChartPage(props) {
  const [, , api] = useContext(GlobalContext);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (props.symbol) {
      setData(null);
      api.fetchDailyChartDataFromApp(props.symbol, callback);
    }
  }, [props.symbol]);

  async function callback(result) {
    setData(result);
  }

  function MyChart(props) {
    if (!data) return null;

    const chart = anychart.stock();

    var dataTable = anychart.data.table();
    const filteredData = data.filter((row) => {
      const rowDate = moment(row[0]);
      const propDate = moment(props.date);
    });

    dataTable.addData(data);

    let mapping = dataTable.mapAs();
    mapping.addField('open', 1);
    mapping.addField('high', 2);
    mapping.addField('low', 3);
    mapping.addField('close', 4);
    mapping.addField('volume', 5);

    var series = chart.plot(0).candlestick(mapping);
    series.name(`${props.symbol} ${props.date} daily ${props.date}`);
    series.risingFill('red');
    series.risingStroke('red');
    series.fallingFill('green');
    series.fallingStroke('green');

    var plot = chart.plot(0);
    var controller = plot.annotations();

    var volumeMapping = dataTable.mapAs({ value: 5 });
    chart.scroller().area(volumeMapping);

    // create EMA indicators with period 20
    var ema20 = plot.sma(mapping, 20).series();
    ema20.stroke('#bf360c');

    chart.selectRange(
      `${moment(props.date).subtract(40, 'day').toISOString()}`,
      `${props.date}  16:00:00`
    );

    return (
      <>
        <AnyChart
          height={600}
          instance={chart}
          title={`${props.symbol} Daily`}
          key={`${props.symbol} Daily`}
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

export default DailyChartPage;
