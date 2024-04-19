import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HotelCard from '../components/Hotel_card';
import SearchBar from '../components/SearchBar';

// Dummy data with prices as an array
const dummyHotels = [
  {
    id: 1,
    name: 'Example Hotel 1',
    ratings: '4.5/5',
    location: 'City A, Country X',
    priceRange: '$$$',
    amenities: ['Wifi', 'Parking', 'Pool'],
    prices: [250, 350], // Min and Max prices
    popularity: 10 // Example popularity
  },
  {
    id: 2,
    name: 'Example Hotel 2',
    ratings: '4.2/5',
    location: 'City B, Country Y',
    priceRange: '$$',
    amenities: ['Wifi', 'Gym'],
    prices: [150, 550], // Min and Max prices
    popularity: 5 // Example popularity
  },
  {
    id: 3,
    name: 'Example Hotel 3',
    ratings: '4.7/5',
    location: 'City C, Country Z',
    priceRange: '$$$',
    amenities: ['Parking', 'Restaurant'],
    prices: [350, 450], // Min and Max prices
    popularity: 8 // Example popularity
  }
];

function HotelList() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [lowPrice, setLowPrice] = useState(Math.min(...dummyHotels.flatMap((hotel) => hotel.prices)));
  const [highPrice, setHighPrice] = useState(Math.max(...dummyHotels.flatMap((hotel) => hotel.prices)));
  const [sortOption, setSortOption] = useState('popularity'); // Default sort option

  const handleHotelClick = (hotelId) => {
    navigate(`/hotel/${hotelId}`);
  };

  // Sort options including ratings
  const sortOptions = [
    { label: 'Popularity', value: 'popularity' },
    { label: 'Ratings', value: 'ratings' },
    { label: 'Price: Low to High', value: 'price_asc' },
    { label: 'Price: High to Low', value: 'price_desc' }
  ];

  // Sort hotels based on selected sort option
  let sortedHotels = [...dummyHotels];
  if (sortOption === 'popularity') {
    sortedHotels = sortedHotels.sort((a, b) => b.popularity - a.popularity); // Sort by popularity
  } else if (sortOption === 'ratings') {
    sortedHotels = sortedHotels.sort((a, b) => parseFloat(b.ratings) - parseFloat(a.ratings)); // Sort by ratings
  } else if (sortOption === 'price_asc') {
    sortedHotels = sortedHotels.sort((a, b) => a.prices[0] - b.prices[0]); // Sort by min price
  } else if (sortOption === 'price_desc') {
    sortedHotels = sortedHotels.sort((a, b) => b.prices[1] - a.prices[1]); // Sort by max price
  }

  // Filter hotels based on search query, selected amenities, and price range
  const filteredHotels = sortedHotels.filter((hotel) => {
    const matchesSearch = hotel.name.toLowerCase().includes(searchQuery.toLowerCase());
    const hasSelectedAmenities = selectedAmenities.every((amenity) => hotel.amenities.includes(amenity));
    const priceInRange = hotel.prices.some((price) => price >= lowPrice && price <= highPrice);
    return matchesSearch && hasSelectedAmenities && priceInRange;
  });

  return (
    <div>
      <SearchBar />
      <div class ="absolute right-1 " style={{ marginBottom: '5px', marginTop: '5px', }}>
        <label style={{ marginRight: '10px' }}>Sort By:</label>
        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} style={{ marginLeft: '10px' }}>
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 5fr', gap: '10px' }}>
        {/* Amenities Selection */}
        <div style={{ width: '100%', padding: '10px', borderRight: '5px solid #ccc', backgroundColor: '#f7f7f7' }}>
          <h3 style={{ marginBottom: '10px' }}>Amenities:</h3>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {['Wifi', 'Parking', 'Pool', 'Gym', 'Restaurant'].map((amenity, index) => (
              <div key={amenity} style={{ marginBottom: '5px', display: 'flex', alignItems: 'center' }}>
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
                <label htmlFor={`amenity-${amenity}`} style={{ marginLeft: '5px', display: 'flex', alignItems: 'center' }}>
                  <img src={`../assets/images/amenity${index + 1}.png`} alt={`Icon for ${amenity}`} style={{ marginRight: '5px', height: '20px', width: '20px' }} />
                  {amenity}
                </label>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '20px', marginBottom: '10px' }}>
            <label style={{ marginRight: '10px' }}>Low Price:</label>
            <input type="number" value={lowPrice} onChange={(e) => setLowPrice(e.target.value)} style={{ width: '70px' }} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ marginRight: '10px' }}>High Price:</label>
            <input type="number" value={highPrice} onChange={(e) => setHighPrice(e.target.value)} style={{ width: '70px' }} />
          </div>
        </div>
        {/* Hotel List */}
        <div style={{ overflowY: 'auto' }}>
          <div className="grid grid-cols-1 gap-4" style={{ marginTop: '30px', }}>
            {filteredHotels.map((hotel) => (
              <div key={hotel.id} onClick={() => handleHotelClick(hotel.id)}>
                <HotelCard {...hotel} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelList;
