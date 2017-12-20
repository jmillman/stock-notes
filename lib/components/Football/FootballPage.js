import React from 'react';
import { Link } from 'react-router-dom';

class FootballPage extends React.Component {
  render() {
    return (
      <div className="jumbotron">
        <h1>Football</h1>
        <Link to='/home' className='btn btn-primary btn-lg'>Home</Link>
      </div>
    );
  }
}

export default FootballPage;
