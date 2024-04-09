// Home.js
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container">
      <h1>Welcome to the Home Page</h1>
      <Link to="/login" className="btn btn-primary">Login</Link>
    </div>
  );
}

export default Home;
