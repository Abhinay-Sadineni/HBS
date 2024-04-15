// Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';

function Dashboard() {
  return (
    <div className="HI">
      <NavBar />  
      <Link to="/" className="btn btn-primary">Logout</Link>
    </div>
  );
}

export default Dashboard;
