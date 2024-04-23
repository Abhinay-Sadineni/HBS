const { Hotel, RoomType, Calendar, Reservation } = require("../models");
const Sequelize = require('sequelize');
const sequelize = require('../config.js');

class HotelService {
  static async get_booked_rooms(location, no_of_guests, startDate, endDate) {
        try {
            const bookedRooms = await sequelize.query( 
                `
                WITH date_range AS (
                    SELECT generate_series(:startDate::date, :endDate::date, INTERVAL '1 DAY') AS date
                )
                SELECT
                    to_char(dr.date, 'YYYY-MM-DD') AS date,
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
            `,
                {
                    replacements: {
                        location: location,
                        startDate: startDate,
                        endDate: endDate,
                        no_of_guests: no_of_guests
                    },
                    type: Sequelize.QueryTypes.SELECT
                }
            );

            return bookedRooms;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async calculate_available_rooms(location, no_of_guests, startDate, endDate) {
        try {
            const availableRooms = await sequelize.query(
                `          
                SELECT
                    "Hotel"."hotel_id",
                    "Hotel_name",
                    "Location",
                    "list_of_amenities",
                    "date",
                    "average_rating",
                    SUM("no_of_avail_rooms") as no_of_avail_rooms,
                    "Image"."image" as hotel_image,
                    MIN("price") as min_price,
                    MAX("price") as max_price
                FROM
                    "Hotel"
                JOIN 
                    "hotel_average_rating_mv" ON "hotel_average_rating_mv"."hotel_id" = "Hotel"."hotel_id"
                JOIN
                    "RoomType" ON "Hotel"."hotel_id" = "RoomType"."hotel_id"
                LEFT JOIN 
                    "Calendar" ON "RoomType"."room_type_id" = "Calendar"."room_type_id"
                        AND ("Calendar"."date" BETWEEN :startDate AND :endDate)
                LEFT JOIN 
                    (SELECT DISTINCT ON ("hotel_id") "hotel_id", "image"
                    FROM "Image"
                    ORDER BY "hotel_id", RANDOM()) as "Image" ON "Hotel"."hotel_id" = "Image"."hotel_id"
                WHERE
                    "Location" = :location
                    AND "max_guests" >= :no_of_guests
                GROUP BY
                    "Hotel"."hotel_id",
                    "date",
                    "hotel_average_rating_mv"."average_rating",
                    "Image"."image";
                `,
                {
                    replacements: {
                        location: location,
                        startDate: startDate,
                        endDate: endDate,
                        no_of_guests: no_of_guests
                    },
                    type: Sequelize.QueryTypes.SELECT
                }
            );

            return availableRooms;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async get_pop_hotels(location) {
        try {
            const Reservs = await sequelize.query(
                `          
                SELECT
                    "Hotel"."hotel_id",
                    COUNT(*)
                    FROM
                    "Hotel"
                    LEFT JOIN "Reservation" ON "Reservation"."hotel_id" = "Hotel"."hotel_id"
                    WHERE
                        "Location" = :location
                    GROUP BY
                    "Hotel"."hotel_id"
            `,
                {
                    replacements: {
                        location: location
                    },
                    type: Sequelize.QueryTypes.SELECT
                }
            );

            return Reservs;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async get_hotel_info(hotel_id) {
        try {
            const Hotel = await sequelize.query(
                `
                SELECT * FROM "Hotel" WHERE "hotel_id" = :hotel_id            
                `,
                {
                    replacements: {
                        hotel_id: hotel_id
                    },
                    type: Sequelize.QueryTypes.SELECT
                }
            );
            const RoomTypes = await sequelize.query(
                `
                SELECT "room_type_name","room_type_id", "list_of_amenties", "max_guests" FROM "RoomType" WHERE "hotel_id" = :hotel_id            
                `,
                {
                    replacements: {
                        hotel_id: hotel_id
                    },
                    type: Sequelize.QueryTypes.SELECT
                }
            );

            const Images = await sequelize.query(
                `
                SELECT "image" FROM "Image" WHERE "hotel_id" = :hotel_id            
                `,
                {
                    replacements: {
                        hotel_id: hotel_id
                    },
                    type: Sequelize.QueryTypes.SELECT
                }
            );


            const FAQs = await sequelize.query(
                `
                SELECT "Q","A" FROM "FAQ" WHERE "hotel_id" = :hotel_id            
                `,
                {
                    replacements: {
                        hotel_id: hotel_id
                    },
                    type: Sequelize.QueryTypes.SELECT
                }
            );

            return {
                Hotel: Hotel[0],
                RoomTypes: RoomTypes,
                Images: Images,
                FAQs: FAQs
            };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async get_vacant_rooms_and_rr(hotel_id, no_of_guests, startDate, endDate) {
        try {
            console.log(startDate)
            const VacantRooms = await sequelize.query(
                `          
                WITH date_range AS (
                    SELECT generate_series(:startDate::date, :endDate::date, INTERVAL '1 DAY') AS date
                ),
                booked_rooms AS (
                    SELECT
                        to_char(dr.date, 'YYYY-MM-DD')::date AS date, 
                        r."hotel_id",
                        r."room_type_id",
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
                            (SELECT * FROM "Reservation" WHERE "Reservation"."status" <> 'cancelled' AND "Reservation"."status" <> 'rejected') res
                        JOIN
                            "RoomType" rt ON res."room_type_id" = rt."room_type_id"
                        JOIN 
                            "Hotel" h ON res."hotel_id" = h."hotel_id"
                        WHERE 
                            h."hotel_id" = :hotel_id AND rt."max_guests" >= :no_of_guests
                    ) AS r ON dr.date BETWEEN r."start_date" AND r."end_date"
                    GROUP BY
                        dr.date,
                        r."hotel_id",
                        r."room_type_id"
                ),
                available_rooms AS (
                    SELECT
                        "Hotel"."hotel_id",
                        "RoomType"."room_type_id",
                        "Calendar"."date",
                        "no_of_avail_rooms",
                        MIN("price") as min_price,
                        MAX("price") as max_price
                    FROM
                        "Hotel"
                    JOIN
                        "RoomType" ON "Hotel"."hotel_id" = "RoomType"."hotel_id"
                    LEFT JOIN 
                        "Calendar" ON "RoomType"."room_type_id" = "Calendar"."room_type_id"
                            AND ("Calendar"."date" BETWEEN :startDate::date AND :endDate::date)
                    WHERE
                        "Hotel"."hotel_id" = :hotel_id
                        AND "max_guests" >= :no_of_guests
                    GROUP BY
                        "Hotel"."hotel_id",
                        "date",
                        "RoomType"."room_type_id",
                        "no_of_avail_rooms"
                )
                SELECT
                    ar."hotel_id",
                    ar."room_type_id",
                    MIN(ar."no_of_avail_rooms" - COALESCE(br."no_of_booked_rooms", 0)) AS min_vacant_rooms,
                    MIN(ar.min_price),
                    MAX(ar.max_price)
                FROM
                    available_rooms ar
                LEFT JOIN
                    booked_rooms br ON ar."date" = br."date" AND ar."hotel_id" = br."hotel_id" AND ar."room_type_id" = br."room_type_id"
                GROUP BY
                    ar."hotel_id",
                    ar."room_type_id";   
                `,
                {
                    replacements: {
                        hotel_id: hotel_id,
                        no_of_guests: no_of_guests,
                        startDate: startDate,
                        endDate: endDate
                    },
                    type: Sequelize.QueryTypes.SELECT
                }
            );
            const Ratings = await sequelize.query(
                `
                SELECT 
                    COUNT(CASE WHEN "Rating" = '1' THEN 1 END) AS count_rating_1,
                    COUNT(CASE WHEN "Rating" = '2' THEN 1 END) AS count_rating_2,
                    COUNT(CASE WHEN "Rating" = '3' THEN 1 END) AS count_rating_3,
                    COUNT(CASE WHEN "Rating" = '4' THEN 1 END) AS count_rating_4,
                    COUNT(CASE WHEN "Rating" = '5' THEN 1 END) AS count_rating_5,
                    COUNT(*) AS total_ratings
                FROM "GroupRoom"
                WHERE "hotel_id" = :hotel_id
                AND "Rating" IS NOT NULL
                `,
                {
                    replacements: {
                        hotel_id: hotel_id
                    },
                    type: Sequelize.QueryTypes.SELECT
                }
            );
            const Reviews = await sequelize.query(
                `          
                SELECT "GroupRoom"."Review",
                "GroupRoom"."Rating",
                "User"."username" as name
                FROM "GroupRoom"
                JOIN "User" ON "GroupRoom"."user_id"="User"."user_id"
                WHERE "GroupRoom"."hotel_id" = :hotel_id
                AND "GroupRoom"."Review" IS NOT NULL
                GROUP BY
                "GroupRoom"."Review",
                "GroupRoom"."Rating",
                "User"."username"
                `,
                {
                    replacements: {
                        hotel_id: hotel_id
                    },
                    type: Sequelize.QueryTypes.SELECT
                }
            );

            return {
                VacantRooms: VacantRooms,
                Ratings: Ratings,
                Reviews: Reviews
            };
        } catch (error) {
            throw new Error(error.message);
        }
    }

}

module.exports = HotelService;
