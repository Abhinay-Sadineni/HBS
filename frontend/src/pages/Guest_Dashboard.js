// Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import SearchBar from '../components/SearchBar';

function Dashboard() {
  return (
    <div className="HI">
      <NavBar />  
      <SearchBar />
      <Link to="/" className="btn btn-primary">Logout</Link>
    </div>
  );
}

export default Dashboard;
