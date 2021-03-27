import React from 'react';
import {connect} from 'react-redux';
import {setfootballGame} from '../../actions/action';

class FootballGamesPickerByDate extends React.Component {
  render() {
    let {dispatch} = this.props;
    let {footballGameData, footballBetViewOptions} = this.props.state;
    return (
      <div className="container-fluid">
        <ul className="list-group">
          {footballGameData.games.map((game)=>{
            if(game.date == footballBetViewOptions.date) {
              return <li key={game.home} className='list-group-item'>
                <a href="#" onClick={()=>{dispatch(setfootballGame(game));}}>{game.home} @ {game.away}</a>
              </li>;
            }
          })}
        </ul>
      </div>
    );
  }
}

export default connect((state) => {
  return {state};
})(FootballGamesPickerByDate);
