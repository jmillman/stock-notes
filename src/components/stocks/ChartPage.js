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
  const symbol = 'TSLA';

  useEffect(() => {
    api.fetchChartDataFromApp(symbol, callback);
  }, []);

  async function callback(result) {

    
    setFormStatus({ status: result.status, message: result.message });
    if (result.status === 'success') {


      const scrubbedData = result.data
      .map((row) => {
        row[0] = moment(row[0]).subtract(8, 'hour').toISOString();
        return row;
      })
      .filter((row) => {
        return row[0].includes('2021-04-28');
      });      
      // setData(result.data);
      // debugger;
      const version = 6;
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
            return row[0].includes('2021-04-28');
          })
        );
        firstPlot.area(msftDataTable.mapAs({ value: 4 })).name(symbol);
        chart.scroller().area(msftDataTable.mapAs({ value: 4 }));
        // chart.selectRange('2021-04-28', '2021-04-29');
        setData(<AnyChart height={600} instance={chart} title="Stock demo" />);
        console.log(data);
      }
      if (version === 4) {
        var msftDataTable = anychart.data.table();
        msftDataTable.addData(scrubbedData);
        firstPlot.area(msftDataTable.mapAs({ value: 4 })).name(symbol);
        chart.scroller().area(msftDataTable.mapAs({ value: 4 }));
        chart.selectRange('2021-04-19T08:59:00.000Z', '2021-04-19T16:00:00.000Z');
        setData(<AnyChart height={600} instance={chart} title={symbol} />);
        console.log(scrubbedData);
      }
      if (version === 5) {
        var msftDataTable = anychart.data.table();
        msftDataTable.addData(scrubbedData);
        
        firstPlot.area(msftDataTable.mapAs({ value: 4 })).name(symbol);
        chart.scroller().area(msftDataTable.mapAs({ value: 4 }));

        setData(<AnyChart height={600} instance={chart} title={symbol} />);
        console.log(scrubbedData);
      }
      if (version === 6) {
        var msftDataTable = anychart.data.table();
        msftDataTable.addData(scrubbedData);
        
        firstPlot.area(msftDataTable.mapAs({ value: 4 })).name(symbol);
        chart.scroller().area(msftDataTable.mapAs({ value: 4 }));
        // chart.selectRange('2021-04-19T08:59:00.000Z', '2021-04-19T16:00:00.000Z');
        // 702.07,703.75,701.85,703.18,87981,2021-04-19 14:55:00,TSLA
        // scrubbedData.filter((row)=>{return row[0] === '2021-04-19T10:55:00.000Z'})


        var plot = chart.plot(0);
        var controller = plot.annotations();

        var marker2 = controller.marker();
        marker2.xAnchor("2021-04-19T10:55:00.000Z");
        marker2.valueAnchor(702.07);
        marker2.markerType("arrow-down");
        marker2.size(30);
        marker2.offsetY(-40);
        marker2.normal().fill("none");
        marker2.normal().stroke("#006600", 1, "10 2");
        marker2.hovered().stroke("#00b300", 2, "10 2");
        marker2.selected().stroke("#00b300", 4, "10 2");
        

        var marker1 = controller.marker();
        marker1.xAnchor("2021-04-19T13:45:00.000Z");
        marker1.valueAnchor(714.58);
        marker1.markerType("arrow-up");
        marker1.size(30);
        marker1.offsetY(-40);
        marker1.normal().fill("none");
        marker1.normal().stroke("#006600", 1, "10 2");
        marker1.hovered().stroke("#00b300", 2, "10 2");
        marker1.selected().stroke("#00b300", 4, "10 2");
        

        setData(<AnyChart height={600} instance={chart} title="TSLA" />);
        console.log(scrubbedData);
      }
    }
  }

  return <>{data}</>;
}

export default ChartPage;
