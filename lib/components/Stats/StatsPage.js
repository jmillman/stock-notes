import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';

class StatsPage extends React.Component {
  componentDidMount() {
    // pull if there aren't any in state already
    console.error('Reloading stats page one every reload');
    this.props.dispatch(actions.refreshAllStats());
    // if(this.props.state.allStatsData.length == 0) {
    //   this.props.dispatch(actions.refreshAllStats());
    // }
  }
  render() {
    const {allStatsData} = this.props.state;
    return (
      <div className='jumbotron'>
        <span>
          <div className="row">
            <div className='col-8'>
              <div>
                {allStatsData.length && allStatsData.map((stat) => {
                  return <span key={stat.ticket + stat.statType}>{stat.ticket} {stat.statType} {stat.statValue}<br /><br /></span>;
                })}
              </div>
            </div>
          </div>
        </span>
      </div>
    );
  }
}
export default connect((state) => {
  return {state};
})(StatsPage);
