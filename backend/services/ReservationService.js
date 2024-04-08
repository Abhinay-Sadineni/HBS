const Sequelize = require('sequelize');
const Reservation = require('../models/Reservation'); // Import Reservation model
const ReservedRoom = require('../models/ReservedRoom'); // Import ReservedRoom model

class ReservationService {
    // Validate reservation
    static async validateReservation(hotel_id, room_id, start_date, end_date) {
        try {
            const conflict = await ReservedRoom.findAll({
                where: {
                    room_id: room_id,
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

            return conflict.length === 0;
        } catch (error) {
            console.error('Error validating reservation:', error);
            return false;
        }
    }

    // Reserve function
    static async reserve(user_id, hotel_id, room_id, start_date, end_date) {
        try {
            // Create reservation
            const reservation = await Reservation.create({
                user_id: user_id,
                hotel_id: hotel_id,
                start_date: start_date,
                end_date: end_date
            });

            // Create reserved room
            await ReservedRoom.create({
                rid: reservation.rid,
                room_id: room_id
            });

            return true; // Reservation successful
        } catch (error) {
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
