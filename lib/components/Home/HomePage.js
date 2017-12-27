import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="jumbotron">
      <h1>Bet on Anything</h1>
      <p className="lead">
        Turn the fuck around.<br />
        This site isn&apos;t for pussies!<br />
        You can&apos;t grasp the concept and you are a born loser.<br />

        So for the last time, please turn around.
      </p>
      <Link to='/football' className="btn btn-lg btn-primary" role="button">I want to lose money</Link>
    </div>
  );};

export default HomePage;
