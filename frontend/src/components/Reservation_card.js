import React from 'react';

function ReservationCard(props) {
    const handleCancelBooking = () => {
      props.setReservationList(prevList => {
        return prevList.map(group => {
          return group.map(reservation => {
            if (reservation.gid === props.rid) {
              return { ...reservation, status: "cancelled" };
            }
            return reservation;
          });
        });
      });
    };
  
    return (
        <div className="w-3/5 bg-white rounded-lg shadow-lg p-8 mx-auto mt-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <img src="https://via.placeholder.com/150" alt="Placeholder" className="w-32 h-32 object-cover rounded-lg mr-8" />
                    <div>
                        <h1 className="text-2xl font-bold">{props.name}</h1>
                        <p className="text-gray-500">{props.checkin} - {props.checkout}.</p>
                        <p className="text-gray-500">{props.noGuest} Guest, {props.noRoom} Room </p>
                    </div>
                </div>
                <div>
                    <h2 className="text-lg font-semibold">{props.rid}</h2>
                </div>
                <div className='flex flex-col items-center'>
                    {props.status === 'pending' || props.status === 'confirmed' ? (
                        <button onClick={() => handleCancelBooking()} className="bg-red-500 text-white px-4 py-2 rounded mt-4">Cancel Booking</button>
                    ) : (
                        <button className="bg-gray-400 text-gray-800 px-4 py-2 rounded mt-4" disabled>Cancel Booking</button>
                    )}
                    <p className="text-black-500">{props.status} </p>
                </div>
            </div>
        </div>
    );
  }

export default ReservationCard;
