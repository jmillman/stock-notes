import React, { useState, useContext, useEffect } from 'react';
import GlobalContext from '../store/GlobalContext';
import { Icon, Menu } from 'semantic-ui-react';
import StockNotesPage from './stocks/StockNotesPage';
import ChartPage from './stocks/ChartPage';

const tabs = {
  STOCK_NOTES_PAGE: 'Stonks',
  CHART: 'Chart',
};

function PageMobile() {
  const [state, ,] = useContext(GlobalContext);

  const [selectedTab, setSelectedTab] = useState(tabs.STOCK_NOTES_PAGE);

  function getContent() {
    switch (selectedTab) {
      case tabs.STOCK_NOTES_PAGE:
        return <StockNotesPage />;
      case tabs.CHART:
        return <ChartPage />;

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
