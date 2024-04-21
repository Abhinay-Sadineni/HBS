import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import HotelCard from '../components/Hotel_card';
import NavBar from '../components/NavBar';
import { useLocation } from 'react-router-dom';
import axios from 'axios'

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
    popularity: 10,// Example popularity
    imgURL: "https://a0.muscache.com/im/pictures/miso/Hosting-820733145568572294/original/0c68a135-b239-4a95-b3d6-ad89816cd922.jpeg?im_w=720" // Example popularity
  },
  {
    id: 2,
    name: 'Example Hotel 2',
    ratings: '4.2/5',
    location: 'City B, Country Y',
    priceRange: '$$',
    amenities: ['Wifi', 'Gym'],
    prices: [150, 550], // Min and Max prices
    popularity: 5,// Example popularity
    imgURL: "https://a0.muscache.com/im/pictures/miso/Hosting-820733145568572294/original/0c68a135-b239-4a95-b3d6-ad89816cd922.jpeg?im_w=720" // Example popularity
  },
  {
    id: 3,
    name: 'Example Hotel 3',
    ratings: '4.7/5',
    location: 'City C, Country Z',
    priceRange: '$$$',
    amenities: ['Parking', 'Restaurant'],
    prices: [350, 450], // Min and Max prices
    popularity: 8,// Example popularity
    imgURL: "https://a0.muscache.com/im/pictures/miso/Hosting-820733145568572294/original/0c68a135-b239-4a95-b3d6-ad89816cd922.jpeg?im_w=720"
  },
  {
    id: 4,
    name: 'Example Hotel 1',
    ratings: '4.5/5',
    location: 'City A, Country X',
    priceRange: '$$$',
    amenities: ['Wifi', 'Parking', 'Pool'],
    prices: [250, 350], // Min and Max prices
    popularity: 10,// Example popularity
    imgURL: "https://a0.muscache.com/im/pictures/miso/Hosting-820733145568572294/original/0c68a135-b239-4a95-b3d6-ad89816cd922.jpeg?im_w=720" // Example popularity
  },
  {
    id: 5,
    name: 'Example Hotel 2',
    ratings: '4.2/5',
    location: 'City B, Country Y',
    priceRange: '$$',
    amenities: ['Wifi', 'Gym'],
    prices: [150, 550], // Min and Max prices
    popularity: 5,// Example popularity
    imgURL: "https://a0.muscache.com/im/pictures/miso/Hosting-820733145568572294/original/0c68a135-b239-4a95-b3d6-ad89816cd922.jpeg?im_w=720" // Example popularity
  },
  {
    id: 6,
    name: 'Example Hotel 3',
    ratings: '4.7/5',
    location: 'City C, Country Z',
    priceRange: '$$$',
    amenities: ['Parking', 'Restaurant'],
    prices: [350, 450], // Min and Max prices
    popularity: 8,// Example popularity
    imgURL: "https://a0.muscache.com/im/pictures/miso/Hosting-820733145568572294/original/0c68a135-b239-4a95-b3d6-ad89816cd922.jpeg?im_w=720" // Example popularity
  }
];




function HotelList() {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [lowPrice, setLowPrice] = useState(Math.min(...dummyHotels.flatMap((hotel) => hotel.prices)));
  const [highPrice, setHighPrice] = useState(Math.max(...dummyHotels.flatMap((hotel) => hotel.prices)));
  const [sortOption, setSortOption] = useState('popularity');


  const { state } = useLocation();


  useEffect(() => {
    if (state) {
      console.log(state);
      axios.get('http://localhost:5000/search', 
      {params: {
        location: state.location,
        no_of_rooms: state.numRooms,
        no_of_guests: state.numGuests,
        start_date: state.startDate,
        end_date: state.endDate
      }
    }
    
    )
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error('Error fetching hotels:', error);
        });
    } else {
      
    }
  }, []);



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
    <div className='h-screen'>
      {/* Navbar */}
      <NavBar />


      <div className=' z-[-6] flex flex-col'>
        <aside id="default-sidebar" className="fixed border top-[78px] left-0  w-[350px] h-fit transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
          <div className="h-full px-3 py-4 bg-gray-50">
            {/* Heading for filters */}
            <div className="grid grid-cols-2 gap-4 items-center">
              <h2 className="text-3xl font-sans">Filters</h2>
              <button className="text-red-300">Clear All</button>
            </div>

            {/* Price Filter */}
            <div className="flex flex-col border-4  p-4 mt-5">
              <h3 className='text-2xl'>Price </h3>
              <div className="flex items-center mb-2 mt-3">
                <label className="mr-2">Low Price:</label>
                <input type="number" value={lowPrice} onChange={(e) => setLowPrice(parseInt(e.target.value))} className="w-20 border rounded px-2" />
              </div>
              <div className="flex items-center">
                <label className="mr-2">High Price:</label>
                <input type="number" value={highPrice} onChange={(e) => setHighPrice(parseInt(e.target.value))} className="w-20 border rounded px-2" />
              </div>
            </div>

            {/* Amenities Filter */}
            <div id="Amenties" className="pt-2 px-10 w-100 border-4 my-2">
              <h3 className="mb-4">Amenities:</h3>
              <div className="flex flex-col">
                {['Wifi', 'Parking', 'Pool', 'Gym', 'Restaurant'].map((amenity, index) => (
                  <div key={amenity} className="mb-2 flex items-center">
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
                      className="mr-2"
                    />
                    <label htmlFor={`amenity-${amenity}`}>{amenity}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <div id='Listings' className=' border top-[78px] right-0 py-2 border-r-2 px-10 overflow-scroll no-scrollbar max-h-[720px] ml-[350px] mt-[78px]'>
          <div className="grid grid-cols-1 gap-4 ">
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

