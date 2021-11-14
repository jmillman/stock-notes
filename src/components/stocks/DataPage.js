import _ from 'lodash';
import { default as React, useContext, useEffect, useState } from 'react';
import GlobalContext from '../../store/GlobalContext';

import { Button, Icon, Grid, Table } from 'semantic-ui-react';

function DataPage() {
  const [, , api] = useContext(GlobalContext);
  const [state, setState] = useState({
    data: [],
    filteredData: [],
    summary: [],
    hidden: [],
  });

  useEffect(() => {
    api.fetchDataFromApp(getDataCallback);
  }, []);

  async function getDataCallback(data) {
    filterAndSummarize({ hidden: [], data });
  }

  function toggleHidden(key) {
    let hidden = _.get(state, 'hidden', []);
    if (hidden.includes(key)) {
      hidden = _.without(hidden, key);
    } else {
      hidden.push(key);
    }
    filterAndSummarize({ hidden, data: state.data });
  }

  function filterAndSummarize({ hidden, data }) {
    const filteredData = data.filter((row) => {
      let valid = true;
      hidden.forEach((hiddenKey) => {
        const [key, value] = hiddenKey.split('--');
        if (row[key].toString() !== value) {
          valid = false;
        }
      });
      return valid;
    });

    const summary = filteredData.reduce((totals, row) => {
      _.forEach(row, (value, key) => {
        if (typeof value == 'boolean') {
          if (value === true) {
            totals[key] = 1 + (totals[key] ? totals[key] : 0);
          }
        }
      });
      return totals;
    }, {});

    const length = filteredData.length;
    _.forEach(summary, (value, key) => {
      summary[key] = (value / length) * 100;
    });

    const tmpState = Object.assign({}, state, {
      data: data,
      hidden: hidden,
      summary: summary,
      filteredData: filteredData,
    });
    setState(tmpState);
  }

  // function filterResults(hiddenStates) {
  //   const results = data;
  //   debugger;
  //   const summary = results.reduce((totals, row) => {
  //     _.forEach(row, (value, key) => {
  //       if (typeof value == 'boolean') {
  //         if (value === true) {
  //           totals[key] = 1 + (totals[key] ? totals[key] : 0);
  //         }
  //       }
  //     });
  //     return totals;
  //   }, {});

  //   const length = results.length;
  //   _.forEach(summary, (value, key) => {
  //     summary[key] = (value / length) * 100;
  //   });
  // }

  function getFiltersMenu() {
    console.log('getFiltersMenu');
    let returnArray = [];
    let row = _.get(state.data, '[0]', []);
    let booleanColumns = [];
    _.forEach(row, (value, key) => {
      if (typeof value == 'boolean') {
        booleanColumns.push(key);
      }
    });

    _.forEach(booleanColumns, (key) => {
      returnArray.push(
        <Table.Row key={key}>
          <Table.Cell>
            <Button icon>{key}</Button>
          </Table.Cell>
          <Table.Cell>
            <Button
              icon
              onClick={() => {
                toggleHidden(`${key}--true`);
              }}
            >
              {state.hidden.includes(`${key}--true`) ? (
                <Icon name="plus square"></Icon>
              ) : (
                <Icon name="plus square outline"></Icon>
              )}
            </Button>
          </Table.Cell>
          <Table.Cell>
            <Button
              icon
              onClick={() => {
                toggleHidden(`${key}--false`);
              }}
            >
              {state.hidden.includes(`${key}--false`) ? (
                <Icon name="plus square"></Icon>
              ) : (
                <Icon name="plus square outline"></Icon>
              )}
            </Button>
          </Table.Cell>
        </Table.Row>
      );
    });

    return (
      <Grid.Column>
        <Table celled striped size="small">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>True</Table.HeaderCell>
              <Table.HeaderCell>False</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{returnArray}</Table.Body>
        </Table>
      </Grid.Column>
    );
  }

  function getSummary(summary) {
    let retVal = [];
    if (!_.isEmpty(summary)) {
      _.forEach(summary, (value, key) => {
        retVal.push(
          <Table.Row key={key}>
            <Table.Cell>{key}</Table.Cell>
            <Table.Cell>{value}</Table.Cell>
          </Table.Row>
        );
      });

      return (
        <Table definition>
          <Table.Body>{retVal}</Table.Body>
        </Table>
      );
    }
  }

  function getRows(filteredData) {
    let retVal = [];
    if (!_.isEmpty(filteredData)) {
      _.forEach(filteredData, (row) => {
        retVal.push(
          <Table.Row key={row['symbol'] + row['date_only']}>
            <Table.Cell>{row['symbol']}</Table.Cell>
            <Table.Cell>{row['date_only']}</Table.Cell>
          </Table.Row>
        );
      });

      return (
        <Table definition key="trade_instances">
          <Table.Body>{retVal}</Table.Body>
        </Table>
      );
    }
  }

  return (
    <>
      <Grid>
        <Grid.Row>
          <Grid.Column width={5} key="filtermenu">
            {getFiltersMenu(state.hidden)}
          </Grid.Column>
          <Grid.Column width={5} key="summaryy">
            {getSummary(state.summary)}
          </Grid.Column>
          <Grid.Column width={5} key="stocks">
            {getRows(state.filteredData)}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
}

export default DataPage;
