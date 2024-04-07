const express = require('express');
const ReservationService = require('../services/ReservationService');

const RV_controller = express.Router();

router.post('/reserve', async (req, res) => {
    const { user_id, hotel_id, room_ids, start_date, end_date } = req.body;
    
    try {
        // Iterate through each room ID and attempt to create a reservation
        for (const room_id of room_ids) {
            const isReservationValid = await ReservationService.validateReservation(hotel_id, room_id, start_date, end_date);
            if (!isReservationValid) {
                console.error(`Reservation not valid for room ID: ${room_id}`);
                break;
            }
            
            const isReservationSuccessful = await ReservationService.reserve(user_id, hotel_id, room_id, start_date, end_date);
            if (!isReservationSuccessful) {
                console.error(`Failed to create reservation for room ID: ${room_id}`);
                break;
            }
        }
        res.status(201).json({ message: 'Reservations created successfully' });
        
    } catch (error) {
        console.error('Error creating reservations:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



