const express = require("express");
const ReservationService = require("../services/ReservationService");
const auth = require("../middlewares/auth");
const sequelize = require('../config.js');

const router = express.Router();

router.post("/reserve", auth, async (req, res) => {
  try {
    transaction = await sequelize.transaction();

    const user_id = req.user_id;
    let { hotel_id, no_of_guests, start_date, end_date, room_types } =
      req.body;

    room_types = room_types.filter(room => parseInt(room.count) > 0);
    console.log('roomtypes: ',room_types)


    const VacantRooms = await ReservationService.validate_reservation(
      hotel_id,
      no_of_guests,
      start_date,
      end_date
    );
    
    const errors = [];
    let totalPrice = {};
    for (const roomType of room_types) {
        const { room_type_id, count } = roomType;
        const vacantRoom = VacantRooms.VacantRooms.find(room => room.room_type_id === parseInt(room_type_id) );
        console.log('vacentRoom', vacantRoom ,roomType)
        if (!vacantRoom) {
            errors.push(`Room type ${room_type_id} is not available.`);
        } else if (parseInt(count) > parseInt(vacantRoom.min_vacant_rooms)) {
            console.log(parseInt(count), parseInt(vacantRoom.min_vacant_rooms))
            errors.push(`Count of room type ${room_type_id} exceeds available rooms (${vacantRoom.min_vacant_rooms}).`);
        } else {
            totalPrice[vacantRoom.room_type_id] = {
                room_type_name: vacantRoom.room_type_name,
                total_price: parseInt(count) * parseInt(vacantRoom.total_room_price)
              };
        }
    }
    
    if(errors.length > 0) {
        await transaction.rollback();
        res.status(400).json({error: errors})
    }
    else {
        const Reservation = await ReservationService.reserve(
            user_id,
            hotel_id,
            room_types,
            start_date,
            end_date,
            totalPrice
          );
          await transaction.commit();
          res.json({ totalPrice , message: "Reservation created successfully", gid: Reservation});
    }
   

  } catch (error) {
    console.error("Error creating reservations:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/confirm", auth, async (req, res) => {
    try {
      const { gid, status } = req.body;
      const Confirm = await ReservationService.confirm_reservation(gid, status ,req.user_id);  
      res.json({message: Confirm});
    }
    catch (error) {
      res.status(500).json({ error: "Internal server error" });
      console.error("Error confirm reservations:", error);
    }
  });

module.exports = router;
