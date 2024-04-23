const { Hotel, RoomType, Calendar, Reservation, GroupRoom } = require("../models");
const Sequelize = require('sequelize');
const sequelize = require('../config.js');

class ReservationService {
    static async validate_reservation(hotel_id, no_of_guests, startDate, endDate) {
        try {
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
                        r."room_type_name",
                        SUM(r."No_of_rooms") as no_of_booked_rooms
                    FROM
                        date_range dr
                    JOIN
                    (
                        SELECT 
                            res."hotel_id",
                            res."room_type_id",
                            rt."room_type_name",
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
                        r."room_type_id",
                        r."room_type_name"
                ),
                available_rooms AS (
                    SELECT
                        "Hotel"."hotel_id",
                        "RoomType"."room_type_id",
                        "RoomType"."room_type_name",
                        "Calendar"."date",
                        "no_of_avail_rooms",
                        "price"
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
                        "RoomType"."room_type_name",
                        "no_of_avail_rooms",
                        "price"
                )
                SELECT
                    ar."hotel_id",
                    ar."room_type_id",
                    ar."room_type_name",
                    MIN(ar."no_of_avail_rooms" - COALESCE(br."no_of_booked_rooms", 0)) AS min_vacant_rooms,
                    SUM(ar."price") as total_room_price
                FROM
                    available_rooms ar
                LEFT JOIN
                    booked_rooms br ON ar."date" = br."date" AND ar."hotel_id" = br."hotel_id" AND ar."room_type_id" = br."room_type_id"
                GROUP BY
                    ar."hotel_id",
                    ar."room_type_id",
                    ar."room_type_name";   
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
            return {
                VacantRooms: VacantRooms
            };
        } catch (error) {
            throw new Error(error.message);
        }
    }
    static async reserve(user_id, hotel_id, room_types, start_date, end_date, totalPrice) {
        try {
            const groupRoom = await GroupRoom.create({
                user_id: user_id,
                hotel_id: hotel_id
              });
          
            const gid = groupRoom.gid;
            for (const roomType of room_types) {
                const { room_type_id, count } = roomType;
                await Reservation.create({
                  booked_date: new Date(),
                  start_date: start_date,
                  end_date: end_date,
                  gid: gid,
                  hotel_id: hotel_id,
                  room_type_id: room_type_id,
                  No_of_rooms: count,
                  payment: totalPrice[room_type_id].total_price,
                  status: 'temporary'
                });
              }
          
            return{ gid };
        } catch (error) {
            throw new Error(error.message);
        }
    }
    static async confirm_reservation(gid, status) {
        try {
            let message;
            if (status === 'cancelled') {
                await Reservation.destroy({ where: { gid: gid } });
                message = "Reservation cancelled successfully";
            }
            else if (status === 'confirmed') {
                await Reservation.update(
                    { status: 'pending' },
                    { where: { gid: gid } }
                );
                message = "Reservations confirmed successfully";
            }
            else {
                throw new Error("Invalid status provided");
            }
            return { message };
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = ReservationService;
