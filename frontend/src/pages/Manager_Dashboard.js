import React from 'react';
import { Link } from 'react-router-dom';
import Manager_NavBar from '../components/Manager_navbar';
import Card from '../components/List_card';
import hotelsList from '../components/hotels';
import manager_reservations from '../components/manager_reservations';


function Manager_Dashboard() {
    const m_name = "Manager Name";
  
    return (
      <div className="HI">
        <div className="fixed top-0 w-full z-10 mb-20">
          <Manager_NavBar />
        </div>
        <div className='mt-[100px] ml-[80px]'>
          <h1 className='text-2xl font-bold'> Welcome, {m_name}</h1>
          <p>Your Activities Today </p>
        </div>
        
      </div>
    );
  }
  
  export default Manager_Dashboard;
  