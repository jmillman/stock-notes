import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/action';

class DailyPage extends React.Component {
  componentDidMount() {
    // pull if there aren't any in state already
    console.error('Reloading stats page one every reload');
    this.props.dispatch(actions.getNotesForDate('2021-03-26'));
  }
  render() {
    const {notesData} = this.props.state;
    return (
      <div className='jumbotron'>
        <span>
          <div className="row">
            <div className='col-8'>
              <div>
                {notesData.toString()}
                {/* {stockNotes && stockNotes.length && stockNotes.map((stockNote) => {
                  return <span key={stockNotes}>{stockNotes}<br /><br /></span>;
                })} */}
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
})(DailyPage);
