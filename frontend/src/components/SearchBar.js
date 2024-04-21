import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const SearchBar = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [location, setLocation] = useState('');
    const [numRooms, setNumRooms] = useState('');
    const [numGuests, setNumGuests] = useState('');

    const handleSearch = () => {
        // Handle search functionality here
        console.log('Searching...');
    };

    return (
        <div className='flex justify-center'>
        <div className="max-w-10em mx-auto bg-white  rounded-md  flex flex-col md:flex-row ">
            <div >
                <input type="text" id="location" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full  px-2 py-2 mb-4 md:mb-0 border-y border-l border-gray-300" />
            </div>
            <div >
                <DatePicker
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    maxDate={endDate}
                    placeholderText="Check in"
                    className="w-full  px-2 py-2 mb-4 md:mb-0 border-y border-l border-gray-300"
                />
            </div>
            <div >
                <DatePicker
                    selected={endDate}
                    onChange={date => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    placeholderText="Check Out"
                    className="w-full  px-2 py-2 mb-4 md:mb-0 border-y border-l border-gray-300"
                />
            </div>
            <div >
                <input type="number" id="num_rooms" placeholder="Rooms" value={numRooms} onChange={(e) => setNumRooms(e.target.value)} className="w-full  px-2 py-2 mb-4 md:mb-0 border-y border-l border-gray-300" />
            </div>
            <div >
                <input type="number" id="num_guests" placeholder="Guests" value={numGuests} onChange={(e) => setNumGuests(e.target.value)} className="w-full  px-2 py-2 mb-4 md:mb-0 border border-gray-300" />
            </div>
            <div>
                <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 ml-4 rounded-md mt-4 md:mt-0">Search</button>
            </div>
        </div>
        </div>
    );
};

export default SearchBar;