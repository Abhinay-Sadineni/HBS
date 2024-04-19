const express = require('express');
const HotelService = require('../services/HotelService');

const router = express.Router();


router.get('/search', async(req , res) =>{
    try{

         const { location ,  no_of_rooms , no_of_guests ,  start_date, end_date} = req.body
        
         const List = await HotelService.BookedRooms(location, no_of_rooms, no_of_guests, start_date, end_date);
         res.json({List : List} );

    }

    catch(error){
        console.error('Error in search :', error);
        res.status(500).json({success: false, message: "Server error"});
    }

} )


module.exports = router; 



