import React from 'react';
import {connect} from 'react-redux';
import {loginUserRequest} from '../../actions';

class UsersPage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  loginUserClick(user){
    this.props.dispatch(loginUserRequest(user.email, user.password));
  }

  render() {
    const {allUsers, loggedInUser} = this.props.state;
    return (
      <div className="jumbotron">
        <h1>Users Admin</h1>
        <span>Loggedin User: {loggedInUser ? loggedInUser.userId : ''}</span>
        {allUsers.map((user)=>{
          return <div key={user.email}><button onClick={() => this.loginUserClick(user)}>Login User {user.email}</button></div>;
        })}
      </div>
    );
  }
}
export default connect((state) => {
  return {state};
})(UsersPage);
