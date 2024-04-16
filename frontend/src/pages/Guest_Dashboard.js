import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import SearchBar from '../components/SearchBar';
import Card from '../components/List_card';
import hotelsList from '../components/hotels';

function Dashboard() {
  return (
    <div className="HI">
      <NavBar /> 
      <SearchBar />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {hotelsList.map(hotel => (
          <Card
            key={hotel.id}
            imgURL={hotel.imgURL}
            name={hotel.name}
            location={hotel.location}
            rating={hotel.rating}
            price={hotel.price}
          />
        ))}
      </div>
      <Link to="/" className="btn btn-primary">Logout</Link>
    </div>
  );
}

export default Dashboard;


