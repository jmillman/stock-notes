import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="jumbotron">
      <h1>Bet on Anything</h1>
      <Link to='/football' className='btn btn-primary btn-lg'>Football</Link>
      <p></p>
    </div>
  );};

export default HomePage;
