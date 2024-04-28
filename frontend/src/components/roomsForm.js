import React, { useState } from "react";
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function RoomForm({handlePrevious}) {
    const [formData2 ,setFormData2] = useState({
        rooms: [
            { roomType: 'Single Room', amenities: ['TV', 'Air Conditioning'], availableRooms: 10, defaultPrice: 100 },
            { roomType: 'Double Room', amenities: ['TV', 'Kitchen'], availableRooms: 5, defaultPrice: 150 },
        ],
        faqs: []
    })
    const [amPopup, setAmPopup] = useState(false);
    const [currentRoomIndex, setCurrentRoomIndex] = useState(0);
    const [newFAQ, setNewFAQ] = useState({
        question: '',
        answer: '',
    });






    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData2)
    };


    const addRoomType = () => {
        setFormData2({
            ...formData2,
            rooms: [...formData2.rooms, { roomType: '', amenities: [], availableRooms: 0, defaultPrice: 0 }]
        });
    };

    const handleRoomInputChange = (index, e) => {
        const { name, value } = e.target;
        const updatedRooms = [...formData2.rooms];
        updatedRooms[index][name] = value;
        setFormData2({
            ...formData2,
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
        const updatedRooms = [...formData2.rooms];
        const amenity_array = updatedRooms[currentRoomIndex].amenities;

        if (amenity_array.includes(value)) {
            const index = amenity_array.indexOf(value);
            amenity_array.splice(index, 1);
        } else {
            amenity_array.push(value);
        }

        updatedRooms[currentRoomIndex].amenities = amenity_array;
        setFormData2({
            ...formData2,
            rooms: updatedRooms
        });
    };

    const handleDeleteRoom = (index) => {
        const updatedRooms = formData2.rooms.filter((room, i) => i !== index);
        setFormData2({
            ...formData2,
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
        const updatedRooms = [...formData2.rooms];
        updatedRooms[index].editable = false;
        setFormData2({
            ...formData2,
            rooms: updatedRooms
        });
    };

    const setRoomEditable = (index, editable) => {
        const updatedRooms = [...formData2.rooms];
        updatedRooms[index].editable = editable;
        setFormData2({
            ...formData2,
            rooms: updatedRooms
        });
    };



    const saveFAQChanges = (index) => {
        const updatedFAQs = [...formData2.faqs];
        updatedFAQs[index].editable = false; // Set editable to false
        setFormData2({
            ...formData2,
            faqs: updatedFAQs,
        });
    };

    const setFAQEditable = (index, editable) => {
        const updatedFAQs = [...formData2.faqs];
        updatedFAQs[index].editable = editable; // Set editable state
        setFormData2({
            ...formData2,
            faqs: updatedFAQs,
        });
    };

    const handleDeleteFAQ = (index) => {
        const updatedFAQs = [...formData2.faqs];
        updatedFAQs.splice(index, 1); // Remove FAQ at the specified index
        setFormData2({
            ...formData2,
            faqs: updatedFAQs,
        });
    };

    const handleFAQInputChange = (index, e) => {
        const { name, value } = e.target;
        const updatedFAQs = [...formData2.faqs];
        updatedFAQs[index][name] = value; // Update answer of the FAQ at the specified index
        setFormData2({
            ...formData2,
            faqs: updatedFAQs,
        });
    };

    const addNewFAQ = () => {
        if (newFAQ.question && newFAQ.answer) {
            setFormData2({
                ...formData2,
                faqs: [...formData2.faqs, { question: newFAQ.question, answer: newFAQ.answer, editable: false }],
            });
            setNewFAQ({ question: '', answer: '' }); // Reset newFAQ state
        }
    };


    const handleSubmit1 = () => {
        console.log()
    }


    return (
        
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

                        {formData2.rooms.map((room, index) => (
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
                                                    checked={formData2.rooms[currentRoomIndex].amenities.includes(amenity)}
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

                        {formData2.faqs.map((faq, index) => (
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

            );

}

export default RoomForm;
