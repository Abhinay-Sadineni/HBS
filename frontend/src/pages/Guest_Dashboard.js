import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Card from '../components/List_card';
import hotelsList from '../components/hotels';

function Dashboard() {
  return (
    <div className="h-screen">
      <NavBar /> 

      <div className="fixed border top-[78px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 overflow-scroll max-h-[720px]">
        {hotelsList.map(hotel => (
          <div key={hotel.id} className='m-4'>
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
  );
}

export default Dashboard;
