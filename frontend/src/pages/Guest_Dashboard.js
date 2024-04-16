// Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import SearchBar from '../components/SearchBar';
import Card from '../components/List_card';
import hotelsList from '../components/hotels';




function Dashboard() {
  return (
    <div className="HI">
      <NavBar /> 
      <SearchBar />
      {hotelsList.map( hotel =>  (
            <Card key = {hotel.id}
            imgURL = {hotel.imgURL}
            name = {hotel.name}
            location  = {hotel.location}
            rating = {hotel.rating}
            price = {hotel.price}/>
            // <Card text = "random" />
          )
        )
      } 
      {/* <Card 
      imgURL = "https://a0.muscache.com/im/pictures/miso/Hosting-617063718566302384/original/717a4c2d-e8a9-4798-8378-0d878e0ed56e.jpeg?im_w=1200"
      location  = "Hyderabad"
      name = "Hotel 1"
      rating = "4.2"
      price = "1500Rs"/> */}
      <Link to="/" className="btn btn-primary">Logout</Link>
    </div>
  );
}

export default Dashboard;
