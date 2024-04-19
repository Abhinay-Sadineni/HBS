import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Guest_home';
import Signup from './pages/Signup';
import Dashboard from './pages/Guest_Dashboard';
import HotelList from './pages/Hotel_list';
import History from './pages/Guest_History';
import HotelPage from './pages/Hotelpage';
import BillPage from './pages/Bill';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/guest-dashboard" element={<Dashboard />} />
          <Route exact path="/list" element={<HotelList />} />
          <Route exact path="/guest-dashboard/history" element={<History />} />
          <Route exact path="/hotel/:hotelId" element={<HotelPage />} /> {/* Update the route for HotelPage */}
          <Route exact path="/bill" element={<BillPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
