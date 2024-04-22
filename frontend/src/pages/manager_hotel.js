import React, { useState } from 'react';
import hotelsList from '../components/hotels';
import reviewList from '../components/reviews';
import StarRoundedIcon from '@mui/icons-material/StarRounded';

const rating = [1000, 1000, 1000, 1000, 1000];

function ReviewCard(props) {
  const stars = [];
  for (let i = 0; i < props.rating; i++) {
    stars.push(<StarRoundedIcon key={i} />);
  }

  return (
    <div className="flex flex-col border border-gray-400 p-4 ">
      <h2 className="text-l font-bold">{props.name}</h2>
      <div className='text-sm text-yellow-500'>
        {stars}
      </div>
      <p>{props.review}</p>
    </div>
  );
}

function Hotelpage() {

  const [showPopup, setShowPopup] = useState(false);
  const [imagePopup, setImagePopup] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [hotelName, setHotelName] = useState("Hotel Name");
  const [hostedBy, setHostedBy] = useState("Hosted by Manager");
  const [description, setDescription] = useState("It is an architectural villa on the south side of Koh Samui, private and in a natural environment, it has sweeping ocean views and has a great salt water lap pool. Half way up a hill, it gets natural breezes, whithout mozzies even at dusk. It is minimally designed, but takes maximum advantage of the nature. It is called the naked house because the walls are left naked. We primarily cater to families and couples.");
  const [amenities, setAmenities] = useState(["Mountain view", "Ocean view", "Kitchen", "Wifi", "Dedicated work space"]);
  const [photos, setPhotos] = useState([...hotelsList[0].imgURL]);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const toggleImagePopup = (index) => {
    setImagePopup(!imagePopup);
    setCurrentImageIndex(index);
  };

  const showNextImage = () => {
    const nextIndex = (currentImageIndex + 1) % photos.length;
    setCurrentImageIndex(nextIndex);
  };

  const showPreviousImage = () => {
    const previousIndex = (currentImageIndex - 1 + photos.length) % photos.length;
    setCurrentImageIndex(previousIndex);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleFieldChange = (field, value) => {
    switch (field) {
      case 'hotelName':
        setHotelName(value);
        break;
      case 'hostedBy':
        setHostedBy(value);
        break;
      case 'description':
        setDescription(value);
        break;
      case 'amenities':
        setAmenities(value);
        break;
      default:
        break;
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPhotos([...photos, reader.result]);
    };
  };

  const deletePhoto = (index) => {
    const updatedPhotos = [...photos];
    updatedPhotos.splice(index, 1);
    setPhotos(updatedPhotos);
    if (currentImageIndex === index && index !== 0) {
      setCurrentImageIndex(index - 1);
    }
  };

  return (
    <div className="h-screen">
      <div className='fixed border top-[78px] overflow-scroll no-scrollbar max-h-[720px] flex flex-col md:flex-row items-start  justify-between ml-10 mr-10'>
        <div className="md:w-1/2 md:mr-5">
          <div className="flex justify-between">
            <h1 className="text-xl font-bold mt-8">
              {editMode ? <input type="text" value={hotelName} onChange={(e) => handleFieldChange('hotelName', e.target.value)} /> : hotelName}
            </h1>
            <button onClick={toggleEditMode} className="btn btn-primary border border-gray-400 rounded-md px-4 py-2">{editMode ? 'Save' : 'Edit'}</button>
          </div>
          <h2 className="text-lg font-semibold">
            {editMode ? <input type="text" value={hostedBy} onChange={(e) => handleFieldChange('hostedBy', e.target.value)} /> : hostedBy}
          </h2>
          {editMode ?
            <textarea className='mb3' style={{ height: "auto", minHeight: "150px", width: "auto", minWidth: "800px" }} value={description} onChange={(e) => handleFieldChange('description', e.target.value)} />
            :
            <p className="text-m" >{description}</p>
          }

          <div className="border-t border-b border-gray-400 py-4 mt-4 ">
            <h1 className="text-xl font-bold">What this place offers</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {amenities.map((amenity, index) => (
                <p key={index}>
                  {editMode ? <input type="text" value={amenity} onChange={(e) => {
                    const updatedAmenities = [...amenities];
                    updatedAmenities[index] = e.target.value;
                    handleFieldChange('amenities', updatedAmenities);
                  }} /> : amenity}
                </p>
              ))}
            </div>
          </div>
          <div className="border-b border-gray-400 py-4 mb-4">
            {/* RatingBar component */}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviewList.slice(0, 4).map((review, index) => (
              <ReviewCard
                key={index}
                name={review.name}
                rating={review.rating}
                review={review.review}
              />
            ))}
          </div>
          <button onClick={togglePopup} className="btn btn-primary my-4 border border-gray-400 rounded-md px-4 py-2">Show All Reviews</button>
          {showPopup && (
            <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-8 rounded-lg overflow-y-auto max-h-full relative">
                <button onClick={togglePopup} className="absolute top-0 right-0 p-2 text-black-900 hover:text-gray-900">
                  &#x2715;
                </button>
                <h1 className="text-xl font-bold mb-4">All Reviews</h1>
                <div className="grid grid-cols-1 gap-4">
                  {reviewList.map((review, index) => (
                    <ReviewCard
                      key={index}
                      name={review.name}
                      rating={review.rating}
                      review={review.review}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        <div className="md:w-1/2 mt-8 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="relative">
              <img src={photos[currentImageIndex]} onClick={() => toggleImagePopup(currentImageIndex)} className="w-full h-48 md:h-96" alt="Main Image" />
              {editMode &&
                    <button onClick={() => deletePhoto(currentImageIndex)} className="absolute top-1 right-1 p-2 text-neutral-50 text-neutral-100" style={{ fontSize: '24px' }}>
                      &#x2715;
                    </button>
              }
              {imagePopup && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
                  <div className="bg-white p-8 rounded-lg overflow-y-auto max-h-full relative">
                    <button onClick={() => toggleImagePopup(currentImageIndex)} className="absolute top-0 right-0 p-2 text-gray-600 hover:text-gray-800" >
                      &#x2715;
                    </button>
                    <button onClick={showPreviousImage} className="absolute top-1/2 left-0 transform -translate-y-1/2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-l-md">
                      &lt;
                    </button>
                    <button onClick={showNextImage} className="absolute top-1/2 right-0 transform -translate-y-1/2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-r-md">
                      &gt;
                    </button>
                    <img src={photos[currentImageIndex]} alt="Popup Image" />
                  </div>
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {photos.map((photo, index) => (
                <div key={index} className="relative">
                  <img src={photo} onClick={() => toggleImagePopup(index)} className="w-full h-24 md:h-48" alt={`Image ${index + 1}`} />
                  {editMode &&
                    <button onClick={() => deletePhoto(index)} className="absolute top-1 right-1 p-2 text-neutral-50 hover:text-neutral-100">
                      &#x2715;
                    </button>
                  }
                </div>
              ))}
              {editMode &&
                <div className="relative">
                  <label htmlFor="upload-photo" className="block cursor-pointer border border-gray-300 p-4 text-center">
                    Upload Photo
                    <input type="file" id="upload-photo" className="hidden" onChange={handlePhotoUpload} />
                  </label>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hotelpage;
