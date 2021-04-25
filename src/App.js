import React from 'react';
import StockNotesPage from './components/stocks/StockNotesPage';
import PageMobile from './components/PageMobile';
import { withGlobalContext } from './store/GlobalContext';

function App() {
  return (
    <>
      {/* <StockNotesPage /> */}
      <PageMobile />
    </>
  );
}

export default withGlobalContext(App);
