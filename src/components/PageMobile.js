import React, { useState, useContext, useEffect } from 'react';
import GlobalContext from '../store/GlobalContext';
import { Icon, Menu } from 'semantic-ui-react';
import StockNotesPage from './stocks/StockNotesPage';
import TradesPage from './stocks/TradesPage';

const tabs = {
  STOCK_NOTES_PAGE: 'Stonks',
  CHART: 'Chart',
};

function PageMobile() {
  const [state, , api] = useContext(GlobalContext);

  const [selectedTab, setSelectedTab] = useState(tabs.STOCK_NOTES_PAGE);
  const [trades, setTrades] = useState([]);

  const date = '2021-04-28';
  const symbol = 'MVIS';

  useEffect(() => {
    api.fetchTradesFromApp(date, tradesCallback);
  }, []);

  async function tradesCallback(result) {
    const x = JSON.parse(result.data).filter((trade) => trade.Symb === symbol);
    setTrades(x);
  }

  function getContent() {
    switch (selectedTab) {
      case tabs.STOCK_NOTES_PAGE:
        return <StockNotesPage />;
      case tabs.CHART:
        return <TradesPage trades={trades} symbol={symbol} date={date} />;

      default:
        throw new Error('Component Not Found');
    }
  }
  function getMenu() {
    if (state.loggedInUser) {
      return (
        <>
          <Menu.Item
            name={tabs.STOCK_NOTES_PAGE}
            onClick={() => setSelectedTab(tabs.STOCK_NOTES_PAGE)}
          />
          <Menu.Item
            name={tabs.CHART}
            onClick={() => setSelectedTab(tabs.CHART)}
          />
        </>
      );
    }
    return null;
  }

  return (
    <>
      <Menu size="huge">{getMenu()}</Menu>
      {getContent()}
    </>
  );
}

export default PageMobile;
