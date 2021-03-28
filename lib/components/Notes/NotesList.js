import React from 'react';
import { connect } from 'react-redux';

class NotesList extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }
  render() {
    return (
      <>
        <div className="panel panel-default">
          <div className="panel-heading">Notes</div>
          <div className="panel-body">
            <p>...</p>
          </div>

          <table className="table"></table>
        </div>
      </>
    );
  }
}
export default connect((state) => {
  return { state };
})(NotesList);
