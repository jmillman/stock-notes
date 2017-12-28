import React from 'react';
import {connect} from 'react-redux';
import * as constants from '../../constants';
import {createBet} from '../../actions';
import {formatHomeScore} from '../../utilities';

class FootballGameToWinProps extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  getRows() {
    let {dispatch} = this.props;
    let {game, betType} = this.props.state.footballBetViewOptions;
    return constants.footballGameToWinPropsBetTypes.homeScore.map((homeScore)=>{
      return <div className='row' key={homeScore}>
        <div className='col-12'>
          {game.home} {formatHomeScore(homeScore)} {game.away}
          <button
            type='button'
            className='badge badge-danger'
            key={homeScore}
            onClick={()=>{dispatch(createBet(game, homeScore, betType));}}>
            Bet
          </button>
        </div>
      </div>;
    });
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
})(FootballGameToWinProps);
