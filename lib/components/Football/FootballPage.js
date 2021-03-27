import React from 'react';
import FootballGamesDatePicker from './FootballGamesDatePicker';
import FootballGamesPickerByDate from './FootballGamesPickerByDate';
import FootballGameToWinTable from './FootballGameToWinTable';
import FootballGamesTypePicker from './FootballGamesTypePicker';
import {connect} from 'react-redux';
import * as constants from '../../constants';

class FootballPage extends React.Component {
  render() {
    const {footballBetViewOptions} = this.props.state;
    const {bet} = footballBetViewOptions;

    return (
      <div className='jumbotron'>
        {(() => {
          if(bet) {
            return;
          }
          else {
            return(
              <span>
                <div className="row">
                  <div className='col-12'>
                    <FootballGamesDatePicker />
                  </div>
                </div>
                <div className="row">
                  <div className='col-4'>
                    <FootballGamesPickerByDate />
                  </div>
                  <div className='col-8'>
                    <FootballGamesTypePicker />
                    <div>
                      {(() => {
                        switch(footballBetViewOptions.betType) {
                          case constants.BET_TYPE_FOOTBALL_TO_WIN:
                            return <FootballGameToWinTable />;
                          default:
                            return footballBetViewOptions.betType + ' coming soon!';
                        }
                      })()}
                    </div>
                  </div>
                </div>
              </span>
            );
          }
        })()}
      </div>
    );
  }
}
export default connect((state) => {
  return {state};
})(FootballPage);
