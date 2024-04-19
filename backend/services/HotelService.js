const { Hotel, RoomType, Calendar, Reservation } = require("../models");
const Sequelize = require('sequelize');
const sequelize = require('../config.js');

class HotelService {
  static async BookedRooms(location, no_of_rooms, no_of_guests, startDate, endDate){
    try {
      const start_Date = new Date(startDate);
      const end_Date = new Date(endDate);
      const diff_ms = end_Date.getTime() - start_Date.getTime();
      const diff = diff_ms / (1000 * 3600 * 24)+1;

      const bookedRooms = await sequelize.query(
        `WITH date_range AS (
            SELECT generate_series(:startDate::date, :endDate::date, INTERVAL '1 DAY') AS date
        ),
        booked_rooms AS(
            SELECT
                dr.date,
                r."hotel_id",
                SUM(r."No_of_rooms") as no_of_booked_rooms
            FROM
                date_range dr
            JOIN
            (
                SELECT 
                    res."hotel_id",
                    res."room_type_id",
                    res."No_of_rooms",
                    res."start_date",
                    res."end_date"
                FROM 
                    (SELECT * FROM "Reservation" where "Reservation"."status" <> 'cancelled' AND "Reservation"."status" <> 'rejected') res
                JOIN
                    "RoomType" rt ON res."room_type_id" = rt."room_type_id"
                JOIN 
                    "Hotel" h ON res."hotel_id" = h."hotel_id"
                WHERE 
                    h."Location" = :location AND rt."max_guests" >= :no_of_guests
            ) AS r ON dr.date BETWEEN r."start_date" AND r."end_date"
            GROUP BY
                dr.date,
                r."hotel_id"
            ORDER BY
                dr.date, r."hotel_id"
          ),
        available_rooms AS(
          SELECT
            "Hotel"."hotel_id",
            "Hotel_name",
            "Location",
            "list_of_amenities",
            "date",
            SUM("no_of_avail_rooms") as no_of_avail_rooms
          FROM
            "Hotel"
            JOIN "RoomType" ON "Hotel"."hotel_id" = "RoomType"."hotel_id"
            LEFT JOIN "Calendar" ON "RoomType"."room_type_id" = "Calendar"."room_type_id"
              AND ("Calendar"."date" BETWEEN :startDate AND :endDate)
            WHERE
                "Location" = :location
                AND "max_guests" >= :no_of_guests
          GROUP BY
            "Hotel"."hotel_id",
            "date"),
        Hotel_list AS(
            SELECT
            av."hotel_id",
            av."Hotel_name",
            av."Location",
            av."list_of_amenities",
            COUNT(*) as date_count
        FROM
            available_rooms av
        LEFT JOIN
            booked_rooms br ON av."hotel_id" = br."hotel_id" AND av."date" = br."date"
        WHERE
            av."no_of_avail_rooms" - COALESCE(br."no_of_booked_rooms", 0) > :no_of_rooms                   
        GROUP BY
            av."hotel_id",
            av."Hotel_name",
            av."Location",
            av."list_of_amenities"    
        )
        
        SELECT
        hl."hotel_id",
        hl."Hotel_name",
        hl."Location",
        hl."list_of_amenities"
        FROM
            Hotel_list hl
        WHERE
            date_count > :diff

        `,
        {
            replacements: {
                location: location,
                startDate: startDate,
                endDate: endDate,
                no_of_guests: no_of_guests,
                no_of_rooms: no_of_rooms,
                diff: diff
            },
            type: Sequelize.QueryTypes.SELECT
        }
    );  
      
      return bookedRooms;
    }
    catch (error) {
      console.error('Error searching hotels by location:', error);
      throw error;
    }
  }
}

module.exports = HotelService;
