import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

class StockNoteDetails extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }
  getDetails(data) {
    const { stockInfo } = data;
    const rows = [];
    _.forEach(stockInfo, (value, key) => {
      if (typeof value === 'string') {
        rows.push(
          <tr key={key}>
            <td key={key}>{key}</td>
            <td key={`${key}_value`}>{value}</td>
          </tr>
        );
      }
    });
    return (
      <table>
        <tbody>{rows}</tbody>
      </table>
    );
  }
  render() {
    return (
      <div className="jumbotron">
        <span>
          <div className="row">
            <div className="col-8">
              <div>
                {this.props.symbol}
                {this.getDetails(this.props.data)}
                {/* <JSONViewer data={this.props.data} collapsible/> */}
              </div>
            </div>
          </div>
        </span>
      </div>
    );
  }
}
export default connect((state) => {
  return { state };
})(StockNoteDetails);
