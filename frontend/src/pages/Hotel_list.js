import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HotelCard from '../components/Hotel_card';
import SearchBar from '../components/SearchBar';

// Dummy data
const dummyHotels = [
  {
    id: 1,
    name: 'Example Hotel 1',
    ratings: '4.5/5',
    location: 'City A, Country X',
    priceRange: '$$$',
    amenities: ['Wifi', 'Parking', 'Pool']
  },
  {
    id: 2,
    name: 'Example Hotel 2',
    ratings: '4.2/5',
    location: 'City B, Country Y',
    priceRange: '$$',
    amenities: ['Wifi', 'Gym']
  },
  {
    id: 3,
    name: 'Example Hotel 3',
    ratings: '4.7/5',
    location: 'City C, Country Z',
    priceRange: '$$$',
    amenities: ['Parking', 'Restaurant']
  }
];

function HotelList() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const handleHotelClick = (hotelId) => {
    navigate(`/hotel/${hotelId}`);
  };

  // Filter hotels based on search query and selected amenities
  const filteredHotels = dummyHotels.filter((hotel) => {
    const matchesSearch = hotel.name.toLowerCase().includes(searchQuery.toLowerCase());
    const hasSelectedAmenities = selectedAmenities.every((amenity) => hotel.amenities.includes(amenity));
    return matchesSearch && hasSelectedAmenities;
  });

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 5fr', gap: '10px' }}>
      {/* Amenities Selection */}
      <div style={{ width: '100%', padding: '10px', borderRight: '5px solid #ccc' }}>
        <h3 style={{ marginBottom: '10px' }}>Amenities:</h3>
        {['Wifi', 'Parking', 'Pool', 'Gym', 'Restaurant'].map((amenity) => (
          <div key={amenity} style={{ marginBottom: '5px' }}>
            <input
              type="checkbox"
              id={`amenity-${amenity}`}
              value={amenity}
              checked={selectedAmenities.includes(amenity)}
              onChange={(e) => {
                const amenityName = e.target.value;
                if (e.target.checked) {
                  setSelectedAmenities([...selectedAmenities, amenityName]);
                } else {
                  setSelectedAmenities(selectedAmenities.filter((amenity) => amenity !== amenityName));
                }
              }}
            />
            <label htmlFor={`amenity-${amenity}`} style={{ marginLeft: '5px' }}>{amenity}</label>
          </div>
        ))}
      </div>

      {/* Hotel List */}
      <div style={{ overflowY: 'auto' }}>
        <SearchBar />
        <div className="grid grid-cols-1 gap-4">
          {filteredHotels.map((hotel) => (
            <div key={hotel.id} onClick={() => handleHotelClick(hotel.id)}>
              <HotelCard {...hotel} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HotelList;
