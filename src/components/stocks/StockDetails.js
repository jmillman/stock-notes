import _ from 'lodash';
import React, { useState } from 'react';
import { Divider, Grid, Segment } from 'semantic-ui-react';
import NotesList from './NotesList';

function StockDetails(props) {
  function getDetails() {
    const [showDescription, setShowDescription] = useState(false);
    const stockInfo = _.get(props, 'data', {});
    return (
      <table>
        <tbody>
          <tr>
            <td>{'company_name'}</td>
            <td>{_.get(stockInfo, 'company_name.value', '')}</td>
          </tr>
          <tr>
            <td>{'50_day_moving_avg'}</td>
            <td>{_.get(stockInfo, '50_day_moving_avg.value', '')}</td>
          </tr>
          <tr>
            <td>{'52_week_change'}</td>
            <td>{_.get(stockInfo, '52_week_change.value', '')}</td>
          </tr>
          <tr>
            <td>{'52_week_high'}</td>
            <td>{_.get(stockInfo, '52_week_high.value', '')}</td>
          </tr>
          <tr>
            <td>{'52_week_low'}</td>
            <td>{_.get(stockInfo, '52_week_low.value', '')}</td>
          </tr>
          <tr>
            <td>{'200_day_moving_avg'}</td>
            <td>{_.get(stockInfo, '200_day_moving_avg.value', '')}</td>
          </tr>
          <tr>
            <td>{'avg_vol_3_mo'}</td>
            <td>{_.get(stockInfo, 'avg_vol_3_mo.value', '')}</td>
          </tr>
          <tr>
            <td>{'avg_vol_10_mo'}</td>
            <td>{_.get(stockInfo, 'avg_vol_10_mo.value', '')}</td>
          </tr>
          <tr>
            <td>{'float'}</td>
            <td>{_.get(stockInfo, 'float.value', '')}</td>
          </tr>
          <tr>
            <td>{'held_by_insiders'}</td>
            <td>{_.get(stockInfo, 'held_by_insiders.value', '')}</td>
          </tr>
          <tr>
            <td>{'held_by_institutions'}</td>
            <td>{_.get(stockInfo, 'held_by_institutions.value', '')}</td>
          </tr>
          <tr>
            <td>{'shares_outstanding'}</td>
            <td>{_.get(stockInfo, 'shares_outstanding.value', '')}</td>
          </tr>
          <tr>
            <td>{'shares_short'}</td>
            <td>{_.get(stockInfo, 'shares_short.value', '')}</td>
          </tr>
          <tr>
            <td>{'short_percent_of_float'}</td>
            <td>{_.get(stockInfo, 'short_percent_of_float.value', '')}</td>
          </tr>
          <tr>
            <td>{'short_percent_of_shares_outstanding'}</td>
            <td>
              {_.get(
                stockInfo,
                'short_percent_of_shares_outstanding.value',
                ''
              )}
            </td>
          </tr>
          <tr>
            <td>{'short_ratio'}</td>
            <td>
              {_.get(stockInfo, 'shares_outstandshort_ratioing.value', '')}
            </td>
          </tr>
          <tr>
            <td>{'sector'}</td>
            <td>{_.get(stockInfo, 'sector.value', '')}</td>
          </tr>
          <tr>
            <td>{'industry'}</td>
            <td>{_.get(stockInfo, 'industry.value', '')}</td>
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
                    href={`https://finance.yahoo.com/quote/${props.symbol}`}
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
                    href={`https://www.google.com/search?q=${stockInfo['company_name'].value}+stock+news`}
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
