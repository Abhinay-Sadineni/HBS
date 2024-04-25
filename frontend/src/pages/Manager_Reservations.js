import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Manager_NavBar from '../components/Manager_navbar';
import manager_reservations from '../components/manager_reservations';

function Manager_Reservation() {
  const [filter, setFilter] = useState("All");

  const filterReservations = (reservation) => {
    switch (filter) {
      case "Upcoming":
        return new Date(reservation.checkin) > new Date();
      case "Completed":
        return new Date(reservation.checkout) < new Date();
      case "Cancelled":
        return reservation.status === "Cancelled";
      default:
        return true;
    }
  };

//   Under upcoming only confirmed or pending upcomimng
// Under completed only confirmed and completed
//  Under cancelled both cancelled and rejected
// All : upcoming pending  > confirmed > completed > cancelled

  return (
    <div className="HI">
      <div className="fixed top-0 w-full z-10 mb-20">
        <Manager_NavBar />
      </div>
      <div className='mt-[100px] ml-[80px]'>
        <h1 className='text-2xl font-bold'>Reservations</h1>
        <div className="flex justify-center">
        <button
          className={`mx-2 text-gray-600   ${filter === "All" && "underline font-bold "}`}
          onClick={() => setFilter("All")}
        >
          All
        </button>
        <button
          className={`mx-2 text-gray-600   ${filter === "Upcoming" && "underline font-bold "}`}
          onClick={() => setFilter("Upcoming")}
        >
          Upcoming
        </button>
        <button
          className={`mx-2 text-gray-600  ${filter === "Completed" && "underline font-bold"}`}
          onClick={() => setFilter("Completed")}
        >
          Completed
        </button>
        <button
          className={`mx-2 text-gray-600   ${filter === "Cancelled" && "underline font-bold"}`}
          onClick={() => setFilter("Cancelled")}
        >
          Cancelled
        </button>
      </div>
        <div className="flex justify-center items-center">
          <div className="w-full max-w-7xl">
            <div className="grid gap-4 mb-8">
              <div className="col-span-3 overflow-y-auto rounded-lg shadow-xs">
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
                  {manager_reservations.filter(filterReservations).map((reservation) => (
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

export default Manager_Reservation;
