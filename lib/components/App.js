import React from 'react';
import AppRoutes from './AppRoutes';
import { Link } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <Link to='/home' >Home</Link> | <Link to='/football' >Football</Link>
        <AppRoutes />
      </div>
    );
  }
}

export default App;
