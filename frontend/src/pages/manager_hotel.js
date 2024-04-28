import React, { useState } from "react";
import HotelForm from "../components/hotelForm";
import ImageForm from "../components/imageForm";
import RoomForm from "../components/roomsForm";

function Manager_hotel() {


    const [currentStep, setCurrentStep] = useState(1);


    const handleNext = (e) => {
        e.preventDefault();
        setCurrentStep(currentStep + 1)
    };

    function handlePrevious() {
        setCurrentStep(currentStep - 1);
    }


    return (
        <div className="flex justify-center items-center">
            {currentStep === 1 && <HotelForm handleNext = {handleNext} />
            }
            {currentStep === 2 && 
                        <ImageForm handleNext={handleNext} handlePrevious={handlePrevious}/>
            } 
            {currentStep === 3 && (
                <RoomForm handlePrevious={handlePrevious}/>
                )}

        </div>
    );
}

export default Manager_hotel;