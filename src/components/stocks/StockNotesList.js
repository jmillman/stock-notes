import moment from 'moment';
import _ from 'lodash';
import React, { useContext, useState, useEffect } from 'react';
import GlobalContext from '../../store/GlobalContext';
import StockDetails from './StockDetails';

import { Divider, Header, Icon } from 'semantic-ui-react';

function StockNotesList(props) {
  const [state, , api] = useContext(GlobalContext);
  const [data, setData] = useState({});
  const [, setFormStatus] = useState(null);
  const [date] = useState(moment().format('YYYY-MM-DD'));

  useEffect(() => {
    setFormStatus({ status: 'success', message: 'Fetching notes.....' });
    api.fetchStockNotesFromApp(date, getNotesListCallback);
  }, [state.symbolAddedTimeStamp]);

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

  function getList() {
    let notes = [];

    if (Object.keys(data).length) {
      _.forEach(data, (value, key) => {
        notes.push(
          <span key={key}>
            <StockDetails data={value} symbol={key} />
            <Divider horizontal>
              <Header as="h4">
                <Icon name="tag" />
              </Header>
            </Divider>
          </span>
        );
      });
    }
    return notes;
  }

  return <>{getList()}</>;
}

export default StockNotesList;
