import React from 'react';
import AppRoutes from './AppRoutes';
import { Link } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <Link to='/' >Home</Link> |
        <Link to='/football' >Football</Link> |
        <Link to='/users' >Users</Link> |
        <Link to='/profile' >My Profile</Link>
        <AppRoutes />
      </div>
    );
  }
}

export default App;
