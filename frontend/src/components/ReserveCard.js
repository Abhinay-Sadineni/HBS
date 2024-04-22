// import React, { useState } from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { Link } from 'react-router-dom';

// function ReserveCard(props) {
//     const [startDate, setStartDate] = useState(null);
//     const [endDate, setEndDate] = useState(null);
    // const [numRooms, setNumRooms] = useState('');
//     const [numGuests, setNumGuests] = useState('');

//     const handleReserve = () => {
        
//         console.log('Reserving...');
//     };

//     return (
//         <div className="max-w-10em mx-auto bg-white p-6 rounded-md mt-4 shadow-md border border-gray-300">
//             <h1 className="font-bold mb-4">{props.price} Rs for Night</h1>
//             <div className="flex flex-col md:flex-row md:space-x-4">
//                 <div className="flex-grow">
//                     <DatePicker
//                         selected={startDate}
//                         onChange={date => setStartDate(date)}
//                         selectsStart
//                         startDate={startDate}
//                         endDate={endDate}
//                         maxDate={endDate}
//                         placeholderText="Check in"
//                         className="w-full rounded-md px-4 py-2 border border-gray-300"
//                     />
//                 </div>
//                 <div className="flex-grow">
//                     <DatePicker
//                         selected={endDate}
//                         onChange={date => setEndDate(date)}
//                         selectsEnd
//                         startDate={startDate}
//                         endDate={endDate}
//                         minDate={startDate}
//                         placeholderText="Check Out"
//                         className="w-full rounded-md px-4 py-2 border border-gray-300"
//                     />
//                 </div>
//             </div>
            // <div className="flex flex-col md:flex-row md:space-x-4 mt-4">
                // <div className="flex-grow">
                //     <input type="number" id="num_rooms" placeholder="Rooms" value={numRooms} onChange={(e) => setNumRooms(e.target.value)} className="w-full rounded-md px-4 py-2 border border-gray-300" />
                // </div>
//                 <div className="flex-grow">
//                     <input type="number" placeholder="Guests" value={numGuests} onChange={(e) => setNumGuests(e.target.value)} className="w-full rounded-md px-4 py-2 border border-gray-300" />
//                 </div>
//             </div>
//             <div className="mt-4">
//                 {/* <button onClick={handleReserve} className="bg-pink-500 text-white px-4 py-2 rounded-md w-full">Reserve</button> */}
//                 <Link to="/bill" className="bg-pink-500 text-white px-4 py-2 rounded-md block w-full"> Reserve</Link>
//             </div>
//             <div className="flex justify-between mt-4">
//                 <h2 className="font-bold">Total before taxes</h2>
//                 <h2 className="font-bold">10000Rs</h2>
//             </div>
//         </div>
//     );
// };

// export default ReserveCard;

import React, { useState, useEffect, useRef  } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';

function ReserveCard(props) {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [numRooms, setNumRooms] = useState(0);
    const [numLuxuryRooms, setNumLuxuryRooms] = useState(0);
    const [numDeluxeRooms, setNumDeluxeRooms] = useState(0);
    const [numStandardRooms, setNumStandardRooms] = useState(0);
    const [numGuests, setNumGuests] = useState('');
    const [isRoomSelectionVisible, setIsRoomSelectionVisible] = useState(false);
    const roomSelectionRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (roomSelectionRef.current && !roomSelectionRef.current.contains(event.target)) {
                setIsRoomSelectionVisible(false); // Hide room selection if clicked outside
            }
        }

        // Attach event listener when the component mounts
        if(isRoomSelectionVisible){
            document.addEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isRoomSelectionVisible]); // Empty dependency array ensures that this effect runs only once

    const handleReserve = () => {
        console.log('Reserving...');
    };

    const handleIncrement = (roomType) => {
        switch (roomType) {
            case 'Luxury':
                setNumLuxuryRooms(numLuxuryRooms + 1);
                break;
            case 'Deluxe':
                setNumDeluxeRooms(numDeluxeRooms + 1);
                break;
            case 'Standard':
                setNumStandardRooms(numStandardRooms + 1);
                break;
            default:
                break;
        }
        setNumRooms(numRooms + 1);
    };

    const handleDecrement = (roomType) => {
        switch (roomType) {
            case 'Luxury':
                if (numLuxuryRooms > 0) {
                    setNumLuxuryRooms(numLuxuryRooms - 1);
                    setNumRooms(numRooms - 1);
                }
                break;
            case 'Deluxe':
                if (numDeluxeRooms > 0) {
                    setNumDeluxeRooms(numDeluxeRooms - 1);
                    setNumRooms(numRooms - 1);
                }
                break;
            case 'Standard':
                if (numStandardRooms > 0) {
                    setNumStandardRooms(numStandardRooms - 1);
                    setNumRooms(numRooms - 1);
                }
                break;
            default:
                break;
        }
        
    };

    const handleRoomsInputFocus = () => {
        // setIsRoomsInputFocused(true);
        setIsRoomSelectionVisible(true);
    };

    const handleRoomsInputBlur = () => {
        // setIsRoomsInputFocused(false);
        setIsRoomSelectionVisible(false);
    };

    return (
        <div className="max-w-10em mx-auto bg-white p-6 rounded-md mt-4 shadow-md border border-gray-300">
            <h1 className="font-bold mb-4">{props.price} Rs for Night</h1>
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
                <div className="flex-grow relative"
                ref = {roomSelectionRef}
                >
                    <input
                        id="num_rooms"
                        placeholder="Rooms"
                        value={numRooms}
                        onChange={(e) => setNumRooms(e.target.value)}
                        onClick = {handleRoomsInputFocus}
                        className="w-full rounded-md px-4 py-2 border border-gray-300"
                    />
                    {isRoomSelectionVisible && (
                        <div 
                        className="room-container shadow-lg border border-gray-200 rounded-lg mt-2 p-4">
                            <div className="room-type flex justify-between items-center">Luxury
                                <div className="flex justify-center">
                                    <button onClick={() => handleIncrement('Luxury')} className="plus-button m-2 rounded-full border border-gray-300">+</button>
                                    <div className="room-count m-2">{numLuxuryRooms}</div>
                                    <button onClick={() => handleDecrement('Luxury')} className="minus-button m-2 rounded-full border border-gray-300">-</button>
                                </div>
                            </div>
                            <div className="room-type flex justify-between items-center">Deluxe
                                <div className="flex justify-center">
                                    <button onClick={() => handleIncrement('Deluxe')} className="plus-button m-2 rounded-full border border-gray-300">+</button>
                                    <div className="room-count m-2">{numDeluxeRooms}</div>
                                    <button onClick={() => handleDecrement('Deluxe')} className="minus-button m-2 rounded-full border border-gray-300">-</button>
                                </div>
                            </div>
                            <div className="room-type flex justify-between items-center">Standard
                                <div className="flex justify-center">
                                    <button onClick={() => handleIncrement('Standard')} className="plus-button m-2 rounded-full border border-gray-300">+</button>
                                    <div className="room-count m-2">{numStandardRooms}</div>
                                    <button onClick={() => handleDecrement('Standard')} className="minus-button m-2 rounded-full border border-gray-300">-</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex-grow">
                    <input type="number" placeholder="Guests" value={numGuests} onChange={(e) => setNumGuests(e.target.value)} className="w-full rounded-md px-4 py-2 border border-gray-300" />
                </div>
            </div>
            <div className="mt-4">
                <Link to={props.rout} className="bg-pink-500 text-white px-4 py-2 rounded-md block w-full"> Reserve</Link>
            </div>
            <div className="flex justify-between mt-4">
                <h2 className="font-bold">Total before taxes</h2>
                <h2 className="font-bold">{props.price * (numLuxuryRooms + numDeluxeRooms + numStandardRooms)}Rs</h2>
            </div>
        </div>
    );
}

export default ReserveCard;