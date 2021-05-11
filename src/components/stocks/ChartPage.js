import { default as React, useContext, useEffect, useState } from 'react';
import GlobalContext from '../../store/GlobalContext';
import AnyChart from 'anychart-react';
import anychart from 'anychart';
import msft from '../../data/msft';
import moment from 'moment';

function ChartPage() {
  const [, , api] = useContext(GlobalContext);
  const [data, setData] = useState(null);
  const [, setFormStatus] = useState(null);
  var chart = anychart.stock();
  var firstPlot = chart.plot(0);

  useEffect(() => {
    api.fetchChartDataFromApp(callback);
  }, []);

  async function callback(result) {
    setFormStatus({ status: result.status, message: result.message });
    if (result.status === 'success') {
      // setData(result.data);
      // debugger;
      const version = 4;
      if (version === 1) {
        var msftDataTable = anychart.data.table();
        msftDataTable.addData(msft);
        firstPlot.area(msftDataTable.mapAs({ value: 4 })).name('MSFT');
        chart.scroller().area(msftDataTable.mapAs({ value: 4 }));
        chart.selectRange('2005-01-03', '2005-11-20');
        setData(
          <AnyChart
            width={800}
            height={600}
            instance={chart}
            title="Stock demo"
          />
        );
      }
      if (version === 2) {
        var msftDataTable = anychart.data.table();
        msftDataTable.addData(msft);
        firstPlot.area(msftDataTable.mapAs({ value: 4 })).name('MSFT');
        chart.scroller().area(msftDataTable.mapAs({ value: 4 }));
        setData(
          <AnyChart
            width={800}
            height={600}
            instance={chart}
            title="Stock demo"
          />
        );
      }
      if (version === 3) {
        var msftDataTable = anychart.data.table();
        msftDataTable.addData(
          result.data.filter((row) => {
            return row[0].includes('2021-04-19');
          })
        );
        firstPlot.area(msftDataTable.mapAs({ value: 4 })).name('TSLA');
        chart.scroller().area(msftDataTable.mapAs({ value: 4 }));
        // chart.selectRange('2021-04-28', '2021-04-29');
        setData(<AnyChart height={600} instance={chart} title="Stock demo" />);
        console.log(data);
      }
      if (version === 4) {
        var msftDataTable = anychart.data.table();
        const scrubbedData = result.data
          .map((row) => {
            row[0] = moment(row[0]).subtract(8, 'hour').toISOString();
            return row;
          })
          .filter((row) => {
            return row[0].includes('2021-04-19');
          });

        msftDataTable.addData(scrubbedData);
        firstPlot.area(msftDataTable.mapAs({ value: 4 })).name('TSLA');
        chart.scroller().area(msftDataTable.mapAs({ value: 4 }));
        chart.selectRange('2021-04-19T08:59:00.000Z', '2021-04-19T16:00:00.000Z');
        setData(<AnyChart height={600} instance={chart} title="TSLA" />);
        console.log(scrubbedData);
      }
    }
  }

  return <>{data}</>;
}

export default ChartPage;
