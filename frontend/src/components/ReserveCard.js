import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function ReserveCard(props) {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [roomTypes, setRoomTypes] = useState([]);
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
        if (isRoomSelectionVisible) {
            document.addEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isRoomSelectionVisible]); // Empty dependency array ensures that this effect runs only once

    useEffect(() => {
        const combinedRoomTypes = props.RoomTypes.map(roomType => ({
            ...roomType,
            count: 0,
            min_vacant_rooms: 0
        }));

        props.VacantRooms.forEach(vacantRoom => {
            const index = combinedRoomTypes.findIndex(roomType => roomType.room_type_id === vacantRoom.room_type_id);
            if (index !== -1) {
                combinedRoomTypes[index].min_vacant_rooms = vacantRoom.min_vacant_rooms;
            }
        });

        setRoomTypes(combinedRoomTypes);
    }, [props.RoomTypes, props.VacantRooms]);

    const handleReserve = () => {
        console.log('Reserving...');
    };

    const handleIncrement = (roomType) => {
        const updatedRoomTypes = roomTypes.map(room => {
            if (room.room_type_name === roomType.room_type_name && room.count + 1 <room.min_vacant_rooms) {
                return {
                    ...room,
                    count: room.count + 1
                };
            }
            return room;
        });

        setRoomTypes(updatedRoomTypes);
    };

    const handleDecrement = (roomType) => {
        const updatedRoomTypes = roomTypes.map(room => {
            if (room.room_type_name === roomType.room_type_name && room.count > 0) {
                return {
                    ...room,
                    count: room.count - 1
                };
            }
            return room;
        });

        setRoomTypes(updatedRoomTypes);
    };

    const handleRoomsInputFocus = () => {
        setIsRoomSelectionVisible(true);
    };

    const handleRoomsInputBlur = () => {
        setIsRoomSelectionVisible(false);
    };

    const renderRoomTypes = () => {
        return roomTypes.map((room, index) => (
            <div key={index} className="room-type flex justify-between items-center">{room.room_type_name}
                <div className="flex justify-center">
                    <button onClick={() => handleDecrement(room)} className={`minus-button m-2 rounded-full border border-gray-300 ${room.count === 0 ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={room.count === 0}><RemoveIcon /></button>
                    <div className="room-count m-2">{room.count}</div>
                    <button onClick={() => handleIncrement(room)} className="plus-button m-2 rounded-full border border-gray-300"> <AddIcon /></button>
                </div>
            </div>
        ));
    };

    const calculateTotalBeforeTaxes = () => {
        let totalBeforeTaxes = 0;
        roomTypes.forEach(roomType => {
            totalBeforeTaxes += roomType.count * roomType.min_vacant_rooms;
        });
        return totalBeforeTaxes;
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
                <div className="flex-grow relative" ref={roomSelectionRef}>
                    <input
                        id="num_rooms"
                        placeholder="Rooms"
                        value=""
                        onClick={handleRoomsInputFocus}
                        className="w-full rounded-md px-4 py-2 border border-gray-300"
                        readOnly
                    />
                    {isRoomSelectionVisible && (
                        <div className="room-container shadow-lg border border-gray-200 rounded-lg mt-2 p-4">
                            {renderRoomTypes()}
                        </div>
                    )}
                </div>
                <div className="flex-grow">
                    <input type="number" placeholder="Guests" value={numGuests} onChange={(e) => setNumGuests(e.target.value)} className="w-full rounded-md px-4 py-2 border border-gray-300" />
                </div>
            </div>
            <div className="mt-4">
                <Link to={props.rout} className="bg-pink-500 text-white px-4 py-2 rounded-md block w-full" onClick={handleReserve}> Reserve</Link>
            </div>
            <div className="flex justify-between mt-4">
                <h2 className="font-bold">Total before taxes</h2>
                <h2 className="font-bold">{calculateTotalBeforeTaxes()} Rs</h2>
            </div>
        </div>
    );
}

export default ReserveCard;
