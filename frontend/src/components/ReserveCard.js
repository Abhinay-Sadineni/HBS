import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';

function ReserveCard(props) {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [numRooms, setNumRooms] = useState('');
    const [numGuests, setNumGuests] = useState('');

    const handleReserve = () => {
        
        console.log('Reserving...');
    };

    return (
        <div className="max-w-10em mx-auto bg-white p-6 rounded-md shadow-md border border-gray-300">
            <h1 className="font-bold">{props.price} Rs for Night</h1>
            <div className="flex flex-col md:flex-row md:space-x-4">
                <div className="flex-grow">
                    <DatePicker
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        maxDate={endDate}
                        placeholderText="Check in"
                        className="w-full rounded-md px-4 py-2 border border-gray-300"
                        // popperModifiers={{
                        //     zIndex: {
                        //         enabled: true,
                        //         zIndex: 1100, 
                        //     },
                        // }}
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
                        className="w-full rounded-md px-4 py-2 border border-gray-300"
                    />
                </div>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-4 mt-4">
                <div className="flex-grow">
                    <input type="number" id="num_rooms" placeholder="Rooms" value={numRooms} onChange={(e) => setNumRooms(e.target.value)} className="w-full rounded-md px-4 py-2 border border-gray-300" />
                </div>
                <div className="flex-grow">
                    <input type="number" placeholder="Guests" value={numGuests} onChange={(e) => setNumGuests(e.target.value)} className="w-full rounded-md px-4 py-2 border border-gray-300" />
                </div>
            </div>
            <div className="mt-4">
                <button onClick={handleReserve} className="bg-pink-500 text-white px-4 py-2 rounded-md w-full">Reserve</button>
                <Link to="/bill" className="btn btn-primary bg-pink-500 text-white px-4 py-2 rounded-md w-full"> Reserve</Link>
            </div>
            <div className="flex justify-between mt-4">
                <h2 className="font-bold">Total before taxes</h2>
                <h2 className="font-bold">10000Rs</h2>
            </div>
        </div>
    );
};

export default ReserveCard;
