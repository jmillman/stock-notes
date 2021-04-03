import React from 'react';
import StockNotesPage from './components/stocks/StockNotesPage';
import { withGlobalContext } from './store/GlobalContext';

function App() {
  return (
    <>
      <StockNotesPage />
    </>
  );
}

export default withGlobalContext(App);
