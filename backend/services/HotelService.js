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
          location: location
        },
        include: [
          {
            model: Image
          },
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

      // Filter hotels where requested no_of_rooms is less than or equal to no_of_avail_rooms using calendar
      const filteredHotels = await Promise.all(Hotel_list.map(async hotel => {
        const availability = await Promise.all(Array.from({ length: duration.days() }).map(async (_, index) => {
          const currentDate = duration.startOf('day').add(index, 'days').toDate();
          const roomAvailability = await RoomType.findOne({
            where: {
              hotel_id: hotel.hotel_id,
              no_of_rooms: {
                [Op.gte]: no_of_rooms
              }
            },
            include: [
              {
                model: Calendar,
                where: {
                  date: currentDate,
                  no_of_avail_rooms: {
                    [Op.gte]: no_of_rooms // Ensure available rooms are enough
                  }
                },
                required: true
              }
            ]
          });
          return roomAvailability ? true : false; // Return true if rooms are available, false otherwise
        }));
        // Check if all dates have enough available rooms
        if (availability.every(avail => avail)) {
          return hotel;
        }
      }));

      return filteredHotels.filter(Boolean); // Remove undefined elements


    }
    catch (error) {
      console.error('Error searching hotels by location :', error);
    }
  }

}

module.exports = HotelService;
