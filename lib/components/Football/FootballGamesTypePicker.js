import React from 'react';
import {connect} from 'react-redux';
import {setfootballGameType} from '../../actions/action';

class FootballGamesTypePicker extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    let {dispatch} = this.props;
    let {footballGameData, footballBetViewOptions} = this.props.state;
    return (
      <div className='btn-group btn-group-justified'>
        {footballGameData.betTypes.map((betType)=>{
          let cssClass =  'btn btn-primary' + ((betType == footballBetViewOptions.betType) ? ' active' : '');
          return <button
            type='button'
            className={cssClass}
            key={betType}
            onClick={()=>{dispatch(setfootballGameType(betType));}}
          >
            {betType}
          </button>;
        })}
      </div>
    );
  }
}

export default connect((state) => {
  return {state};
})(FootballGamesTypePicker);
