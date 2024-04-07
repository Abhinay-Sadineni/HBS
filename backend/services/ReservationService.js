const Sequelize = require('sequelize');
const RV = require('../models/Reservation');

class ReservationService {
    // Validate reservation
    static async validateReservation(hotel_id, room_id, start_date, end_date) {
        try {
            const conflict = await RV.findAll({
                where: {
                    hotel_id: hotel_id,
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
            await RV.create({
                user_id: user_id,
                hotel_id: hotel_id,
                room_id: room_id,
                start_date: start_date,
                end_date: end_date
            });

            return true; // Reservation successful
        } catch (error) {
            console.error('Error creating reservation:', error);
            return false;
        }
    }
}

module.exports = ReservationService;
