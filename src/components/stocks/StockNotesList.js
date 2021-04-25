import moment from 'moment';
import _ from 'lodash';
import React, { useContext, useState, useEffect } from 'react';
import GlobalContext from '../../store/GlobalContext';
import StockDetails from './StockDetails';
import NotesList from './NotesList';
import FavoritesIcon from './FavoritesIcon';

import { Divider, Header, Icon, Radio, Table, Label } from 'semantic-ui-react';

function StockNotesList(props) {
  const [state, , api] = useContext(GlobalContext);
  const [data, setData] = useState({});
  const [, setFormStatus] = useState(null);

  const showFilter = _.get(state, 'settings.showFilter', false);
  const showDetailView = _.get(state, 'settings.showDetailView', false);
  const showAllDates = _.get(state, 'settings.showAllDates', false);
  const showOnlyFavorites = _.get(state, 'settings.showOnlyFavorites', false);
  const favoriteStocks = _.get(state, 'settings.favoriteStocks', []);

  useEffect(() => {}, [showOnlyFavorites, showFilter]);

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

  function getShortFloatLabel(value) {
    const num = Number(_.get(value, 'Short Float', '').replace('%', ''));
    let color = 'red';
    if (num >= 15) color = '';
    if (num >= 20) color = 'green';
    return (
      <Label color={color} horizontal>
        {_.get(value, 'Short Float', '')}
      </Label>
    );
  }


  function getFloatLabel(value) {
    const cap = _.get(value, 'Shs Float', '');
    let color = 'red';
    if (!cap.includes('B')) {
      const num = Number(_.get(value, 'Shs Float', '').replace('M', ''));
      if (num <= 20) color = '';
      if (num <= 10) color = 'green';
    }

    return (
      <Label color={color} horizontal>
        {_.get(value, 'Shs Float', '')}
      </Label>
    );
  }

  function getMarketCapLabel(value) {
    const cap = _.get(value, 'Market Cap', '');
    let color = 'red';
    if (!cap.includes('B')) {
      const num = Number(_.get(value, 'Market Cap', '').replace('M', ''));
      if (num <= 20) color = 'blue';
      if (num <= 3) color = 'green';
    }

    return (
      <Label color={color} horizontal>
        {_.get(value, 'Market Cap', '')}
      </Label>
    );
  }

  function getCondensedView() {
    let notes = [];

    if (Object.keys(data).length) {
      console.log(data);
      _.forEach(data, (value, symbol) => {
        (!showOnlyFavorites || favoriteStocks.includes(symbol)) &&
          notes.push(
            <span key={symbol}>
              <Table celled key={symbol}>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Symbol</Table.HeaderCell>
                    <Table.HeaderCell>Float</Table.HeaderCell>
                    <Table.HeaderCell>Cap</Table.HeaderCell>
                    <Table.HeaderCell>Short Float</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body key={symbol}>
                  <Table.Row>
                    <Table.Cell>
                      {symbol} <FavoritesIcon symbol={symbol} />
                    </Table.Cell>
                    <Table.Cell>{getFloatLabel(value)}</Table.Cell>
                    <Table.Cell>{getMarketCapLabel(value)}</Table.Cell>
                    <Table.Cell>{getShortFloatLabel(value)}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell colSpan={4}>
                      <NotesList
                        symbol={symbol}
                        showOnlyFavorites={showOnlyFavorites}
                      />
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </span>
          );
      });
    }
    return notes;
  }

  function getDetailsView() {
    let notes = [];

    if (Object.keys(data).length) {
      _.forEach(data, (value, symbol) => {
        (!showOnlyFavorites || favoriteStocks.includes(symbol)) &&
          notes.push(
            <span key={symbol}>
              <StockDetails data={value} symbol={symbol} />
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
      {showFilter && (
        <Table celled>
          <Table.Header
            onDoubleClick={() => api.updateSettings('showFilter', false)}
          >
            <Table.Row>
              <Table.HeaderCell>Show all Dates</Table.HeaderCell>
              <Table.HeaderCell>Details View</Table.HeaderCell>
              <Table.HeaderCell>Favorites</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <Radio
                  toggle
                  checked={showAllDates}
                  onClick={() =>
                    api.updateSettings('showAllDates', !showAllDates)
                  }
                />
              </Table.Cell>
              <Table.Cell>
                <Radio
                  toggle
                  checked={showDetailView}
                  onClick={() =>
                    api.updateSettings('showDetailView', !showDetailView)
                  }
                />
              </Table.Cell>
              <Table.Cell>
                <Radio
                  toggle
                  checked={showOnlyFavorites}
                  onClick={() =>
                    api.updateSettings('showOnlyFavorites', !showOnlyFavorites)
                  }
                />
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      )}
      {showDetailView ? getDetailsView() : getCondensedView()}
    </>
  );
}

export default StockNotesList;
