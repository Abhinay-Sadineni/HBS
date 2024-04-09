// Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="container">
      <h1>Welcome to the Dashboard</h1>
      <p>You are logged in!</p>
      <Link to="/" className="btn btn-primary">Logout</Link>
    </div>
  );
}

export default Dashboard;
