const express = require('express');
const HotelService = require('../services/HotelService');
const auth = require("../middlewares/auth");

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
                    average_rating: room.average_rating,
                    hotel_image: room.hotel_image,
                    min_price: room.min_price,
                    max_price: room.max_price,
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
        const {no_of_guests, start_date, end_date} = req.query   
        console.log(start_date)
        const Hotel = await HotelService.get_hotel_info(hotel_id)
        const VacantRoomsandRR = await HotelService.get_vacant_rooms_and_rr(hotel_id, no_of_guests, start_date, end_date)
        res.json({HotelInfo: Hotel, VacantRoomsandRR: VacantRoomsandRR} );  
    }

    catch(error){
        console.error('Error in Hotel selection :', error);
        res.status(500).json({success: false, message: "Server error"});
    }

} )


router.post("/add_hotel", auth, async (req, res) => {
    try {
      const manager_id = req.user_id
      const {Hotel_name, Location, register_date, Description, Address, latitude, longitude, list_of_amenities, cancellation_policy, check_in, check_out} = req.body
      const Hotel = await HotelService.add_hotel(manager_id, Hotel_name, Location, register_date, Description, Address, latitude, longitude, list_of_amenities, cancellation_policy, check_in, check_out);  
      res.json({message: "Hotel added successfully", Hotel: Hotel})
    }
    catch (error){
      console.error("Error in adding hotel:", error);
      res.status(500).json({ error: "Internal server error" });
    }
});

router.post("/update_hotel", auth, async (req, res) => {
    try {
      const manager_id = req.user_id
      const {Hotel_name, Location, register_date, Description, Address, latitude, longitude, list_of_amenities, cancellation_policy, check_in, check_out} = req.body
      const Hotel = await HotelService.edit_hotel(manager_id, Hotel_name, Location, register_date, Description, Address, latitude, longitude, list_of_amenities, cancellation_policy, check_in, check_out);  
      res.json({message: "Hotel details updated successfully", Hotel: Hotel})
    }
    catch (error){
      console.error("Error in editing hotel:", error);
      res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router; 



