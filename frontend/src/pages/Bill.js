import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import SearchBar from '../components/SearchBar';
import hotelsList from '../components/hotels';

function BillPage() {
  return (
    <div className="HI flex flex-col items-center">
      <div className="fixed top-0 w-full z-10 mb-10 border-b border-gray-300">
        <NavBar />
        {/* <SearchBar /> */}
      </div>
      <div className="m-10"> <p>h</p> </div>
      <div className="bg-white shadow-lg border-t border-gray-100 w-4/5 ">
        <div className="flex border-b border-gray-300  p-6">
          <div>
            <h1 className="text-xl font-bold">Booking Id</h1>
            <p className="text-lg">XYCC094</p>
          </div>
          <div className="ml-auto">
            <p>Booked by UserName on DateandTime</p>
          </div>
        </div>
        <div className="flex border-b border-gray-300  p-4 items-center">
          <div>
            <h1 className="text-xl font-bold">Hotel Name</h1>
            <p>Hotel Location</p>
          </div>
          <div className="ml-auto">
            <img src={hotelsList[0].imgURL} className="w-72 h-auto" />
          </div>
        </div>
        <div className="flex justify-between border-b border-gray-300 p-4 items-center">
          <div className="flex-grow">
            <h1 className="text-l font-bold">Primary Guest</h1>
            <p>UserName</p>
          </div>
          <div className="flex-grow">
            <h1 className="text-l font-bold">Check in</h1>
            <p>CheckInTime</p>
          </div>
          <div className="flex-grow">
            <h1 className="text-l font-bold">Check Out</h1>
            <p>CheckOutTime</p>
          </div>
          <div className="ml-auto">
            <h1 className="text-3xl font-bold">1 Night</h1>
            <div className="flex">
              <p>1 Guest</p>
              <div className="ml-4">
                <p>1 Room</p>
                <p>Classic</p>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4">
          <h1 className="text-xl font-bold">Payment Details</h1> 
          <div className="flex  border border-gray-300 p-4 m-2">
            <p>Total payable amount</p>
            <h2 className="text-l font-bold ml-auto">724Rs</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BillPage;




