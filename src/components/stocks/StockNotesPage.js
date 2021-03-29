import { default as React, useContext, useEffect, useState } from 'react';
import GlobalContext from '../../store/GlobalContext';
import AddSymbol from './AddSymbol';
import StockNotesList from './StockNotesList';

function StockNotesPage() {
  const [state, , api] = useContext(GlobalContext);
  const [, setData] = useState({});
  const [, setFormStatus] = useState(null);

  useEffect(() => {
    api.fetchMyNotesFromApp(getNotesListCallback);
  }, []);

  function resetForm() {
    setFormStatus(null);
  }

  async function getNotesListCallback(result) {
    setFormStatus({ status: result.status, message: result.message });
    if (result.status === 'success') {
      setTimeout(resetForm, 1000);
      setData(result.data);
    }
  }

  return (
    <>
      StockNotesPage
      <AddSymbol />
      <StockNotesList />
    </>
  );
}

export default StockNotesPage;
