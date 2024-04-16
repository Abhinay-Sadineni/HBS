import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import SearchBar from '../components/SearchBar';
import ReservationCard from '../components/Reservation_card';

function History() {
  return (
    <div>
        <div className="fixed top-0 w-full z-10">
            <NavBar   />
            <SearchBar />
        </div>
        <div className="mt-16"> 
                <ReservationCard 
                    name="Hotel 1"
                    checkin="Apr 16, 2024"
                    checkout="Apr 20, 2024"
                    noGuest="1"
                    noRoom="1"
                    rid="C9D90938"
                />
                <ReservationCard 
                    name="Hotel 2"
                    checkin="Apr 16, 2024"
                    checkout="Apr 20, 2024"
                    noGuest="1"
                    noRoom="1"
                    rid="C9D90938"
                />
                <ReservationCard 
                    name="Hotel 2"
                    checkin="Apr 16, 2024"
                    checkout="Apr 20, 2024"
                    noGuest="1"
                    noRoom="1"
                    rid="C9D90938"
                />
                <ReservationCard 
                    name="Hotel 2"
                    checkin="Apr 16, 2024"
                    checkout="Apr 20, 2024"
                    noGuest="1"
                    noRoom="1"
                    rid="C9D90938"
                />
                <Link to="/" className="btn btn-primary fixed bottom-4 right-4">Logout</Link> 
        </div>
    </div>
  );
}

export default History;


