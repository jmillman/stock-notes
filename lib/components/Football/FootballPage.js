import React from 'react';
import { Link } from 'react-router-dom';
var Button = require('react-bootstrap').Button;

class FootballPage extends React.Component {
  render() {
    return (
      <div className="jumbotron">
        <h1>Football</h1>
        <Link to='/home' className='btn btn-primary btn-lg'>Home</Link>
        <Button className="btn btn-lg" onClick="">Get Games</Button>
      </div>
    );
  }
}

export default FootballPage;
