const faker = require('faker');
const bcrypt = require('bcrypt');
const { User, Hotel, Reservation, RoomType, FAQ, Calendar } = require('./models');

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randomLocation() {
  const locations = ['Hyderabad', 'Bangalore', 'Chennai', 'Delhi', 'Mumbai', 'Vizag'];
  return locations[Math.floor(Math.random() * locations.length)];
}

function getRandomFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

async function getRandomUserIdForGuest() {
  const users = await User.findAll({ 
    attributes: ['user_id'], 
    where: { usertype: 'guest' } 
  });
  const userIds = users.map(user => user.user_id);
  return getRandomFromArray(userIds);
}

async function getRandomUserIdForManager() {
  const users = await User.findAll({ 
    attributes: ['user_id'], 
    where: { usertype: 'HM' } 
  });
  const userIds = users.map(user => user.user_id);
  return getRandomFromArray(userIds);
}

async function getRandomHotelId() {
  const hotels = await Hotel.findAll({ attributes: ['hotel_id'] });
  const hotelIds = hotels.map(hotel => hotel.hotel_id);
  return getRandomFromArray(hotelIds);
}

async function generateHashedPassword(password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

async function generateUsers() {
  const users = [];
  for (let i = 0; i < 50; i++) {
    const userType = i < 10 ? 'HM' : 'guest';
    const user = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: await generateHashedPassword(faker.internet.password()),
      phone_number: faker.phone.phoneNumber().replace(/\D/g, ''),
      country_code: Math.floor(Math.random() * 999) + 1,
      usertype: userType
    };
    users.push(user);
  }
  await User.bulkCreate(users);
}

async function generateHotels() {
  const hotels = [];
  for (let i = 0; i < 5; i++) {
    const managerUserId = await getRandomUserIdForManager();
    const hotel = {
      manager_id: managerUserId,
      Hotel_name: faker.company.companyName(),
      Location: randomLocation(),
      register_date: faker.date.past(),
      Description: faker.lorem.paragraph(),
      Address: faker.address.streetAddress(),
      latitude: faker.address.latitude(),
      longitude: faker.address.longitude(),
      list_of_amenities: faker.random.words(),
      cancellation_policy: faker.lorem.paragraph(),
      check_in: faker.random.arrayElement(['12:00 PM', '2:00 PM', '3:00 PM']),
      check_out: faker.random.arrayElement(['10:00 AM', '11:00 AM', '12:00 PM'])
    };
    hotels.push(hotel);
  }
  await Hotel.bulkCreate(hotels);
}

async function generateRoomTypes() {
  const roomTypes = [];
  const hotels = await Hotel.findAll();
  for (let hotel of hotels) {
    for (let i = 0; i < 3; i++) {
      const roomType = {
        room_type_name: faker.lorem.word(),
        no_of_rooms: Math.floor(Math.random() * 10) + 1,
        list_of_amenties: faker.random.words(),
        max_guests: Math.floor(Math.random() * 4) + 1,
        hotel_id: hotel.hotel_id
      };
      roomTypes.push(roomType);
    }
  }
  await RoomType.bulkCreate(roomTypes);
}

async function generateReservations() {
  const reservations = [];
  const currentDate = new Date();
  const reservationEndDate = new Date();
  reservationEndDate.setDate(currentDate.getDate() + 30);

  const hotels = await Hotel.findAll();
  for (let hotel of hotels) {
    const roomTypes = await RoomType.findAll({ where: { hotel_id: hotel.hotel_id } });
    for (let roomType of roomTypes) {
      const availableRooms = roomType.no_of_rooms;
      for (let i = 0; i < 5; i++) {
        const bookedDate = faker.date.between(currentDate, reservationEndDate);
        const startDate = faker.date.between(bookedDate, reservationEndDate);
        const endDate = faker.date.between(startDate, reservationEndDate);

        const numRooms = Math.floor(Math.random() * availableRooms) + 1;

        let rating = null;
        let review = null;
        
        if (Math.random() < 0.5) {
          rating = Math.floor(Math.random() * 5) + 1;
        }
        
        if (Math.random() < 0.5) {
          review = faker.lorem.paragraph();
        }

        const reservation = {
          booked_date: bookedDate,
          start_date: startDate,
          end_date: endDate,
          Review: review,
          Rating: rating,
          user_id: await getRandomUserIdForGuest(),
          hotel_id: hotel.hotel_id,
          room_type_id: roomType.room_type_id,
          No_of_rooms: numRooms,
          payment: faker.random.number(),
          status: faker.random.arrayElement(['cancelled', 'accepted', 'rejected', 'pending'])
        };
        reservations.push(reservation);
      }
    }
  }
  await Reservation.bulkCreate(reservations);
}



async function generateFAQs() {
  const faqs = [];
  const hotels = await Hotel.findAll();
  for (let hotel of hotels) {
    for (let i = 0; i < 5; i++) {
      const faq = {
        Q: faker.lorem.sentence(),
        A: faker.lorem.paragraph(),
        hotel_id: hotel.hotel_id
      };
      faqs.push(faq);
    }
  }
  await FAQ.bulkCreate(faqs);
}

async function generateCalendars() {
  const calendars = [];
  const currentDate = new Date();
  const endDate = new Date(currentDate);
  endDate.setDate(endDate.getDate() + 30);

  const hotels = await Hotel.findAll();
  for (let hotel of hotels) {
    const roomTypes = await RoomType.findAll({ where: { hotel_id: hotel.hotel_id } });
    for (let roomType of roomTypes) {
      let currentDateIterator = new Date(currentDate);
      while (currentDateIterator <= endDate) {
        const date = new Date(currentDateIterator);
        const reservations = await Reservation.findAll({
          where: {
            hotel_id: hotel.hotel_id,
            room_type_id: roomType.room_type_id,
          }
        });

        let totalRoomsBooked = 0;
        for (let reservation of reservations) {
          if (
            reservation.start_date <= date &&
            reservation.end_date >= date
          ) {
            totalRoomsBooked += reservation.No_of_rooms;
          }
        }

        const availableRooms = roomType.no_of_rooms - totalRoomsBooked;
        const calendar = {
          room_type_id: roomType.room_type_id,
          date: date,
          price: faker.random.number({ min: 500, max: 5000 }),
          no_of_avail_rooms: Math.floor(Math.random() * availableRooms) + 1
        };
        calendars.push(calendar);
        currentDateIterator.setDate(currentDateIterator.getDate() + 1);
      }
    }
  }
  await Calendar.bulkCreate(calendars);
}



async function populateDatabase() {
  try {
    await generateUsers();
    await generateHotels();
    await generateRoomTypes();
    await generateReservations();
    await generateFAQs();
    await generateCalendars();
    console.log('Database populated successfully.');
  } catch (error) {
    console.error('Error populating database:', error);
  }
}

populateDatabase();