import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container">
      <h1>Welcome to the Home Page</h1>
      <div className="mb-3">
        <Link to="/login" className="btn btn-primary d-block">Login</Link>
      </div>
      <div>
        <Link to="/signup" className="btn btn-secondary d-block">Sign Up</Link>
      </div>
    </div>
  );
}

export default Home;
