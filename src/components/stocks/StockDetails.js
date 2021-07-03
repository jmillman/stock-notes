import _ from 'lodash';
import React, { useState } from 'react';
import { Divider, Grid, Segment } from 'semantic-ui-react';
import NotesList from './NotesList';
import FavoritesIcon from './FavoritesIcon';

function StockDetails(props) {
  function getDetails() {
    const [showDescription, setShowDescription] = useState(false);
    const stockInfo = _.get(props, 'data', {});

    return (
      <table>
        <tbody>
          <tr>
            <td>{'symbol'}</td>
            <td>
              {props.symbol}
              <FavoritesIcon symbol={props.symbol} />
            </td>
          </tr>
          <tr>
            <td>{'Shs Float'}</td>
            <td>{_.get(stockInfo, 'Shs Float', '')}</td>
          </tr>
          <tr>
            <td>{'Market Cap'}</td>
            <td>{_.get(stockInfo, 'Market Cap', '')}</td>
          </tr>
          <tr>
            <td>{'Short Float'}</td>
            <td>{_.get(stockInfo, 'Short Float', '')}</td>
          </tr>
          <tr>
            <td>{'SMA200'}</td>
            <td>{_.get(stockInfo, 'SMA200', '')}</td>
          </tr>
          <tr>
            <td>{'SMA50'}</td>
            <td>{_.get(stockInfo, 'SMA50', '')}</td>
          </tr>
          <tr>
            <td>{'Shs Outstand'}</td>
            <td>{_.get(stockInfo, 'Shs Outstand', '')}</td>
          </tr>
          <tr>
            <td>{'Prev Close'}</td>
            <td>{_.get(stockInfo, 'Prev Close', '')}</td>
          </tr>
          <tr>
            <td>{'Price'}</td>
            <td>{_.get(stockInfo, 'Price', '')}</td>
          </tr>
          <tr>
            <td>{'Perf Week'}</td>
            <td>{_.get(stockInfo, 'Perf Week', '')}</td>
          </tr>
          <tr>
            <td>{'Perf Month'}</td>
            <td>{_.get(stockInfo, 'Perf Month', '')}</td>
          </tr>
          <tr>
            <td>{'Perf YTD'}</td>
            <td>{_.get(stockInfo, 'Perf YTD', '')}</td>
          </tr>
          <tr>
            <td>
              <span
                href="#"
                onClick={() => setShowDescription(!showDescription)}
              >
                Details
              </span>
            </td>
          </tr>
          {showDescription ? (
            <>
              <tr>
                <td>
                  <a
                    href={`https://finance.yahoo.com/quote/${props.symbol.trim()}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Yahoo
                  </a>
                </td>
              </tr>

              <tr>
                <td>
                  <a
                    href={`https://seekingalpha.com/symbol/${props.symbol}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Seeking Alpha
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <a
                    href={`https://www.google.com/search?q=${props.symbol}+stock&tbm=nws`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Google
                  </a>
                </td>
              </tr>
              <tr>
                <td colSpan="2">{_.get(stockInfo, 'profile.value', '')}</td>
              </tr>
            </>
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
