import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import SearchBar from '../components/SearchBar';
import ReservationCard from '../components/Reservation_card';
import reservationList from '../components/Reservations';

// className="fixed top-0 w-full z-10"

function History() {
  return (
    <div>
        <div className="fixed top-0 w-full z-10 mb-20">
            <NavBar   />
            <SearchBar />
        </div>
        <div className="m-10"> <p>h</p></div>
        <div className="m-10"> <p>h</p></div>
        <div className="mt-20"> 
                {reservationList.map(reservation => (
                    // <div className="mt-20">
                     <ReservationCard
                        key = {reservation.id}
                        name={reservation.name}
                        checkin={reservation.checkin}
                        checkout={reservation.checkout}
                        noGuest={reservation.noGuest}
                        noRoom={reservation.noRoom}
                        rid={reservation.rid}
                    />
                    // </div>
                    
                ))}
        </div>
        
                <Link to="/hotel-page" className="btn btn-primary fixed bottom-4 right-4">Logout</Link> 
        
    </div>
  );
}

export default History;


