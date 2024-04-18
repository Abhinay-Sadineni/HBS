import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import SearchBar from '../components/SearchBar';
import hotelsList from '../components/hotels';

function BillPage() {
  return (
    <div className="HI">
      <div className="fixed top-0 w-full z-10 mb-10 border-b border-gray-300">
        <NavBar />
        {/* <SearchBar /> */}
      </div>
      <div className="m-10"> <p>h</p> </div>
      <h1>Hi</h1>
      <div className = "bg-white shadow-lg"> 
        <div className="flex">
            <div>
            <h1 className="text-3xl font-bold">Booking Id</h1>
            <p className="text-lg">XYCC094</p>
            </div>
            <div className="ml-auto">
            <p>Booked by UserName on DateandTime</p>
            </div>
        </div>
      </div>
    </div>
  );
}

export default BillPage;

