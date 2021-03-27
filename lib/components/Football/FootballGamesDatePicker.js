import React from 'react';
import {connect} from 'react-redux';
import {setfootballViewDate, initializeFootballGame} from '../../actions/action';

class FootballGamesDatePicker extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  componentDidMount(){
    let {dispatch} = this.props;
    let {footballGameData, footballBetViewOptions} = this.props.state;
    // if there is no view options and there is a data, set to the first o
    if(footballGameData && !footballBetViewOptions.date){
      dispatch(initializeFootballGame(footballGameData));
    }
  }
  render() {
    let {dispatch} = this.props;
    let {footballGameData, footballBetViewOptions} = this.props.state;
    return (
      <div className='btn-group btn-group-justified'>
        {footballGameData.dates.map((date)=>{
          let cssClass =  'btn btn-primary' + ((date == footballBetViewOptions.date) ? ' active' : '');
          // let cssClass =  'list-group-item active';
          return <button
            type='button'
            className={cssClass}
            key={date}
            onClick={()=>{dispatch(setfootballViewDate(footballGameData, date));}}>
            {date}
          </button>;
        })}
      </div>
    );
  }
}

export default connect((state) => {
  return {state};
})(FootballGamesDatePicker);
