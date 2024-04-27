// import React, {useState, useEffect} from 'react';
// import { Link } from 'react-router-dom';
// import NavBar from '../components/NavBar';
// import SearchBar from '../components/SearchBar';
// import ReservationCard from '../components/Reservation_card';
// // import reservationList from '../components/Reservations';

// // className="fixed top-0 w-full z-10"

// var initialReservationList = [
//   [
//     {
//       "rid": 58,
//       "booked_date": "2024-04-23",
//       "start_date": "2024-05-09",
//       "end_date": "2024-05-12",
//       "gid": 29,
//       "hotel_id": 1,
//       "room_type_id": 3,
//       "No_of_rooms": 3,
//       "No_of_guests": 3,
//       "payment": 6000,
//       "status": "pending",
//       "createdAt": "2024-04-22T18:43:05.479Z",
//       "updatedAt": "2024-04-22T18:43:05.479Z",
//       "user_id": 52,
//       "Review": null,
//       "Rating": null,
//       "image_id": 1,
//       "image": "hotel2.jpg"
//     },
//     {
//       "rid": 59,
//       "booked_date": "2024-04-23",
//       "start_date": "2024-05-09",
//       "end_date": "2024-05-12",
//       "gid": 29,
//       "hotel_id": 1,
//       "room_type_id": 2,
//       "No_of_rooms": 3,
//       "No_of_guests": 3,
//       "payment": 3000,
//       "status": "pending",
//       "createdAt": "2024-04-22T18:43:05.479Z",
//       "updatedAt": "2024-04-22T18:43:05.479Z",
//       "user_id": 52,
//       "Review": null,
//       "Rating": null,
//       "image_id": 1,
//       "image": "hotel2.jpg"
//     }
//   ],

//   [
//     {
//       "rid": 59,
//       "booked_date": "2024-04-23",
//       "start_date": "2024-05-09",
//       "end_date": "2024-05-12",
//       "gid": 30,
//       "hotel_id": 1,
//       "room_type_id": 3,
//       "No_of_rooms": 3,
//       "No_of_guests": 3,
//       "payment": 6000,
//       "status": "confirmed",
//       "createdAt": "2024-04-22T18:43:05.479Z",
//       "updatedAt": "2024-04-22T18:43:05.479Z",
//       "user_id": 52,
//       "Review": null,
//       "Rating": null,
//       "image_id": 1,
//       "image": "hotel2.jpg"
//     },
//     {
//       "rid": 60,
//       "booked_date": "2024-04-23",
//       "start_date": "2024-05-09",
//       "end_date": "2024-05-12",
//       "gid": 30,
//       "hotel_id": 1,
//       "room_type_id": 2,
//       "No_of_rooms": 3,
//       "No_of_guests": 3,
//       "payment": 3000,
//       "status": "confirmed",
//       "createdAt": "2024-04-22T18:43:05.479Z",
//       "updatedAt": "2024-04-22T18:43:05.479Z",
//       "user_id": 52,
//       "Review": null,
//       "Rating": null,
//       "image_id": 1,
//       "image": "hotel2.jpg"
//     }
//   ],
//   [
//     {
//       "rid": 61,
//       "booked_date": "2024-04-23",
//       "start_date": "2024-05-09",
//       "end_date": "2024-05-12",
//       "gid": 31,
//       "hotel_id": 1,
//       "room_type_id": 3,
//       "No_of_rooms": 3,
//       "No_of_guests": 3,
//       "payment": 6000,
//       "status": "rejected",
//       "createdAt": "2024-04-22T18:43:05.479Z",
//       "updatedAt": "2024-04-22T18:43:05.479Z",
//       "user_id": 52,
//       "Review": null,
//       "Rating": null,
//       "image_id": 1,
//       "image": "hotel2.jpg"
//     },
//     {
//       "rid": 62,
//       "booked_date": "2024-04-23",
//       "start_date": "2024-05-09",
//       "end_date": "2024-05-12",
//       "gid": 31,
//       "hotel_id": 1,
//       "room_type_id": 2,
//       "No_of_rooms": 3,
//       "No_of_guests": 3,
//       "payment": 3000,
//       "status": "rejected",
//       "createdAt": "2024-04-22T18:43:05.479Z",
//       "updatedAt": "2024-04-22T18:43:05.479Z",
//       "user_id": 52,
//       "Review": null,
//       "Rating": null,
//       "image_id": 1,
//       "image": "hotel2.jpg"
//     }
//   ],
//   [
//     {
//       "rid": 63,
//       "booked_date": "2024-04-23",
//       "start_date": "2024-05-09",
//       "end_date": "2024-05-12",
//       "gid": 32,
//       "hotel_id": 1,
//       "room_type_id": 3,
//       "No_of_rooms": 3,
//       "No_of_guests": 3,
//       "payment": 6000,
//       "status": "cancelled",
//       "createdAt": "2024-04-22T18:43:05.479Z",
//       "updatedAt": "2024-04-22T18:43:05.479Z",
//       "user_id": 52,
//       "Review": null,
//       "Rating": null,
//       "image_id": 1,
//       "image": "hotel2.jpg"
//     },
//     {
//       "rid": 64,
//       "booked_date": "2024-04-23",
//       "start_date": "2024-05-09",
//       "end_date": "2024-05-12",
//       "gid": 32,
//       "hotel_id": 1,
//       "room_type_id": 2,
//       "No_of_rooms": 3,
//       "No_of_guests": 3,
//       "payment": 3000,
//       "status": "cancelled",
//       "createdAt": "2024-04-22T18:43:05.479Z",
//       "updatedAt": "2024-04-22T18:43:05.479Z",
//       "user_id": 52,
//       "Review": null,
//       "Rating": null,
//       "image_id": 1,
//       "image": "hotel2.jpg"
//     }
//   ],
//   [
//     {
//       "rid": 65,
//       "booked_date": "2024-04-23",
//       "start_date": "2024-05-09",
//       "end_date": "2024-05-12",
//       "gid": 33,
//       "hotel_id": 1,
//       "room_type_id": 3,
//       "No_of_rooms": 3,
//       "No_of_guests": 3,
//       "payment": 6000,
//       "status": "completed",
//       "createdAt": "2024-04-22T18:43:05.479Z",
//       "updatedAt": "2024-04-22T18:43:05.479Z",
//       "user_id": 52,
//       "Review": null,
//       "Rating": null,
//       "image_id": 1,
//       "image": "hotel2.jpg"
//     },
//     {
//       "rid": 66,
//       "booked_date": "2024-04-23",
//       "start_date": "2024-05-09",
//       "end_date": "2024-05-12",
//       "gid": 33,
//       "hotel_id": 1,
//       "room_type_id": 2,
//       "No_of_rooms": 3,
//       "No_of_guests": 3,
//       "payment": 3000,
//       "status": "completed",
//       "createdAt": "2024-04-22T18:43:05.479Z",
//       "updatedAt": "2024-04-22T18:43:05.479Z",
//       "user_id": 52,
//       "Review": null,
//       "Rating": null,
//       "image_id": 1,
//       "image": "hotel2.jpg"
//     }
//   ]
// ];


// function History() {

//   const [reservationList, setReservationList] = useState(initialReservationList)

//   initialReservationList = [...reservationList]


//   return (
//     <div>
//         <div className="fixed top-0 w-full z-10 mb-20">
//             <NavBar   />
//         </div>
//         <div className="m-10"> <p>h</p></div>
//         <div className="mt-10"> 
//                 {reservationList.map(reservation => (
//                     // <div className="mt-20">
//                      <ReservationCard
//                         key = {reservation[0].gid}
//                         name={reservation.name}
//                         checkin={reservation[0].start_date}
//                         checkout={reservation[0].end_date}
//                         noGuest={reservation[0].No_of_guests}
//                         noRoom={reservation[0].No_of_rooms}
//                         rid={reservation[0].gid}
//                         status = {reservation[0].status}
//                         setReservationList = {setReservationList}
//                         reservationList = {reservationList}
//                     />
//                     // </div>
                    
//                 ))}
//         </div>    
//         {/* {console.log(initialReservationList)} */}
        
//     </div>
//   );
// }

// export default History;

import React from 'react';

function ReservationCard(props) {
    const handleCancelBooking = () => {
      props.setReservationList(prevList => {
        return prevList.map(group => {
          return group.map(reservation => {
            if (reservation.gid === props.rid) {
              return { ...reservation, status: "cancelled" };
            }
            return reservation;
          });
        });
      });
    };
  
    return (
        <div className="w-3/5 bg-white rounded-lg shadow-lg p-8 mx-auto mt-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <img src="https://via.placeholder.com/150" alt="Placeholder" className="w-32 h-32 object-cover rounded-lg mr-8" />
                    <div>
                        <h1 className="text-2xl font-bold">{props.name}</h1>
                        <p className="text-gray-500">{props.checkin} - {props.checkout}.</p>
                        <p className="text-gray-500">{props.noGuest} Guest, {props.noRoom} Room </p>
                    </div>
                </div>
                <div>
                    <h2 className="text-lg font-semibold">{props.rid}</h2>
                </div>
                <div className='flex flex-col items-center'>
                    {props.status === 'pending' || props.status === 'confirmed' ? (
                        <button onClick={() => handleCancelBooking()} className="bg-red-500 text-white px-4 py-2 rounded mt-4">Cancel Booking</button>
                    ) : (
                        <button className="bg-gray-400 text-gray-800 px-4 py-2 rounded mt-4" disabled>Cancel Booking</button>
                    )}
                    <p className="text-black-500">{props.status} </p>
                </div>
            </div>
        </div>
    );
  }

export default ReservationCard;

