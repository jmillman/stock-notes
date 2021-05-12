import { default as React, useContext, useEffect, useState } from 'react';
import GlobalContext from '../../store/GlobalContext';
import AnyChart from 'anychart-react';
import anychart from 'anychart';
import msft from '../../data/msft';
import moment from 'moment';

function ChartPage(props) {
  const [, , api] = useContext(GlobalContext);
  const [data, setData] = useState(null);
  const [, setFormStatus] = useState(null);
  
  useEffect(() => {
    api.fetchChartDataFromApp(props.symbol, callback);
  }, [props.trades]);

  async function callback(result) {
    setFormStatus({ status: result.status, message: result.message });
    if (result.status === 'success') {
      setData(result.data);
    }  
  }

  function MyChart(){
    if(!data) return null;

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
    var msftDataTable = anychart.data.table();
    msftDataTable.addData(scrubbedData);

    firstPlot.area(msftDataTable.mapAs({ value: 4 })).name(props.symbol);
    chart.scroller().area(msftDataTable.mapAs({ value: 4 }));

    var plot = chart.plot(0);
    var controller = plot.annotations();
    props.trades.forEach((trade) => {
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
      marker2.size(30);
      marker2.offsetY(-10);
      marker2.normal().fill(color);
      marker2.normal().stroke('#006600', 1, '10 2');
      marker2.hovered().stroke('#00b300', 2, '10 2');
      marker2.selected().stroke('#00b300', 4, '10 2');
    });

    chart.selectRange(
      `${props.date}T08:59:00.000Z`,
      `${props.date}T16:00:00.000Z`
    );

    return(
      <AnyChart height={600} instance={chart} title={props.symbol} />
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
