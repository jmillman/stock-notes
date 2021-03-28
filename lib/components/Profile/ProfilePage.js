import React from 'react';
import { connect } from 'react-redux';

class ProfilePage extends React.Component {
  render() {
    const { loggedInUser } = this.props.state;
    return (
      <div className="jumbotron">
        <h1>Profile Page</h1>
        {JSON.stringify(loggedInUser)}
      </div>
    );
  }
}

export default connect((state) => {
  return { state };
})(ProfilePage);
