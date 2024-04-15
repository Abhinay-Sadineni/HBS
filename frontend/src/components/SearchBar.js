// import React, { useState } from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// const SearchBar = () => {
//     const [startDate, setStartDate] = useState(null);
//     const [endDate, setEndDate] = useState(null);
//     const [location, setLocation] = useState('');
//     const [numRooms, setNumRooms] = useState('');

//     const handleSearch = () => {
//         // Handle search functionality here
//         console.log('Searching...');
//     };

//     return (
//         <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
//             <h2 className="text-xl font-semibold mb-4">Search Bar</h2>
//             <div className="flex flex-col md:flex-row md:space-x-4">
//                 <input type="text" id="location" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full border-gray-300 rounded-md px-4 py-2 mb-4 md:mb-0" />
//                 <DatePicker
//                     selected={startDate}
//                     onChange={date => setStartDate(date)}
//                     selectsStart
//                     startDate={startDate}
//                     endDate={endDate}
//                     maxDate={endDate}
//                     placeholderText="Check in"
//                     className="w-20 md:w-full border-gray-300 rounded-md px-4 py-2 mb-4 md:mb-0"
//                 />
//                 <DatePicker
//                     selected={endDate}
//                     onChange={date => setEndDate(date)}
//                     selectsEnd
//                     startDate={startDate}
//                     endDate={endDate}
//                     minDate={startDate}
//                     placeholderText="Check Out"
//                     className="w-20 md:w-full border-gray-300 rounded-md px-4 py-2 mb-4 md:mb-0"
//                 />

//                 <input type="number" id="num_rooms" placeholder="Rooms" value={numRooms} onChange={(e) => setNumRooms(e.target.value)} className="w-full border-gray-300 rounded-md px-4 py-2 mb-4 md:mb-0" />
//             </div>
//             <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">Search</button>
//         </div>
//     );
// };

// export default SearchBar;

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const SearchBar = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [location, setLocation] = useState('');
    const [numRooms, setNumRooms] = useState('');

    const handleSearch = () => {
        // Handle search functionality here
        console.log('Searching...');
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md flex flex-col md:flex-row md:space-x-4">
            <div className="flex-grow">
                <input type="text" id="location" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full border-gray-300 rounded-md px-4 py-2 mb-4 md:mb-0" />
            </div>
            <div className="flex-grow">
                <DatePicker
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    maxDate={endDate}
                    placeholderText="Check in"
                    className="w-full border-gray-300 rounded-md px-4 py-2 mb-4 md:mb-0"
                />
            </div>
            <div className="flex-grow">
                <DatePicker
                    selected={endDate}
                    onChange={date => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    placeholderText="Check Out"
                    className="w-full border-gray-300 rounded-md px-4 py-2 mb-4 md:mb-0"
                />
            </div>
            <div className="flex-grow">
                <input type="number" id="num_rooms" placeholder="Rooms" value={numRooms} onChange={(e) => setNumRooms(e.target.value)} className="w-full border-gray-300 rounded-md px-4 py-2 mb-4 md:mb-0" />
            </div>
            <div>
                <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 md:mt-0">Search</button>
            </div>
        </div>
    );
};

export default SearchBar;


