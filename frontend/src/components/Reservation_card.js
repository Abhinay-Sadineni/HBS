import React from 'react';
import axiosInstance from '../helpers/axios';

function ReservationCard(props) {

  const handleCancel = async (gid) => {
    console.log(gid)
    try {
      const response = await axiosInstance.post('/cancel', 
        { gid: gid },{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.status === 200) {
        // If cancellation is successful, update the reservation list
        // setReservationList(prevList => prevList.filter(reservation => reservation[0].gid !== gid));
        props.changeStatus(gid)

      } else {
        // Handle other status codes if needed
        console.error("Cancellation failed. Status:", response.status);
      }
    } catch (error) {
      console.error("Error cancelling reservation:", error);
    }
  };
  
    return (
        <div className="w-3/5 bg-white rounded-lg shadow-lg p-8 mx-auto mt-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <img src={`http://localhost:5000/${props.img}`} alt="Placeholder" className="w-32 h-32 object-cover rounded-lg mr-8" />
                    <div>
                        <h1 className="text-2xl font-bold">{props.name}</h1>
                        <p className="text-gray-500">{props.checkin} - {props.checkout}.</p>
                        <p className="text-gray-500">{props.noGuest} Guest, {props.noRoom} Room </p>
                    </div>
                </div>
                <div>
                    <h2 className="text-lg font-semibold">{props.gid}</h2>
                </div>
                <div className='flex flex-col items-center'>
                    {props.status === 'pending' || props.status === 'confirmed' ? (
                        <button onClick={() => handleCancel(props.gid)} className="bg-red-500 text-white px-4 py-2 rounded mt-4">Cancel Booking</button>
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
