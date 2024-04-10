const Sequelize = require('sequelize');
const Reservation = require('../models/Reservation'); // Import Reservation model
const ReservedRoom = require('../models/ReservedRoom'); // Import ReservedRoom model
const Room = require("../models/Room")

class ReservationService {
    // Validate reservation
    static async validateReservation(hotel_id, no_of_rooms ,start_date, end_date) {
        try {
            // Find all rooms associated with the hotel
            const allRooms = await Room.findAll({
                where: { hotel_id: hotel_id },
                attributes: ['room_id'] // Select only the room_id column
            });
    
            // Filter out the rooms that have conflicts during the specified time period
            const availableRooms = await Promise.all(allRooms.map(async room => {
                const conflict = await ReservedRoom.findAll({
                    where: {
                        room_id: room.room_id,
                        [Sequelize.Op.or]: [
                            { start_date: { [Sequelize.Op.between]: [start_date, end_date] } },
                            { end_date: { [Sequelize.Op.between]: [start_date, end_date] } },
                            {
                                [Sequelize.Op.and]: [
                                    { start_date: { [Sequelize.Op.lte]: start_date } },
                                    { end_date: { [Sequelize.Op.gte]: end_date } }
                                ]
                            }
                        ]
                    }
                });
                return conflict.length === 0 ? room.room_id : null; // Return room_id if available, null otherwise
            }));
    
            // Filter out null values (unavailable rooms) and return only the available room IDs
            const availableRoomIds = availableRooms.filter(roomId => roomId !== null);

            if (no_of_rooms > availableRoomIds.length) {
                // If the requested number of rooms exceeds the available number,
                console.error('Requested number of rooms exceeds availability.');
                return false;
            }
            else{
                return availableRoomIds;
            }
        } catch (error) {
            console.error('Error validating reservation:', error);
            return [];
        }
    }
    
    

    // Reserve function
    static async reserve(user_id, hotel_id, room_ids, start_date, end_date) {
        let transaction;
        try {
            // Start a transaction
            transaction = await sequelize.transaction();
    
            // Step 1: Create the reservation within the transaction
            const reservation = await Reservation.create({
                user_id: user_id,
                hotel_id: hotel_id,
                start_date: start_date,
                end_date: end_date
            }, { transaction });
    
            // Step 2: Associate the reservation with each room within the transaction
            for (const room_id of room_ids) {
                await ReservedRoom.create({
                    rid: reservation.rid,
                    room_id: room_id
                }, { transaction });
            }
    
            // If all operations within the transaction succeed, commit the transaction
            await transaction.commit();
    
            // Return true to indicate that the reservation was successful
            return true;
        } catch (error) {
            // If there's any error during reservation creation or room association, rollback the transaction
            if (transaction) await transaction.rollback();
    
            // Log the error and return false
            console.error('Error creating reservation:', error);
            return false;
        }
    }
    

    // Get all reservations by user
    static async getAllReservationsByUser(user_id) {
        try {
            const reservations = await Reservation.findAll({
                where: { user_id: user_id },
                include: [{ model: ReservedRoom }]
            });
            return reservations;
        } catch (error) {
            console.error('Error getting all reservations by user:', error);
            return false;
        }
    }

    // Get all reservations by hotel
    static async getAllReservationsByHotel(hotel_id) {
        try {
            const reservations = await Reservation.findAll({
                where: { hotel_id: hotel_id },
                include: [{ model: ReservedRoom }]
            });
            return reservations;
        } catch (error) {
            console.error('Error getting all reservations by hotel:', error);
            return false;
        }
    }
     
    // Get reservation details 
    static async getReservation(rid) {
        try {
            const reservation = await Reservation.findByPk(rid, { include: [{ model: ReservedRoom }] });
            return reservation;
        } catch (error) {
            console.error('Error getting reservation details:', error);
            return false;
        }
    }

    // Cancel reservation
    static async cancelReservation(rid) {
        try {
            const reservation = await Reservation.findByPk(rid);
            if (!reservation) {
                console.error('Reservation not found.');
                return false;
            }

            // Update the status to 'cancelled'
            await reservation.update({ status: 'cancelled' });
            return true; 
        } catch (error) {
            console.error('Error cancelling reservation:', error);
            return false; 
        }
    }
}

module.exports = ReservationService;
