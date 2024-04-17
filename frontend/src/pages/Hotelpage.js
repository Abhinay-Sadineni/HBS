// import React from 'react';
// import { Link } from 'react-router-dom';
// import NavBar from '../components/NavBar';
// import SearchBar from '../components/SearchBar';
// import hotelsList from '../components/hotels';
// import ReserveCard from '../components/ReserveCard';

// function Hotelpage() {
//   return (
//     <div className="HI">
//       <NavBar /> 
//       <SearchBar />
//       <div className="ml-10 mr-10">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-2 m-5">
//           <div>
//             <img src={hotelsList[0].imgURL} className="w-full h-48 md:h-96" alt="Main Image" /> 
//           </div>
//           <div className="grid grid-cols-2 gap-2">
//             <img src={hotelsList[0].i2} className="w-full h-24 md:h-48" alt="Image 2" /> 
//             <img src={hotelsList[0].i3} className="w-full h-24 md:h-48" alt="Image 3" />
//             <img src={hotelsList[0].i4} className="w-full h-24 md:h-48" alt="Image 4" />
//             <img src={hotelsList[0].i5} className="w-full h-24 md:h-48" alt="Image 5" />
//           </div>
//         </div>
//         <div className="max-w-xs mx-auto">
//             <ReserveCard price="10000"  /> 
//         </div>
//       </div>
//       <Link to="/hotel-page" className="btn btn-primary">Logout</Link>
//     </div>
//   );
// }

// export default Hotelpage;
import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import SearchBar from '../components/SearchBar';
import hotelsList from '../components/hotels';
import ReserveCard from '../components/ReserveCard';

function Hotelpage() {
  return (
    <div className="HI ">
      <NavBar /> 
      <SearchBar />
      <div className='flex flex-col items-center'>
        <div className="ml-10 mr-10 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 m-5">
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
        </div>
        <div className="ml-auto mr-10">
          <ReserveCard price="10000" /> 
        </div>
      </div>
      <Link to="/hotel-page" className="btn btn-primary">Logout</Link>
    </div>
  );
}

export default Hotelpage;




