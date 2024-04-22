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
          <p>Your Reservations Today </p>
          <div className="flex justify-center items-center">
            <div className="w-full max-w-7xl">
              <div className="grid gap-4 mb-8">
                <div className="col-span-3 overflow-y-auto rounded-lg shadow-xs">
                  <div className="text-l font-semibold text-center mb-2"> Your Reservations Today</div>
                  <div className="bg-blue-50 p-5">
                    <div className="grid grid-cols-9 justify-between font-semibold items-center mb-2">
                      <div className="col-span-1 text-center">Id</div>
                      <div className="col-span-1 text-center">Guest Details</div>
                      <div className="col-span-1 text-center">Status</div>
                      <div className="col-span-1 text-center">Guests</div>
                      <div className="col-span-1 text-center">Rooms</div>
                      <div className="col-span-1 text-center">Checkin</div>
                      <div className="col-span-1 text-center">Checkout</div>
                      <div className="col-span-1 text-center">Total payout</div>
                      <div className="col-span-1 text-center">Actions</div>
                    </div>
                    {manager_reservations.map((reservation) => (
                      <div key={reservation.id} className="grid grid-cols-9 justify-between items-center mb-2">
                        <div className="col-span-1 text-center">{reservation.id}</div>
                        <div className="col-span-1 text-center">{reservation.guestDetails}</div>
                        <div className="col-span-1 text-center">{reservation.status}</div>
                        <div className="col-span-1 text-center">{reservation.guests}</div>
                        <div className="col-span-1 text-center">
                          {reservation.rooms.map((room, index) => (
                            <div key={index}>{room.roomtype} x {room.no_of_rooms}</div>
                          ))}
                        </div>
                        <div className="col-span-1 text-center">{reservation.checkin}</div>
                        <div className="col-span-1 text-center">{reservation.checkout}</div>
                        <div className="col-span-1 text-center">{reservation.totalPayout}</div>
                        <div className="col-span-1 text-center">
                          {reservation.status === "Pending" && (
                            <>
                              <button className="bg-green-500 text-white px-2 py-1 mr-1 rounded-md text-sm">Confirm</button>
                              <button className="bg-red-500 text-white px-2 py-1 ml-1 rounded-md text-sm">Reject</button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Manager_Dashboard;
  