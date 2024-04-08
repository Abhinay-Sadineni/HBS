const { where } = require("sequelize");
const Hotel = require("../models/Hotel")


class HotelService {
     

    //check policy 
    static async check_policy(hotel_id , start_date){
          try {
            current = new Date();
            const policy = await Hotel.findByPk(hotel_id)
            if( start_date - policy > current ){
                return true;
            }
            return false;
          }
          catch(error){
            console.error('Error checking policy:', error);
            return {success: false, message: "Server error"};
          }
    }

    //get hotel info
    static async get_hotel_info(hotel_id){
        try {

        }
        catch(error){
            console.error('Error get hotel info :', error);
            return {success: false, message: "Server error"};
        }
    }






}

module.exports = HotelService;
