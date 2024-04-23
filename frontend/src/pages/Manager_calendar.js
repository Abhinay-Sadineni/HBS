import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Manager_NavBar from "../components/Manager_navbar";

function Manager_calendar() {
    const [selectedDates, setSelectedDates] = useState([]);
    const [prices, setPrices] = useState({});

    // Initialize all prices to 1000 for all days
    const initializePrices = (dates) => {
        const initialPrices = {};
        dates.forEach(date => {
            initialPrices[date.toDateString()] = 1000;
        });
        return initialPrices;
    };

    // Handle date selection
    const handleDateChange = (date) => {
        if (Array.isArray(date)) {
            setSelectedDates(date);
            setPrices(initializePrices(date));
        } else {
            const dateIndex = selectedDates.findIndex((selectedDate) => selectedDate.getTime() === date.getTime());
            if (dateIndex === -1) {
                setSelectedDates([...selectedDates, date]);
                setPrices({ ...prices, [date.toDateString()]: 1000 });
            } else {
                const updatedSelectedDates = [...selectedDates];
                updatedSelectedDates.splice(dateIndex, 1);
                setSelectedDates(updatedSelectedDates);
                const updatedPrices = { ...prices };
                delete updatedPrices[date.toDateString()];
                setPrices(updatedPrices);
            }
        }
    };

    // Handle price change
    const handlePriceChange = (event, date) => {
        const updatedPrices = { ...prices, [date]: parseInt(event.target.value) || 0 };
        setPrices(updatedPrices);
    };

    // Handle saving changes
    const handleSaveChanges = () => {
        // Logic to save changes
        console.log("Prices:", prices);
    };

    return (
        <div>
            <Manager_NavBar />
            <div className="mt-[100px] flex justify-center items-center">
                <div className="grid grid-cols-2 gap-8 w-full max-w-4xl p-8 bg-white rounded-lg shadow-md">
                    <div>
                        <h1 className="text-2xl font-bold mb-4">Calendar</h1>
                        <div>
                            <Calendar
                                onChange={handleDateChange}
                                selectRange
                                value={selectedDates}
                                minDate={new Date()}
                                maxDate={new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)} 
                            />
                        </div>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold mb-4">Selected Dates</h1>
                        <div>
                            {selectedDates.map((date, index) => (
                                <div key={index} className="mb-2">
                                    <p>{date.toDateString()}</p>
                                    <input
                                        type="number"
                                        value={prices[date.toDateString()]}
                                        onChange={(event) => handlePriceChange(event, date.toDateString())}
                                    />
                                </div>
                            ))}
                        </div>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSaveChanges}>
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Manager_calendar;
