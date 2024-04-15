import React from 'react';

import HotelCard from '../components/Hotel_card';
// Dummy data
const dummyHotels = [
  {
    imageUrl: 'https://via.placeholder.com/150',
    name: 'Example Hotel 1',
    ratings: '4.5/5',
    location: 'City A, Country X',
    priceRange: '$$$'
  },
  {
    imageUrl: 'https://via.placeholder.com/150',
    name: 'Example Hotel 2',
    ratings: '4.2/5',
    location: 'City B, Country Y',
    priceRange: '$$'
  },
  {
    imageUrl: 'https://via.placeholder.com/150',
    name: 'Example Hotel 3',
    ratings: '4.7/5',
    location: 'City C, Country Z',
    priceRange: '$$$'
  }
];
function HotelList() {
    return (
      <div className="grid grid-cols-1 gap-4">
        {dummyHotels.map((hotel, index) => (
          <HotelCard key={index} {...hotel} />
          
        ))}
      </div>
    );
  }
  

export default HotelList;
