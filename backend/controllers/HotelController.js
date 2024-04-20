const express = require('express');
const HotelService = require('../services/HotelService');

const router = express.Router();


router.get('/search', async(req , res) =>{
    try{

         const { location ,  no_of_rooms , no_of_guests ,  start_date, end_date} = req.body

        const start_Date = new Date(start_date);
        const end_Date = new Date(end_date);
        const diff_ms = end_Date.getTime() - start_Date.getTime();
        const diff = diff_ms / (1000 * 3600 * 24) + 1;
        
        //  const List = await HotelService.Search(location, no_of_rooms, no_of_guests, start_date, end_date);
         const aList = await HotelService.calculate_available_rooms(location, no_of_guests, start_date, end_date)
         const bList = await HotelService.get_booked_rooms(location, no_of_guests, start_date, end_date)
         

         const hotelList = aList.map(room => {
            const bookedRoom = bList.find(booked => booked.hotel_id === room.hotel_id && booked.date === room.date);
            const availableRoomsAfterBooking = room.no_of_avail_rooms - (bookedRoom ? bookedRoom.no_of_booked_rooms : 0);
            return {
                ...room,
                no_of_avail_rooms: availableRoomsAfterBooking
            };
        }).filter(room => room.no_of_avail_rooms > no_of_rooms);
        
        const groupedHotelList = hotelList.reduce((acc, room) => {
            if (acc[room.hotel_id]) {
                acc[room.hotel_id].count++;
            } else {
                acc[room.hotel_id] = {
                    hotel_id: room.hotel_id,
                    Hotel_name: room.Hotel_name,
                    Location: room.Location,
                    list_of_amenities: room.list_of_amenities,
                    count: 1
                };
            }
            return acc;
        }, {});
        
        const groupedHotelArray = Object.values(groupedHotelList).filter(hotel => hotel.count === diff);
        

        res.json({hotelList: groupedHotelArray} );

    }

    catch(error){
        console.error('Error in search :', error);
        res.status(500).json({success: false, message: "Server error"});
    }

} )


module.exports = router; 



