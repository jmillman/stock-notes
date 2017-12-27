import React from 'react';
import {connect} from 'react-redux';
import {cancelBet, submitBet} from '../../actions';
import {formatHomeScore} from '../../utilities';
import * as constants from '../../constants';

class FootballGameToWinCreateBet extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      home: 50,
      away: 50
    };
  }
  changePrice(step) {
    let home = parseFloat(this.state.home);
    const max = 100;
    let away = max - home;
    if(home + step < max && home + step > 0) {
      home = home + step;
      away = max - home;
      this.setState({home, away});
    }
  }
  changePriceText(e, priceKey) {
    const price = e.target.value;
    this.setState({[priceKey]: price});
  }
  validateBet() {
    const {home, away} = this.state;
    let isValid = true;
    if(isNaN(home) || isNaN(away)) {
      isValid = false;
      alert('Your bet values are not numbers');
    }
    if(parseFloat(home) + parseFloat(away) != 100) {
      isValid = false;
      alert('The buy and sell should equal 100');
    }
    if(!this.props.state.loggedInUser.hasOwnProperty('userId')) {
      isValid = false;
      alert('You need to be logged in.');
    }
    return isValid;
  }
  submitBet(home_or_away) {
    let {bet} = this.props.state.footballBetViewOptions;

    const price = this.state[home_or_away];
    bet.price = price;
    bet.side = home_or_away;
    bet.user = this.props.state.loggedInUser;
    bet.betType = constants.BET_TYPE_FOOTBALL_TO_WIN;
    if(this.validateBet()){
      this.props.dispatch(submitBet(bet));
    }
  }
  render() {
    const {dispatch, state} = this.props;
    const {bet} = state.footballBetViewOptions;
    return (
      <div>
        <h4>Crete that bet son!</h4>
        <table>
          <tbody>
            <tr>
              <td>Date</td>
              <td>{bet.game.date}</td>
            </tr>
            <tr>
              <td>Home</td>
              <td>{bet.game.home}</td>
            </tr>
            <tr>
              <td>Away</td>
              <td>{bet.game.away}</td>
            </tr>
            <tr>
              <td>Home Score</td>
              <td>{formatHomeScore(bet.homeScore)}</td>
            </tr>
            <tr>
              <td>
                <input
                  type='text'
                  value={this.state.home}
                  onChange={(e)=>{this.changePriceText(e, 'home');}}
                />
              </td>
              <td>
                <button
                  type='button'
                  className='btn btn-secondary'
                  onClick={()=>{this.changePrice(10);}}
                >+$10</button>
                <button
                  type='button'
                  className='btn btn-secondary'
                  onClick={()=>{this.changePrice(1);}}
                >+$1</button>
                <button
                  type='button'
                  className='btn btn-secondary'
                  onClick={()=>{this.changePrice(-10);}}
                >-$10</button>
                <button
                  type='button'
                  className='btn btn-secondary'
                  onClick={()=>{this.changePrice(-1);}}
                >-$1</button>
              </td>
              <td>
                <input
                  type='text'
                  value={this.state.away}
                  onChange={(e)=>{this.changePriceText(e, 'away');}}
                />
              </td>
            </tr>
            <tr>
              <td>
                <button
                  type='button'
                  className='btn btn-secondary'
                  onClick={()=>{this.submitBet('home');}}
                >Buy/Cover</button>
              </td>
              <td></td>
              <td>
                <button
                  type='button'
                  className='btn btn-secondary'
                  onClick={()=>{this.submitBet('away');}}
                >Sell/Won&apos;t Cover</button>
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <button
          type='button'
          className='btn btn-secondary'
          onClick={()=>{dispatch(cancelBet());}}
        >Cancel</button>
      </div>
    );
  }
}

export default connect((state) => {
  return {state};
})(FootballGameToWinCreateBet);
