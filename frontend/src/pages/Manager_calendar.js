import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Manager_NavBar from "../components/Manager_navbar";
import axiosInstance from "../helpers/axios";

var prices = {
    "Tue Apr 23 2024": 1000,
    "Wed Apr 24 2024": 1000,
    "Thu Apr 25 2024": 1000,
    "Fri Apr 26 2024": 1000,
    "Sat Apr 27 2024": 1000,
    "Sun Apr 28 2024": 1000,
    "Mon Apr 29 2024": 1000,
    "Tue Apr 30 2024": 1000,
    "Wed May 01 2024": 1000,
    "Thu May 02 2024": 1000,
    "Fri May 03 2024": 1000,
    "Sat May 04 2024": 1000,
    "Sun May 05 2024": 1000,
    "Mon May 06 2024": 1000,
    "Tue May 07 2024": 1000,
    "Wed May 08 2024": 1000,
    "Thu May 09 2024": 1000,
    "Fri May 10 2024": 1000,
    "Sat May 11 2024": 1000,
    "Sun May 12 2024": 1000,
    "Mon May 13 2024": 1000,
    "Tue May 14 2024": 1000,
    "Wed May 15 2024": 1000,
    "Thu May 16 2024": 1000,
    "Fri May 17 2024": 1000,
    "Sat May 18 2024": 1000,
    "Sun May 19 2024": 1000,
    "Mon May 20 2024": 1000,
    "Tue May 21 2024": 1000,
    "Wed May 22 2024": 1016,
    "Thu May 23 2024": 1000,
    "Fri May 24 2024": 1000,
    "Sat May 25 2024": 2000,
    "Sun May 26 2024": 1000,
    "Mon May 27 2024": 1000,
    "Tue May 28 2024": 1000,
    "Wed May 29 2024": 1000,
    "Thu May 30 2024": 1000,
    "Fri May 31 2024": 1000,
    "Sat Jun 01 2024": 1000,
    "Sun Jun 02 2024": 1000,
    "Mon Jun 03 2024": 1000,
    "Tue Jun 04 2024": 1000,
    "Wed Jun 05 2024": 1000,
    "Thu Jun 06 2024": 1000,
    "Fri Jun 07 2024": 1000,
    "Sat Jun 08 2024": 1000,
    "Sun Jun 09 2024": 1000,
    "Mon Jun 10 2024": 1000,
    "Tue Jun 11 2024": 1000,
    "Wed Jun 12 2024": 1000,
    "Thu Jun 13 2024": 1000,
    "Fri Jun 14 2024": 1000,
    "Sat Jun 15 2024": 1000,
    "Sun Jun 16 2024": 1000,
    "Mon Jun 17 2024": 1000,
    "Tue Jun 18 2024": 1000,
    "Wed Jun 19 2024": 1000,
    "Thu Jun 20 2024": 1000,
    "Fri Jun 21 2024": 1000,
    "Sat Jun 22 2024": 1000,
    "Sun Jun 23 2024": 1000,
    "Mon Jun 24 2024": 1000,
    "Tue Jun 25 2024": 1000,
    "Wed Jun 26 2024": 1000,
    "Thu Jun 27 2024": 1000,
    "Fri Jun 28 2024": 1000,
    "Sat Jun 29 2024": 1000,
    "Sun Jun 30 2024": 1000,
    "Mon Jul 01 2024": 1000,
    "Tue Jul 02 2024": 1000,
    "Wed Jul 03 2024": 1000,
    "Thu Jul 04 2024": 1000,
    "Fri Jul 05 2024": 1000,
    "Sat Jul 06 2024": 1000,
    "Sun Jul 07 2024": 1000,
    "Mon Jul 08 2024": 1000,
    "Tue Jul 09 2024": 1000,
    "Wed Jul 10 2024": 1000,
    "Thu Jul 11 2024": 1000,
    "Fri Jul 12 2024": 1000,
    "Sat Jul 13 2024": 1000,
    "Sun Jul 14 2024": 1000,
    "Mon Jul 15 2024": 1000,
    "Tue Jul 16 2024": 1000,
    "Wed Jul 17 2024": 1000,
    "Thu Jul 18 2024": 1000,
    "Fri Jul 19 2024": 1000,
    "Sat Jul 20 2024": 1000,
    "Sun Jul 21 2024": 1000,
    "Mon Jul 22 2024": 1000
};

//available rooms = total rooms - reservation.
var availableRooms = {
    "Tue Apr 23 2024": 10,
    "Wed Apr 24 2024": 10,
    "Thu Apr 25 2024": 10,
    "Fri Apr 26 2024": 10,
    "Sat Apr 27 2024": 10,
    "Sun Apr 28 2024": 10,
    "Mon Apr 29 2024": 10,
    "Tue Apr 30 2024": 10,
    "Wed May 01 2024": 10,
    "Thu May 02 2024": 10,
    "Fri May 03 2024": 10,
    "Sat May 04 2024": 10,
    "Sun May 05 2024": 10,
    "Mon May 06 2024": 10,
    "Tue May 07 2024": 10,
    "Wed May 08 2024": 10,
    "Thu May 09 2024": 10,
    "Fri May 10 2024": 10,
    "Sat May 11 2024": 10,
    "Sun May 12 2024": 10,
    "Mon May 13 2024": 10,
    "Tue May 14 2024": 10,
    "Wed May 15 2024": 10,
    "Thu May 16 2024": 10,
    "Fri May 17 2024": 10,
    "Sat May 18 2024": 10,
    "Sun May 19 2024": 10,
    "Mon May 20 2024": 10,
    "Tue May 21 2024": 10,
    "Wed May 22 2024": 10,
    "Thu May 23 2024": 10,
    "Fri May 24 2024": 10,
    "Sat May 25 2024": 10,
    "Sun May 26 2024": 10,
    "Mon May 27 2024": 10,
    "Tue May 28 2024": 10,
    "Wed May 29 2024": 10,
    "Thu May 30 2024": 10,
    "Fri May 31 2024": 10,
    "Sat Jun 01 2024": 10,
    "Sun Jun 02 2024": 10,
    "Mon Jun 03 2024": 10,
    "Tue Jun 04 2024": 10,
    "Wed Jun 05 2024": 10,
    "Thu Jun 06 2024": 10,
    "Fri Jun 07 2024": 10,
    "Sat Jun 08 2024": 10,
    "Sun Jun 09 2024": 10,
    "Mon Jun 10 2024": 10,
    "Tue Jun 11 2024": 10,
    "Wed Jun 12 2024": 10,
    "Thu Jun 13 2024": 10,
    "Fri Jun 14 2024": 10,
    "Sat Jun 15 2024": 10,
    "Sun Jun 16 2024": 10,
    "Mon Jun 17 2024": 10,
    "Tue Jun 18 2024": 10,
    "Wed Jun 19 2024": 10,
    "Thu Jun 20 2024": 10,
    "Fri Jun 21 2024": 10,
    "Sat Jun 22 2024": 10,
    "Sun Jun 23 2024": 10,
    "Mon Jun 24 2024": 10,
    "Tue Jun 25 2024": 10,
    "Wed Jun 26 2024": 10,
    "Thu Jun 27 2024": 10,
    "Fri Jun 28 2024": 10,
    "Sat Jun 29 2024": 10,
    "Sun Jun 30 2024": 10,
    "Mon Jul 01 2024": 10,
    "Tue Jul 02 2024": 10,
    "Wed Jul 03 2024": 10,
    "Thu Jul 04 2024": 10,
    "Fri Jul 05 2024": 10,
    "Sat Jul 06 2024": 10,
    "Sun Jul 07 2024": 10,
    "Mon Jul 08 2024": 10,
    "Tue Jul 09 2024": 10,
    "Wed Jul 10 2024": 10,
    "Thu Jul 11 2024": 10,
    "Fri Jul 12 2024": 10,
    "Sat Jul 13 2024": 10,
    "Sun Jul 14 2024": 10,
    "Mon Jul 15 2024": 10,
    "Tue Jul 16 2024": 10,
    "Wed Jul 17 2024": 10,
    "Thu Jul 18 2024": 10,
    "Fri Jul 19 2024": 10,
    "Sat Jul 20 2024": 10,
    "Sun Jul 21 2024": 10,
    "Mon Jul 22 2024": 10
};




function Manager_calendar() {
    const [selectedDates, setSelectedDates] = useState([]);
    const [highlightDates, sethighlightDates] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [newPrice, setNewPrice] = useState(0);
    const [newRooms, setNewRooms] = useState(0);
    const today = new Date();
    const nextThreeMonths = new Date(today.getFullYear(), today.getMonth() + 3, today.getDate());


    useEffect(()=>{
        axiosInstance.get('/calender', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response) => {
            if (response.status === 200) {
                console.log(response.data)
            }
        })
    })

    const handleDateChange = (dates) => {
        sethighlightDates(dates);

        const newSelectedDates = [];
        if (!Array.isArray(dates) || dates.length === 0) return;

        const [startDate, endDate] = dates;
        const currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            newSelectedDates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1); 
        }
        setSelectedDates(newSelectedDates);
    };

    const selectedPrices = selectedDates.map(date => prices[date.toDateString()]);
    const minPrice = Math.min(...selectedPrices);
    const maxPrice = Math.max(...selectedPrices);

    const selectedRooms = selectedDates.map(date => availableRooms[date.toDateString()]);
    const minRooms = Math.min(...selectedRooms);
    const maxRooms = Math.max(...selectedRooms);


    const tileContent = ({ date }) => {
        const price = prices[date.toDateString()];
        const rooms = availableRooms[date.toDateString()];
        return (
            <div>
                {price && <p style={{ marginTop: "5px" }}> {price}</p>}
                {rooms && <p style={{ marginTop: "5px" }}> {rooms}</p>}
            </div>
        );
    };

    const handleEditClick = () => {
        setEditMode(true);
        setNewPrice(minPrice === maxPrice ? minPrice.toString() : `${minPrice}-${maxPrice}`);
        setNewRooms(minRooms === maxRooms ? minRooms.toString() : `${minRooms}-${maxRooms}`);
    };

    const handleSaveChanges = () => {
        if (!newPrice || newPrice.trim() === "") {
            alert("Please enter a valid price.");
            return;
        }

        if (!newRooms || newRooms.trim() === "") {
            alert("Please enter a valid Rooms number.");
            return;
        }

        const isRangeFormat1 = /^\d+-\d+$/.test(newPrice);
        const isRangeFormat2 = /^\d+-\d+$/.test(newRooms);

        let updatedPrices = { ...prices };

        if (!isRangeFormat1) {
            selectedDates.forEach(date => {
                updatedPrices[date.toDateString()] = newPrice;
            });
         }
        prices = { ...updatedPrices }


       let updatedRooms= { ...availableRooms }; 
       if (!isRangeFormat2) { 
            selectedDates.forEach(date => {
                updatedRooms[date.toDateString()] = newRooms; 
            });
        }
        availableRooms = { ...updatedRooms }

        setEditMode(false);
    };

    const getTodayResults = () => {
        const today = new Date();
        const todayDateString = today.toDateString();
        const todayPrice = prices[todayDateString];
        const todayRooms = availableRooms[todayDateString];
        return { todayDateString, todayPrice, todayRooms };
    };

    const renderTodayResults = () => {
        const { todayDateString, todayPrice, todayRooms } = getTodayResults();
        return (
            <div>
            <h3 className="text-sm font-semibold mb-2"> {todayDateString} </h3>
                <p>Price: {todayPrice}</p>
                <p>Available Rooms: {todayRooms}</p>
            </div>
        );
    };


    return (
        <div className="flex flex-col h-screen">
            <Manager_NavBar />
            <div className="flex flex-1 mt-[100px]">
                <div className="w-1/2 p-4 border-r border-gray-200">
                    <h2 className="text-lg font-semibold mb-4">Calendar</h2>
                    <Calendar
                        onChange={handleDateChange}
                        value={highlightDates}
                        selectRange={true}
                        minDate={today}
                        maxDate={nextThreeMonths}
                        tileContent={tileContent} // Custom tile content
                    />
                </div>
                <div className="w-1/2 p-4">
                    <h2 className="text-lg font-semibold mb-4">Prices and Available Rooms</h2>
                    {highlightDates.length === 0 && renderTodayResults()}

                    {highlightDates.length === 2 && (
                        <p className="mb-2">
                            {highlightDates[0].toDateString()} - {highlightDates[1].toDateString()}
                        </p>
                    )}   
                    
                    {    
                    editMode ? (
                        <div>
                            <p>Price: </p>
                            <input
                                type="text"
                                placeholder="Enter new price"
                                value={newPrice}
                                onChange={(e) => setNewPrice(e.target.value)}
                            />
                            <p>Available Rooms: </p>
                            <input
                                type="text"
                                placeholder="Enter new available rooms"
                                value={newRooms}
                                onChange={(e) => setNewRooms(e.target.value)}
                            />
                            <button className="ml-2 px-3 py-1 bg-blue-500 text-white rounded" onClick={handleSaveChanges}>
                                Save Changes
                            </button>
                        </div>
                        ) : (
                            highlightDates.length === 2 && (    
                        <div>
                            {minPrice !== maxPrice && (
                                <p className="mb-2">
                                    Price Range: {minPrice} - {maxPrice}
                                </p>
                            )}
                            {minPrice === maxPrice && (
                                <p className="mb-2">
                                    Price: {minPrice}
                                </p>
                            )}
                            {minRooms !== maxRooms && (
                                <p className="mb-2">
                                    Available Rooms: {minRooms} - {maxRooms}
                                </p>
                            )}
                            {minRooms === maxRooms && (
                                <p className="mb-2">
                                    Rooms: {minRooms}
                                </p>
                            )}
                            <button className="px-3 py-1 bg-blue-500 text-white rounded" onClick={handleEditClick}>
                                Edit
                            </button>
                        </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}

export default Manager_calendar;


