import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/action';
import _ from 'lodash';

class DailyPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      date: '2021-03-27',
    };
  }
  componentDidMount() {
    // pull if there aren't any in state already
    console.error('Reloading Daily page one every reload');
    // this.props.dispatch(actions.setDate(this.state.date));
    this.props.dispatch(actions.getNotesForDate(this.state.date));
  }
  render() {
    const { notesData } = this.props.state;
    const stockNotes = notesData[this.state.date] || {};
    let notes = [];
    if (Object.keys(stockNotes).length) {
      _.forEach(stockNotes, (value, key) => {
        notes.push(<StockNoteDetails key={key} data={value} symbol={key} />);
      });
    }
    return (
      <div className="jumbotron">
        <span>
          <div className="row">
            <div className="col-8">
              <div>{notes}</div>
            </div>
          </div>
        </span>
      </div>
    );
  }
}
export default connect((state) => {
  return { state };
})(DailyPage);
