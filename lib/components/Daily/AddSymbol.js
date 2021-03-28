import React from 'react';
import { connect } from 'react-redux';
import { lookupSymbol } from '../../actions/action';

class AddSymbol extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      symbol: '',
    };
  }
  lookupSymbol() {
    this.props.dispatch(lookupSymbol(this.state.symbol));
  }
  changeSymbol(e) {
    const symbol = e.target.value;
    this.setState({ symbol });
  }
  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.symbol}
          onChange={(e) => {
            this.changeSymbol(e);
          }}
        />
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => {
            this.lookupSymbol();
          }}
        >
          Lookup
        </button>
      </div>
    );
  }
}

export default connect((state) => {
  return { state };
})(AddSymbol);
