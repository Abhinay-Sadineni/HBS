const Hotel = require("../models/Hotel")
const RoomType = require("../models/RoomType")
const Calendar = require("../models/Calendar")
const Image = require("../models/Image");
const { Op } = require('sequelize');
/* 
  Class which holds all functions related to hotel Data
*/

class HotelService {

  //search hotels
  static async search_hotels(location, no_of_rooms, no_of_guests, duration) {
    try {
      const Hotel_list = await Hotel.findAll({
        where: {
          Location: location
        },
        include: [
          {
            model: RoomType,
            where: {
              max_guests: {
                [Op.gte]: no_of_guests
              }
            },
            required: true
          }
        ]
      });

      

      return Hotel_list; 


    }
    catch (error) {
      console.error('Error searching hotels by location :', error);
    }
  }

}

module.exports = HotelService;
