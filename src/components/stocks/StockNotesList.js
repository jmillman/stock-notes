import moment from 'moment';
import _ from 'lodash';
import React, { useContext, useState, useEffect } from 'react';
import GlobalContext from '../../store/GlobalContext';
import StockDetails from './StockDetails';

import {
  Divider,
  Header,
  Icon,
  Radio,
  Table,
  Grid,
  Segment,
  Image,
} from 'semantic-ui-react';

function StockNotesList(props) {
  const [state, , api] = useContext(GlobalContext);
  const [data, setData] = useState({});
  const [, setFormStatus] = useState(null);
  const [showAllDates, setShowAllDates] = api.useLocalStorage(
    'showAllDates',
    false
  );
  const [showDetailView, setShowDetailView] = api.useLocalStorage(
    'showDetailView',
    false
  );

  const [date] = useState(moment().format('YYYY-MM-DD'));

  useEffect(() => {
    setFormStatus({ status: 'success', message: 'Fetching notes.....' });
    const date_parameter = showAllDates ? 'ALL' : date;
    api.fetchStockNotesFromApp(date_parameter, getNotesListCallback);
  }, [state.symbolAddedTimeStamp, showAllDates]);

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

  function getCondensedView() {
    let notes = [];

    if (Object.keys(data).length) {
      _.forEach(data, (value, key) => {
        notes.push(<Grid.Column key={key}>
          <Segment>
            {key}
          </Segment>
          </Grid.Column>);
      });
    }
    return (
      <Grid stackable columns={5}>
        {notes}
      </Grid>
    );
  }

  function getDetailsView() {
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

  return (
    <>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Show all Dates</Table.HeaderCell>
            <Table.HeaderCell>Details View</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Radio
                toggle
                checked={showAllDates}
                onClick={() => setShowAllDates(!showAllDates)}
              />
            </Table.Cell>
            <Table.Cell>
              <Radio
                toggle
                checked={showDetailView}
                onClick={() => setShowDetailView(!showDetailView)}
              />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>

      {showDetailView ? getDetailsView() : getCondensedView()}
    </>
  );
}

export default StockNotesList;
