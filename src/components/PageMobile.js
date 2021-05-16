import React, { useState, useContext, useEffect } from 'react';
import GlobalContext from '../store/GlobalContext';
import { Menu } from 'semantic-ui-react';
import StockNotesPage from './stocks/StockNotesPage';
import TradeSelectionPage from './stocks/TradeSelectionPage';

const tabs = {
  STOCK_NOTES_PAGE: 'Stonks',
  CHART: 'Chart',
};

function PageMobile() {
  const [state, , api] = useContext(GlobalContext);

  const [selectedTab, setSelectedTab] = useState(tabs.CHART);
  const [trades, setTrades] = useState([]);

  // const date = '2021-05-10';
  const date = 'ALL';

  useEffect(() => {
    api.fetchTradesFromApp(date, tradesCallback);
    api.fetchFinvizFromApp();
  }, []);

  async function tradesCallback(result) {
    setTrades(result);
  }

  function getContent() {
    switch (selectedTab) {
      case tabs.STOCK_NOTES_PAGE:
        return <StockNotesPage />;
      case tabs.CHART:
        return <TradeSelectionPage trades={trades} />;

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
