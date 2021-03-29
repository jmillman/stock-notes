import _ from 'lodash';
import React, { useState } from 'react';
import { Button, Divider, Grid, Segment, Popup } from 'semantic-ui-react';
import NotesList from './NotesList';

function StockDetails(props) {
  function getDetails() {
    const [showDescription, setShowDescription] = useState(false);
    const { stockInfo } = props.data;
    const [sector, industry, country] = stockInfo['sectorsAndCountry'].split(
      ' | '
    );
    const { symbol } = stockInfo;
    return (
      <table>
        <tbody>
          <tr>
            <td>{'symbol'}</td>
            <td>{symbol}</td>
          </tr>
          <tr>
            <td>{'name'}</td>
            <td>{stockInfo['name']}</td>
          </tr>
          <tr>
            <td>{'marketCap'}</td>
            <td>{stockInfo['marketCap']}</td>
          </tr>
          <tr>
            <td>{'float'}</td>
            <td>{stockInfo['float']}</td>
          </tr>
          <tr>
            <td>{'sharesOutstanding'}</td>
            <td>{stockInfo['sharesOutstanding']}</td>
          </tr>
          <tr>
            <td>{'shortOfFloat'}</td>
            <td>{stockInfo['shortOfFloat']}</td>
          </tr>
          <tr>
            <td>{'price'}</td>
            <td>{stockInfo['price']}</td>
          </tr>
          <tr>
            <td>{'sector'}</td>
            <td>{sector}</td>
          </tr>
          <tr>
            <td>{'industry'}</td>
            <td>{industry}</td>
          </tr>
          <tr>
            <td>{'country'}</td>
            <td>{country}</td>
          </tr>
          <tr>
            <td>
              <a onClick={() => setShowDescription(!showDescription)}>
                Company Description
              </a>
            </td>
          </tr>
          {showDescription ? (
            <tr>
              <td colSpan="2">{stockInfo['profile']}</td>
            </tr>
          ) : null}
        </tbody>
      </table>
    );
  }

  return (
    <>
      <Segment placeholder>
        <Grid columns={2} relaxed="very" stackable>
          <Grid.Column>{getDetails()}</Grid.Column>

          <Grid.Column verticalAlign="middle">
            <NotesList symbol={props.symbol} />
          </Grid.Column>
        </Grid>

        <Divider vertical>{props.symbol}</Divider>
      </Segment>
    </>
  );
}

export default StockDetails;
