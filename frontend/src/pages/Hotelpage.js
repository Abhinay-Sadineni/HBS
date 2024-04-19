import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import SearchBar from '../components/SearchBar';
import hotelsList from '../components/hotels';
import ReserveCard from '../components/ReserveCard';
import RatingBar from '../components/RatingBar';
import reviewList from '../components/reviews';

import { useParams } from 'react-router-dom';
const rating = [1000, 1000, 1000, 1000, 1000];

function ReviewCard(props){
  return (
    <div className="flex flex-col border border-gray-400 p-4 mb-4">
      <h2>{props.name}</h2>
      <h2>{props.rating} </h2>
      <p>{props.review}</p>
    </div>
  );
}

function Hotelpage() {

  const { hotelId } = useParams();
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="HI">
      <NavBar /> 
      <SearchBar />
      <div className='flex flex-col md:flex-row items-start md:items-center justify-between ml-10 mr-10'>
        <div className="md:w-1/2 md:mr-5">
          <h1 className="text-xl font-bold mt-4">Hotel Name</h1>
          <h2 className="text-lg font-semibold">Hosted by Manager</h2>
          <p className="text-sm">It is an architectural villa on the south side of Koh Samui, private and in a natural environment, it has sweeping ocean views and has a great salt water lap pool. Half way up a hill, it gets natural breezes, whithout mozzies even at dusk. It is minimally designed, but takes maximum advantage of the nature. It is called the naked house because the walls are left naked. We primarily cater to families and couples.</p>
    
          <div className="border-t border-b border-gray-400 py-4 mt-4 mb-4">
            <h1 className="text-xl font-bold">What this place offers</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <p>Mountain view</p>
              <p>Ocean view</p>
              <p>Kitchen</p>
              <p>Wifi</p>
              <p>Dedicated work space</p>
            </div>
          </div>
          <h1 className="text-xl font-bold" >Ratings and Reviews</h1>
          <div className="border-b border-gray-400 py-4 mb-4">
            <RatingBar ratings={rating} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviewList.slice(0, 4).map((review, index) => ( 
              <ReviewCard 
                key={index}
                name={review.name}
                rating={review.rating}
                review={review.review}
              />
            ))}
          </div>
          <button onClick={togglePopup} className="btn btn-primary mt-4 border border-gray-400 rounded-md px-4 py-2">Show All Reviews</button>
          {showPopup && (
            <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-8 rounded-lg overflow-y-auto max-h-full">
                <button onClick={togglePopup} className="absolute top-0 right-0 p-2 text-gray-600 hover:text-gray-800">
                  &#x2715;
                </button>
                <h1 className="text-xl font-bold mb-4">All Reviews</h1>
                <div className="grid grid-cols-1 gap-4">
                  {reviewList.map((review, index) => (
                    <ReviewCard 
                      key={index}
                      name={review.name}
                      rating={review.rating}
                      review={review.review}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        <div className="md:w-1/2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <img src={hotelsList[0].imgURL} className="w-full h-48 md:h-96" alt="Main Image" /> 
            </div>
            <div className="grid grid-cols-2 gap-2">
              <img src={hotelsList[0].i2} className="w-full h-24 md:h-48" alt="Image 2" /> 
              <img src={hotelsList[0].i3} className="w-full h-24 md:h-48" alt="Image 3" />
              <img src={hotelsList[0].i4} className="w-full h-24 md:h-48" alt="Image 4" />
              <img src={hotelsList[0].i5} className="w-full h-24 md:h-48" alt="Image 5" />
            </div>
          </div>
          {!showPopup && (
            <div className="ml-auto mt-5 md:mt-0">
              <ReserveCard price="10000" rout = "/bill" /> 
            </div>
          )}
        </div>
      </div>
      <Link to="/hotel-page" className="btn btn-primary">Logout</Link>
    </div>
  );
}

export default Hotelpage;
