import { default as React, useContext, useEffect, useState } from 'react';
import GlobalContext from '../../store/GlobalContext';
import AnyChart from 'anychart-react';
import anychart from 'anychart';
import msft from '../../data/msft';
import moment from 'moment';
import ChartPage from './ChartPage';
import TradeDetails from './TradeDetails';
import { Checkbox, Segment, Divider , Button} from 'semantic-ui-react';

function TradesPage(props) {
  const [symbol, setSymbol] = useState(null);

  function getData() {
    let trades = [];
    const dates = _.uniq(props.trades.map((t)=>t['dateTime']));
    dates &&
    dates.forEach((date) => {
        const symbols = _.uniq(props.trades.filter((t)=>t['dateTime']==date).map((t)=>t['Symb']));
        let symbolArea = [];
        symbols.forEach((s)=>{
          symbolArea.push(
            <Button inverted color='red' key={date+s} onClick={()=>setSymbol(s)}>{s}</Button>
          )

        })

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
      {getData()}
      <TradeDetails {...props} symbol={symbol}/>
    </>
  );
}

export default TradesPage;
