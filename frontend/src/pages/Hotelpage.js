import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import SearchBar from '../components/SearchBar';
import ReserveCard from '../components/ReserveCard';
import RatingBar from '../components/RatingBar';
import StarIcon from '@mui/icons-material/Star';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import axiosInstance from '../helpers/axios';
import { useParams } from 'react-router-dom';


const rating = [1000, 1000, 1000, 1000, 1000];

const hotel = {
  "HotelInfo": {
    "Hotel": {
      "hotel_id": 1,
      "manager_id": 9,
      "Hotel_name": "Ruecker, Yundt and Williamson",
      "Location": "Hyderabad",
      "register_date": "2024-04-18",
      "Description": "Sunt neque expedita. Voluptatum at ea et distinctio harum nam aut. Cum ut ipsa deserunt vitae debitis et. Placeat odit similique et cum distinctio et doloremque.",
      "Address": "1138 Volkman Loaf",
      "latitude": "-52.5463",
      "longitude": "-31.0554",
      "list_of_amenities": "TV, Air conditioning, Hot tub, Indoor fireplace, Beach access, Outdoor shower, First aid kit",
      "cancellation_policy": 72,
      "check_in": "2:00 PM",
      "check_out": "11:00 AM",
      "createdAt": "2024-04-22T18:43:05.012Z",
      "updatedAt": "2024-04-22T18:43:05.012Z"
    },
    "RoomTypes": [
      {
        "room_type_name": "dolores",
        "list_of_amenties": "Wifi, Dedicated workspace, Pool, Outdoor dining area, Lake access, Smoke alarm",
        "max_guests": 2
      },
      {
        "room_type_name": "sunt",
        "list_of_amenties": "Air conditioning, Dedicated workspace, Pool, Hot tub, Firepit, Pool table, Indoor fireplace, Piano, First aid kit",
        "max_guests": 1
      },
      {
        "room_type_name": "vero",
        "list_of_amenties": "Wifi, Free parking on premises, Dedicated workspace, Hot tub, BBQ grill, Lake access, Outdoor shower",
        "max_guests": 4
      }
    ],
    "Images": [
      {
        "image": "hotel2.jpg"
      },
      {
        "image": "hotel4.jpg"
      }
    ],
    "FAQs": [
      {
        "Q": "Totam delectus voluptatibus aliquid ipsum omnis deleniti cumque perspiciatis.",
        "A": "Sit totam quibusdam quo nihil est nihil dolor ipsum. Nisi adipisci officiis vero consequatur ipsa et laboriosam quia. Aut voluptas tenetur. Earum iure magnam dolorem placeat. Assumenda qui omnis quod vero quia ut voluptatem ut."
      },
      {
        "Q": "Voluptas quisquam nihil cumque harum tempora.",
        "A": "Molestias consectetur distinctio est corporis dolore. Aut aspernatur asperiores fugiat hic eaque corrupti sequi et. Unde excepturi voluptates laudantium reiciendis consequuntur enim. Voluptatem eaque ad officia consequuntur dolorem alias dolores est. Voluptas temporibus eaque ipsum libero."
      },
      {
        "Q": "Quis fugit est quos quod optio labore.",
        "A": "Quos dolorum maxime deserunt dolores non veniam atque eum. Molestiae sunt modi quia iure laborum sit omnis. Voluptates assumenda cupiditate. Sed qui vero et sit ducimus sint. Vel consequatur delectus eum atque et inventore quia et. Accusamus autem est occaecati."
      },
      {
        "Q": "Ipsam delectus dolor aut aut nam.",
        "A": "Dolores beatae et. Corrupti aut ipsum quas. Saepe voluptatem alias illum non dolorum. Fugit aut ut repellendus et sed. Dicta aut tenetur omnis. Aut atque laboriosam deleniti qui iusto ipsum sit velit."
      },
      {
        "Q": "Non rerum doloribus et aut minus odio.",
        "A": "Doloribus omnis cupiditate officia. Aut hic aut adipisci maiores amet iure doloremque est. Et voluptate voluptatem cum assumenda. Ut fugit consequatur sit omnis rerum qui autem. Animi at quia voluptatem. Ducimus et autem aut sequi sunt dolorem."
      }
    ]
  },
  "VacantRoomsandRR": {
    "VacantRooms": [
      {
        "hotel_id": 1,
        "room_type_id": 1,
        "min_vacant_rooms": "3",
        "min": "2665.00",
        "max": "2665.00"
      },
      {
        "hotel_id": 1,
        "room_type_id": 3,
        "min_vacant_rooms": "4",
        "min": "828.00",
        "max": "828.00"
      }
    ],
    "Ratings": [
      {
        "count_rating_1": "0",
        "count_rating_2": "0",
        "count_rating_3": "0",
        "count_rating_4": "2",
        "count_rating_5": "1",
        "total_ratings": "3"
      }
    ],
    "Reviews": [
      {
        "name" : 'Epslanor',
        "Review": "Et dolores quo illo ipsam dignissimos dolore praesentium. Aspernatur et fugiat quas. Commodi ipsa excepturi. Ipsum iure sint.",
        "Rating": 4
      },
      {
         "name": 'WWQ',
        "Review": "Similique molestias ex ratione doloremque. Et numquam et quia dignissimos autem nulla qui. Cupiditate aut voluptas.",
        "Rating": 4
      },
      {
        "name": 'Chandler',
        "Review": "Voluptatibus cum explicabo aut quas odit vel. Sunt maxime et beatae quo deleniti qui est tenetur iure. Facere molestiae veritatis consectetur praesentium quas corporis nobis quaerat laboriosam.",
        "Rating": 4
      }
    ]
  }
}

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

  const { hotelId } = useParams();
  // console.log(hotelsList[0].imgURL.length)
  const [showPopup, setShowPopup] = useState(false);
  const [imagePopup, setImagePopup] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const toggleImagePopup = (index) => {
    setImagePopup(!imagePopup);
    setCurrentImageIndex(index);
    console.log(currentImageIndex);
  };

  const showNextImage = () => {
    const nextIndex = (currentImageIndex + 1) % hotel.HotelInfo.Images.length;
    setCurrentImageIndex(nextIndex);
    console.log(currentImageIndex);
  };

  const showPreviousImage = () => {
    const previousIndex = (currentImageIndex - 1 + hotel.HotelInfo.Images.length) % hotel.HotelInfo.Images.length;
    setCurrentImageIndex(previousIndex);
    console.log(currentImageIndex);
  };


  return (
    <div className="h-screen">
      <NavBar />
      <div className='fixed border top-[78px] overflow-scroll no-scrollbar max-h-[720px] flex flex-col md:flex-row items-start  justify-between ml-10 mr-10'>
        <div className="md:w-1/2 md:mr-5">
          <h1 className="text-xl font-bold mt-8">{hotel.HotelInfo.Hotel.Hotel_name}</h1>
          <h2 className="text-lg font-semibold">Hosted by Manager</h2>
          <p className="text-sm">{hotel.HotelInfo.Hotel.Description}</p>

          <div className="border-t border-b border-gray-400 py-4 mt-4 ">
            <h1 className="text-xl font-bold">What this place offers</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <p>Mountain view</p>
              <p>Ocean view</p>
              <p>Kitchen</p>
              <p>Wifi</p>
              <p>Dedicated work space</p>
            </div>
          </div>
          {/* <h1 className="text-xl font-bold" >Ratings and Reviews</h1> */}
          <div className="border-b border-gray-400 py-4 mb-4">
            <RatingBar ratings={rating} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hotel.VacantRoomsandRR.Reviews.slice(0, 4).map((review, index) => (
              <ReviewCard
                key={index}
                name={review.name}
                rating={review.Rating}
                review={review.Review}
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
                  {hotel.VacantRoomsandRR.Reviews.map((review, index) => (
                    <ReviewCard
                      key={index}
                      name={review.name}
                      rating={review.Rating}
                      review={review.Review}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        <div className="md:w-1/2 mt-8 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <img src={`http://localhost:5000/${hotel.HotelInfo.Images[0].image}`} onClick={() => toggleImagePopup(0)} className="w-full h-48 md:h-96" alt="Main Image" />
              {imagePopup && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
                  <div className="bg-white p-8 rounded-lg overflow-y-auto max-h-full relative">
                    <button onClick={() => toggleImagePopup(0)} className="absolute top-0 right-0 p-2 text-gray-600 hover:text-gray-800">
                      &#x2715;
                    </button>
                    <button onClick={showPreviousImage} className="absolute top-1/2 left-0 transform -translate-y-1/2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-l-md">
                      &lt;
                    </button>
                    <button onClick={showNextImage} className="absolute top-1/2 right-0 transform -translate-y-1/2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-r-md">
                      &gt;
                    </button>
                    <img src={`http://localhost:5000/${hotel.HotelInfo.Images[currentImageIndex].image}`} alt="Popup Image" />
                  </div>
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {hotel.HotelInfo.Images.map((image, index) => (
                <img
                  key={index}
                  src={`http://localhost:5000/${image.image}`}
                  onClick={() => toggleImagePopup(index)}
                  className="w-full h-24 md:h-48"
                  alt={`Image ${index + 1}`}
                />
              ))}
            </div>

          </div>
          {!showPopup && !imagePopup && (
            <div className="ml-auto mt-5 md:mt-0">
              <ReserveCard price="10000" rout="/bill" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Hotelpage;
