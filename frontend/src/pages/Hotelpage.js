import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import SearchBar from '../components/SearchBar';
import Card from '../components/List_card';
import hotelsList from '../components/hotels';

function Hotelpage() {
  return (
    <div className="HI">
      <div className="fixed top-0 w-full z-10 mb-20">
      <NavBar /> 
      <SearchBar />
      </div>
      <div className="m-10"> <p>h</p></div>
      <div className="m-10"> <p>h</p></div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4">
        {hotelsList.map(hotel => (
          <div className='m-4'>
          <Card 
            key={hotel.id}
            imgURL={hotel.imgURL}
            name={hotel.name}
            location={hotel.location}
            rating={hotel.rating}
            price={hotel.price}
          />
          </div>
        ))}
      </div>
      <Link to="/hotel-page" className="btn btn-primary">Logout</Link>
    </div>
  );
}

export default Hotelpage;