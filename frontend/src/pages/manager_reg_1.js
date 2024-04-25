import React, { useState } from "react";
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function Manager_reg_1() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        location: '',
        address: '',
        latitude : '',
        longitude : '',
        amenities: [],
        cancellationPolicy: 0,
        checkInTime: '',
        checkOutTime: '',
        images: [],
    });
    const [imagePopup, setImagePopup] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');

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

    const handleSubmit = (e) => {
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

        if (formData.images.length < 5) {
            setErrorMessage('Please upload at least five images');
            return;
        }

        // Perform form submission
        // Add your submission logic here
        console.log(formData)
    };

    const am = [
        "Wifi", "TV", "Kitchen", "Washing Machine", "Air Conditioning",
        "Dedicated work space", "Free Parking on Premises", "Pool", "Piano",
        "Smoke alarm", "Fire Extingusher", "Carbon Monoxide Alarm", "First Aid Kit"
    ];

    return (
        <div className="flex justify-center items-center">
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
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Manager_reg_1;