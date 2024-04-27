import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Card from '../components/List_card';
import hotelsList from '../components/hotels';
import Login from '../pages/Login';
import Signup from './Signup';

function Home() {
  const [loginPopup, setLoginPopup] = useState(false);
  const [signUpPopup, setSignUpPopup] = useState(false);
  const [amPopup, setAmPopup] = useState(false);

  console.log(loginPopup);
  const am = [
    "Wifi", "TV", "Kitchen", "Washing Machine", "Air Conditioning",
    "Dedicated work space", "Free Parking on Premises", "Pool", "Piano",
    "Smoke alarm", "Fire Extingusher", "Carbon Monoxide Alarm", "First Aid Kit"
];

const rooms_am = [
    "TV", "Kitchen", "Washing Machine", "Air Conditioning",
   "Dedicated work space", "Essentials", "Ceiling Fan", "Fridge", "Micro Wave", 
];

  return (
    <div className="h-screen relative">
      <NavBar loginPopup={loginPopup} setLoginPopup={setLoginPopup} 
              signUpPopup = {signUpPopup} setSignUpPopup = {setSignUpPopup}
      /> 
      <div className="fixed mt-1 mb-4 border border-gray-300 bg-white shadow-lg">
        <button onClick={() => setAmPopup(true)} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Show Filters</button>
      </div>
    

      <div className="border mt-[78px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 overflow-scroll no-scrollbar max-h-[720px]">
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

      {amPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg w-2/5 h-4/5 relative">
            <button onClick={() => setAmPopup(false)} className="absolute top-0 right-0 p-2 text-gray-600 hover:text-gray-800"> &#x2715; </button>
            <h1 className="text-2xl mb-4">Amenities</h1>
            <div className="grid grid-cols-2 gap-2">
              {am.map((amenity, index) => (
                <div key={index} className="mb-2">
                  <input type="checkbox" id={`amenity-${index}`} name={`amenity-${index}`} />
                  <label htmlFor={`amenity-${index}`} className="ml-2">{amenity}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      


      {loginPopup && (
  <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
    <div className='bg-white p-8 rounded-lg w-2/5 h-3/5 relative'>
      <button onClick={() => setLoginPopup(false)} className="absolute top-0 right-0 p-2 text-gray-600 hover:text-gray-800"> &#x2715; </button>
      <Login />
    </div>
  </div>
)}

{signUpPopup && (
  <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
    <div className='bg-white p-8 rounded-lg w-2/5 h-4/5 relative flex justify-center items-center'>
      <button onClick={() => setSignUpPopup(false)} className="absolute top-0 right-0 p-2 text-gray-600 hover:text-gray-800"> &#x2715; </button>
      <Signup />
    </div>
  </div>
)}



    </div>
  );
}

export default Home;
