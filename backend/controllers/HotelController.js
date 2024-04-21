const express = require('express');
const HotelService = require('../services/HotelService');

const router = express.Router();


router.get('/search', async(req , res) =>{
    try{
        console.log( req.query)
        const { location ,  no_of_rooms , no_of_guests ,  start_date, end_date} = req.query

        const start_Date = new Date(start_date); 
        const end_Date = new Date(end_date);
        const diff_ms = end_Date.getTime() - start_Date.getTime();
        const diff = diff_ms / (1000 * 3600 * 24) + 1;
        
        const aList = await HotelService.calculate_available_rooms(location, no_of_guests, start_date, end_date)
        const bList = await HotelService.get_booked_rooms(location, no_of_guests, start_date, end_date)
        const popList = await HotelService.get_pop_hotels(location)

        console.log(popList)
        

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
        
        const groupedHotelListWithRes = groupedHotelArray.map(hotel => {
            const reservations = popList.find(item => item.hotel_id === hotel.hotel_id);
            return {
                ...hotel,
                reservations: reservations ? reservations.count : 0
            };
        });
        
        console.log(groupedHotelListWithRes);

        res.json({hotelList: groupedHotelListWithRes} );

    }

    catch(error){
        console.error('Error in search :', error);
        res.status(500).json({success: false, message: "Server error"});
    }

} )

router.get('/hotel/:hotel_id', async(req , res) =>{
    try{
        const hotel_id = req.params.hotel_id;        
        const Hotel = await HotelService.get_hotel_info(hotel_id)
        const VacantRoomsandRR = await HotelService.get_vacant_rooms_and_rr(hotel_id)
        res.json({HotelInfo: Hotel, VacantRoomsandRR: VacantRoomsandRR} );  
    }

    catch(error){
        console.error('Error in Hotel selection :', error);
        res.status(500).json({success: false, message: "Server error"});
    }

} )


module.exports = router; 



