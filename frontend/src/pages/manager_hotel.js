import React, { useState } from "react";
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function Manager_hotel() {
    const [formData, setFormData] = useState({
      name: 'Example Hotel',
    description: 'This is a dummy hotel for testing purposes.',
    location: 'Test Location',
    address: '123 Test Street',
    latitude: '40.7128',
    longitude: '-74.0060',
    amenities: ['Wifi', 'Pool'],
    cancellationPolicy: 1,
    checkInTime: '1:00',
    checkOutTime: '12:00',
    images: [
    ],
    rooms: [
        { roomType: 'Single Room', amenities: ['TV', 'Air Conditioning'], availableRooms: 10, defaultPrice: 100 },
        { roomType: 'Double Room', amenities: ['TV', 'Kitchen'], availableRooms: 5, defaultPrice: 150 },
    ],
    faqs: []
    });
    const [imagePopup, setImagePopup] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [currentStep, setCurrentStep] = useState(1);
    const [amPopup, setAmPopup] = useState(false);
    const [currentRoomIndex, setCurrentRoomIndex] = useState(0);
    const [newFAQ, setNewFAQ] = useState({
        question: '',
        answer: '',
    });

    const toggleImagePopup = (index) => {
        setImagePopup(!imagePopup);
        setCurrentImageIndex(index);
      };
    
      const showNextImage = () => {
        const nextIndex = (currentImageIndex + 1) % formData.images.length;
        setCurrentImageIndex(nextIndex);
      };
    
      const showPreviousImage = () => {
        const previousIndex = (currentImageIndex - 1 + formData.images.length) % formData.images.length;
        setCurrentImageIndex(previousIndex);
      };



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleAmenitiesChange = (e) => {
        const { value } = e.target;
        const amenities = [...formData.amenities];

        if (amenities.includes(value)) {
            const index = amenities.indexOf(value);
            amenities.splice(index, 1);
        } else {
            amenities.push(value);
        }

        setFormData({
            ...formData,
            amenities
        });
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setFormData({
            ...formData,
            images: files
        });
    };

    const handleNext = (e) => {
        e.preventDefault();
        for (const key in formData) {
            if (formData[key] === '') {
                setErrorMessage(`Please fill in ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
                return;
            }
        }
        if (formData.amenities.length < 2) {
            setErrorMessage('Please select two or more amenities');
            return;
        }

        if (formData.description.length > 500) {
            setErrorMessage('Description must be less than 500 characters');
            return;
        }

        if (formData.images.length < 0) {
            setErrorMessage('Please upload at least five images');
            return;
        }
        setCurrentStep(currentStep + 1)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData)
    };

    function handlePrevious(){
        setCurrentStep(currentStep - 1);
    }

    const addRoomType = () => {
        setFormData({
            ...formData,
            rooms: [...formData.rooms, { roomType: '', amenities: [], availableRooms: 0, defaultPrice: 0 }]
        });
    };

    const handleRoomInputChange = (index, e) => {
        const { name, value } = e.target;
        const updatedRooms = [...formData.rooms];
        updatedRooms[index][name] = value;
        setFormData({
            ...formData,
            rooms: updatedRooms
        });
    };

    const selectAmenities = (index) => {
        setAmPopup(true);
        setCurrentRoomIndex(index);
    };
    
    const closeAmenitiesPopup = () => {
        setAmPopup(false);
    };

    const handleRoomAmenitiesChange = (e) => {
        const { value } = e.target;
        const updatedRooms = [...formData.rooms];
        const amenity_array = updatedRooms[currentRoomIndex].amenities;
    
        if (amenity_array.includes(value)) {
            const index = amenity_array.indexOf(value);
            amenity_array.splice(index, 1);
        } else {
            amenity_array.push(value);
        }
    
        updatedRooms[currentRoomIndex].amenities = amenity_array;
        setFormData({
            ...formData,
            rooms: updatedRooms
        });
    };
    
    const handleDeleteRoom = (index) => {
        const updatedRooms = formData.rooms.filter((room, i) => i !== index);
        setFormData({
            ...formData,
            rooms: updatedRooms
        });
    };

    const am = [
        "Wifi", "TV", "Kitchen", "Washing Machine", "Air Conditioning",
        "Dedicated work space", "Free Parking on Premises", "Pool", "Piano",
        "Smoke alarm", "Fire Extingusher", "Carbon Monoxide Alarm", "First Aid Kit"
    ];

    const rooms_am = [
        "TV", "Kitchen", "Washing Machine", "Air Conditioning",
       "Dedicated work space", "Essentials", "Ceiling Fan", "Fridge", "Micro Wave", 
   ];
   const saveRoomChanges = (index) => {
    const updatedRooms = [...formData.rooms];
    updatedRooms[index].editable = false;
    setFormData({
        ...formData,
        rooms: updatedRooms
    });
};

const setRoomEditable = (index, editable) => {
    const updatedRooms = [...formData.rooms];
    updatedRooms[index].editable = editable;
    setFormData({
        ...formData,
        rooms: updatedRooms
    });
};



const saveFAQChanges = (index) => {
    const updatedFAQs = [...formData.faqs];
    updatedFAQs[index].editable = false; // Set editable to false
    setFormData({
        ...formData,
        faqs: updatedFAQs,
    });
};

const setFAQEditable = (index, editable) => {
    const updatedFAQs = [...formData.faqs];
    updatedFAQs[index].editable = editable; // Set editable state
    setFormData({
        ...formData,
        faqs: updatedFAQs,
    });
};

const handleDeleteFAQ = (index) => {
    const updatedFAQs = [...formData.faqs];
    updatedFAQs.splice(index, 1); // Remove FAQ at the specified index
    setFormData({
        ...formData,
        faqs: updatedFAQs,
    });
};

const handleFAQInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedFAQs = [...formData.faqs];
    updatedFAQs[index][name] = value; // Update answer of the FAQ at the specified index
    setFormData({
        ...formData,
        faqs: updatedFAQs,
    });
};

const addNewFAQ = () => {
    if (newFAQ.question && newFAQ.answer) {
        setFormData({
            ...formData,
            faqs: [...formData.faqs, { question: newFAQ.question, answer: newFAQ.answer, editable: false }],
        });
        setNewFAQ({ question: '', answer: '' }); // Reset newFAQ state
    }
};


    return (
        <div className="flex justify-center items-center">
            {currentStep === 1 && (
            <div className="grid grid-cols-2 gap-8 w-full max-w-4xl p-8 bg-white rounded-lg shadow-md">
                <div>
                    <h1 className="text-2xl font-bold mb-4">Let's Register your hotel</h1>
                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <p>Name:</p>
                            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-4 py-2" />
                        </div>
                        <div>
                            <p>Description:</p>
                            <textarea name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-4 py-2" />
                        </div>
                        <div>
                            <p>Location:</p>
                            <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-4 py-2" />
                        </div>
                        <div>
                            <p>Address:</p>
                            <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-4 py-2" />
                        </div>
                        <div>
                            <p>Latitude:</p>
                            <input type="text" name="latitude" placeholder="Latitude" value={formData.latitude} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-4 py-2" />
                        </div>
                        <div>
                            <p>Longitude:</p>
                            <input type="text" name="longitude" placeholder="Longitude" value={formData.longitude} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-4 py-2" />
                        </div>
                    </form>
                </div>
                <div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <p className="font-semibold">Amenities:</p>
                            <div className="grid grid-cols-2 gap-2">
                            {am.map((amenity, index) => (
                                <label key={index} className="flex items-center">
                                    <input type="checkbox" name={amenity.toLowerCase()} value={amenity} onChange={handleAmenitiesChange} checked={formData.amenities.includes(amenity)} className="mr-2" />
                                    {amenity}
                                </label>
                            ))}
                            </div>
                        </div>
                        <div>
                            <p>Cancellation Policy:</p>
                            <input type="number" name="cancellationPolicy" placeholder="Cancellation Policy" value={formData.cancellationPolicy} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-4 py-2" />
                        </div>
                        <div>
                            <p>Check-in Time:</p>
                            <input type="text" name="checkInTime" placeholder="Check-in Time" value={formData.checkInTime} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-4 py-2" />
                        </div>
                        <div>
                            <p>Check-out Time:</p>
                            <input type="text" name="checkOutTime" placeholder="Check-out Time" value={formData.checkOutTime} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-4 py-2" />
                        </div>
                        <button onClick = {handleNext}className="bg-blue-500 text-white px-4 py-2 rounded-md">Next</button>
                    </form>
                </div>
            </div>

        )}
        {currentStep ===2 &&(
            <div className="grid grid-cols-2 gap-8 w-full max-w-4xl p-8 bg-white rounded-lg shadow-md">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <p>Upload Images:</p>
                            <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="border border-gray-300 rounded-md px-4 py-2" />
                            {/* Display submitted images */}
                            {formData.images.length > 0 && (
                                <div>
                                    <p>Submitted Images:</p>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {formData.images.map((image, index) => (
                                            <img key={index} src={URL.createObjectURL(image)} alt={`Image ${index}`} className="w-20 h-20 object-cover rounded-md" onClick={() => toggleImagePopup(index)} />
                                        ))}
                                    </div>
                                    {imagePopup && (
                                        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
                                            <div className="bg-white p-8 rounded-lg overflow-y-auto max-h-full relative" style={{ width: '80%' }}>
                                                <button onClick={() => setImagePopup(false)} className="absolute top-0 right-0 p-2 text-gray-600 hover:text-gray-800">
                                                    &#x2715;
                                                </button>
                                                <button onClick={showPreviousImage} className="absolute top-1/2 left-0 transform -translate-y-1/2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-l-md">
                                                    &lt;
                                                </button>
                                                <button onClick={showNextImage} className="absolute top-1/2 right-0 transform -translate-y-1/2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-r-md">
                                                    &gt;
                                                </button>
                                                <img src={URL.createObjectURL(formData.images[currentImageIndex])} alt={`Image ${currentImageIndex}`} />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        <button onClick={() => handlePrevious()} className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4">Previous</button>
                        <button onClick = {handleNext}className="bg-blue-500 text-white px-4 py-2 rounded-md">Next</button>
                    </form>
                </div>
        )

        }
        {currentStep === 3 && (
                <div>
                <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4">Let us know about your rooms</h1>
            
                <div className="grid grid-cols-5 gap-4 mb-4">
                    <div>Room Type</div>
                    <div>Amenities</div>
                    <div>Available Rooms</div>
                    <div>Default Price</div>
                    <div></div>
                </div>
            
                {formData.rooms.map((room, index) => (
                    <div key={index} className="grid grid-cols-5 gap-4 mb-4">
                        <input
                            type="text"
                            name="roomType"
                            value={room.roomType}
                            readOnly={!room.editable} 
                            onChange={(e) => handleRoomInputChange(index, e)}
                            className="border border-gray-300 rounded-md px-4 py-2"
                        />
                        <div>
                            <button
                                onClick={() => selectAmenities(index)}
                                className="bg-white-500  border border-gray-500 px-4 py-2 rounded-md"
                                disabled={!room.editable} 
                            >
                                Select Amenities
                            </button>
                        </div>
                        <input
                            type="number"
                            name="availableRooms"
                            value={room.availableRooms}
                            readOnly={!room.editable} 
                            onChange={(e) => handleRoomInputChange(index, e)}
                            className="border border-gray-300 rounded-md px-4 py-2"
                        />
                        <input
                            type="number"
                            name="defaultPrice"
                            value={room.defaultPrice}
                            readOnly={!room.editable} 
                            onChange={(e) => handleRoomInputChange(index, e)}
                            className="border border-gray-300 rounded-md px-4 py-2"
                        />
                        <div className="flex items-center justify-center space-x-2">
                            {room.editable ? ( 
                                <button
                                    onClick={() => saveRoomChanges(index)}
                                    className="bg-green-500 text-white px-4 py-2 rounded-md"
                                >
                                    Save
                                </button>
                            ) : (
                                <button
                                    onClick={() => setRoomEditable(index, true)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                >
                                    Edit
                                </button>
                            )}
                            <button onClick={() => handleDeleteRoom(index)} className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                                <span className="text-xs">-</span>
                            </button>
                        </div>
                    </div>
                ))}
            
                <button onClick={addRoomType} className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4">Add Room Type</button>
                <button onClick={() => handlePrevious()} className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4">Previous</button>
                <button onClick={(e) => handleSubmit(e)} className="bg-blue-500 text-white px-4 py-2 rounded-md">Submit</button>
            
                {amPopup && (
                    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-8 rounded-lg">
                            <h2 className="text-lg font-semibold mb-4">Select Amenities</h2>
                            <div className="grid grid-cols-2 gap-4">
                                {rooms_am.map((amenity, index) => (
                                    <div key={index}>
                                        <input
                                            type="checkbox"
                                            name={`amenity_${index}`}
                                            value={amenity}
                                            className="mr-2"
                                            onChange={handleRoomAmenitiesChange}
                                            checked={formData.rooms[currentRoomIndex].amenities.includes(amenity)}
                                        />
                                        {amenity}
                                    </div>
                                ))}
                            </div>
                            <button onClick={() => closeAmenitiesPopup()} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 ml-4">Close</button>
                        </div>
                    </div>
                )}
            
            </div>
            <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">FAQs</h1>

            {formData.faqs.map((faq, index) => (
                <div key={index} className="mb-4">
                    <div className="pl-6">
                        <span className="font-bold">{index + 1}:</span>
                        {faq.editable ? (
                            <textarea name="question" value={faq.question} onChange={(e) => handleFAQInputChange(index, e)} className="w-full border border-gray-300 rounded-md px-4 py-2" />
                        ) : (
                            <div className="border border-gray-300 rounded-md p-2">
                                <p>{faq.question}</p>
                            </div>
                        )}
                    </div>
                    <div className="pl-6">
                        <span className="font-bold">Ans: </span>
                        {faq.editable ? (
                            <textarea name="answer" value={faq.answer} onChange={(e) => handleFAQInputChange(index, e)} className="w-full border border-gray-300 rounded-md px-4 py-2" />
                        ) : (
                            <div className="border border-gray-300 rounded-md p-2">
                                <p>{faq.answer}</p>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center">
                        {faq.editable ? (
                            <button onClick={() => saveFAQChanges(index)} className="bg-green-500 text-white px-3 py-1 rounded-md mr-2">Save</button>
                        ) : (
                            <button onClick={() => setFAQEditable(index, true)} className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2">Edit</button>
                        )}
                        <button onClick={() => handleDeleteFAQ(index)} className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                            <span className="text-xs">-</span>
                        </button>
                    </div>
                </div>
            ))}

            <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Add New FAQ</h3>
                <input type="text" name="question" value={newFAQ.question} onChange={(e) => setNewFAQ({ ...newFAQ, question: e.target.value })} placeholder="Question" className="w-full border border-gray-300 rounded-md px-4 py-2 mb-2" />
                <textarea name="answer" value={newFAQ.answer} onChange={(e) => setNewFAQ({ ...newFAQ, answer: e.target.value })} placeholder="Answer" className="w-full border border-gray-300 rounded-md px-4 py-2" />
                <button onClick={addNewFAQ} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2">Add FAQ</button>
            </div>
        </div>

            </div>
            
        )}   

        </div>
    );
}

export default Manager_hotel;
