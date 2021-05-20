import anychart from 'anychart';
import AnyChart from 'anychart-react';
import moment from 'moment';
import { default as React, useContext, useEffect, useState } from 'react';
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
    const filtered = result.filter((q) => {
      return (
        moment
          .duration(moment(q[0]).diff(moment(`${props.date} 23:59:59`)))
          .asDays() < 0
      );
    });
    setData(filtered);
  }

  function MyChart(props) {
    if (!data) return null;

    const chart = anychart.stock();
    var plotCandlestick = chart.plot(0);

    var dataTable = anychart.data.table();

    dataTable.addData(data);

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

    // add volume to the scroller
    chart.scroller().area(dataTable.mapAs({ value: 5 }));

    // create second plot
    var volumePlot = chart.plot(1);
    // set yAxis labels formatter
    volumePlot.yAxis().labels().format('{%value}{scale:(1000000)(1)|(M)}');
    // set crosshair y-label formatter
    volumePlot.crosshair().yLabel().format('{%value}{scale:(1000000)(1)|(M)}');

    var volumeSeries = volumePlot.column(dataTable.mapAs({ value: 5 }));
    volumeSeries.name('Volume');

    // create EMA indicators with period 20
    var ema20 = plotCandlestick.sma(mapping, 20).series();
    ema20.stroke('#bf360c');

    chart.selectRange(
      `${moment(props.date).subtract(89, 'day').toISOString()}`,
      `${moment(props.date).add(1, 'day').toISOString()}`
    );

    var rangeSelector = anychart.ui.rangeSelector();
    rangeSelector.render(chart);

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
