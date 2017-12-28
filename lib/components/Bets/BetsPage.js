import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';

class BetsPage extends React.Component {
  componentDidMount() {
    // pull if there aren't any in state already
    if(this.props.state.allBetsData.length == 0) {
      this.props.dispatch(actions.refreshAllBets());
    }
  }
  render() {
    const {allBetsData} = this.props.state;
    return (
      <div className='jumbotron'>
        <span>
          <div className="row">
            <div className='col-8'>
              <div>
                {allBetsData && allBetsData.map((bet) => {
                  return <span key={bet.ticket + bet.timestamp}>{bet.ticket} {bet.homeUserId} {bet.awayUserId}<br /><br /></span>;
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
})(BetsPage);
