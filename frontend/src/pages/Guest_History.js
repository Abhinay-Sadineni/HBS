import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import ReservationCard from '../components/Reservation_card';
import axiosInstance from '../helpers/axios';

function History() {
  const [reservationList, setReservationList] = useState([]);

  useEffect(() => {
    axiosInstance.get("/guest_history", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then((response) => {
      if (response.status === 200) {
        console.log(response.data);
        setReservationList(response.data.List);
      } else {
        // Handle other status codes if needed
      }
    })
    .catch((error) => {
      console.error("Error fetching reservation history:", error);
    });
  }, []);

  const handleCancel = async (gid) => {
    try {
      const response = await axiosInstance.get('/cancel', {
        params: { gid: gid },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.status === 200) {
        // If cancellation is successful, update the reservation list
        setReservationList(prevList => prevList.filter(reservation => reservation[0].gid !== gid));
      } else {
        // Handle other status codes if needed
        console.error("Cancellation failed. Status:", response.status);
      }
    } catch (error) {
      console.error("Error cancelling reservation:", error);
    }
  };

  return (
    <div>
      <div className="fixed top-0 w-full z-10 mb-20">
        <NavBar />
      </div>
      <div className="m-10"> <p>h</p></div>
      <div className="mt-10">
        {reservationList.map((reservation, index) => (
          <ReservationCard
            key={index}
            name={reservation[0].name}
            checkin={reservation[0].start_date}
            checkout={reservation[0].end_date}
            noGuest={reservation[0].No_of_guests}
            noRoom={reservation[0].No_of_rooms}
            rid={reservation[0].gid}
            status={reservation[0].status}
            onCancel={() => handleCancel(reservation[0].gid)}
          />
        ))}
      </div>
    </div>
  );
}

export default History;
