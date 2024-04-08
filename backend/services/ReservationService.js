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

    //get all reservations
    static async get_all_reservations_user(user_id){
        try{
            const RVS = await RV.findAll({
                where:{
                    user_id: user_id
                }
            })
            return RVS;
        }
        catch(error) {
            console.error('Error get  all reservation:', error);
            return false;
        }
    }

    //get booked rooms
    static async get_all_reservations_hotel(hotel_id){
        try{
            const RVS = await RV.findAll({
                where:{
                    hotel_id : hotel_id
                }
            })
            return RVS;
        }
        catch(error) {
            console.error('Error get  all reservation:', error);
            return false;
        }
    }
     
    //get reservation details 
    static async get_reservation(rid){
               try{
                   const RV = await RV.findByPk(rid)
                   return RV;
               }
               catch(error) {
                console.error('Error get reservation:', error);
                return false;
            }
    }

    //cancel reservation
    static async cancel_reservation(rid){
        try {
            const reservation = await RV.findByPk(rid);
            if (!reservation) {
                console.error('Reservation not found.');
                return false; 
            }

            // Update the status to 'cancelled'
            await reservation.update({ status: 'cancelled' });
            return true; 

            
            }  

            catch (error) {
            console.error('Error cancelling reservation:', error);
            return false; 
        }
    }

    


    
}

module.exports = ReservationService;
