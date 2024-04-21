import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Card from '../components/List_card';
import hotelsList from '../components/hotels';

function Dashboard() {
  return (
    <div className="grid grid-row-2 gap-14 h-screen">
      <NavBar />

      <div className="flex-1 overflow-y-auto">
        <div id='pop hotels'className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
          {hotelsList.map(hotel => (
            <div className="m-4" key={hotel.id}>
              <Card 
                imgURL={hotel.imgURL[0]}
                name={hotel.name}
                location={hotel.location}
                rating={hotel.rating}
                price={hotel.price}
              />
            </div>
          ))}
        </div>
      </div>
      <Link to="/hotel-page" className="btn btn-primary fixed bottom-4 right-4">Logout</Link>
    </div>
  );
}

export default Dashboard;