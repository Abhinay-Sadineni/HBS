const express = require('express');
const HotelService = require('../services/HotelService');

const H_controller = express.Router();


router.get('/search', async(req , res) =>{
    try{

         const { location , no_of_guests , no_of_rooms , duration} = req.body
        
         const List = await HotelService.search_hotels(location,no_of_rooms,no_of_rooms,duration);

         res.json({SearchList : List});

    }

    catch(error){
        console.error('Error in search :', error);
        res.status(500).json({success: false, message: "Server error"});
    }

} )


model.exports = H_controller; 



