import React from 'react';
import {connect} from 'react-redux';
import * as constants from '../../constants';
import {createBet, refreshAllStats} from '../../actions';
import {getTicket} from '../../utilities';

class FootballGameToWinTable extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  componentDidMount() {
    this.props.dispatch(refreshAllStats());
  }
  getStats(game, homeScore, betType, side) {
    const ticket = getTicket(betType, game.date, game.home, game.away, homeScore, side);
    return this.props.state.allStatsData[ticket] ? this.props.state.allStatsData[ticket] : '';
  }
  getRows() {
    let {dispatch} = this.props;
    let {game, betType} = this.props.state.footballBetViewOptions;
    let rows = constants.FootballGameToWinTableBetTypes.homeScore.map((homeScore)=>{
      return <tr key={homeScore}>
        <td>{homeScore}</td>
        <td>
          <button
            type='button'
            className='badge badge-danger'
            key={homeScore}
            onClick={()=>{dispatch(createBet(game, homeScore, betType));}}>
            Bet
          </button>
        </td>
        <td>
          {this.getStats(game, homeScore, betType, 'bets')}
        </td>
        <td>
          {this.getStats(game, homeScore, betType, 'home')}
        </td>
        <td>
          {this.getStats(game, homeScore, betType, 'away')}
        </td>
      </tr>;
    });


    return (
      <table border='1'>
        <thead>
          <tr>
            <td>Spread</td>
            <td></td>
            <td>Bets</td>
            <td>Home</td>
            <td>Away</td>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
  render() {
    let {game} = this.props.state.footballBetViewOptions;
    if(game) {
      return (
        <div key={game}>
          <h4>To Win</h4>
          <div className='row'>
            <div className='col-5'>
              {game.home} vs {game.away}
            </div>
          </div>
          {this.getRows()}
        </div>
      );
    }
    else{
      return null;
    }
  }
}

export default connect((state) => {
  return {state};
})(FootballGameToWinTable);
