import Login from './pages/Login';
import Home from './pages/Guest_home';
import Signup from './pages/Signup';
import Dashboard from './pages/Guest_Dashboard';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HotelList from './pages/Hotel_list';
import History from './pages/Guest_History';
import Hotelpage from './pages/Hotelpage';
import BillPage from './pages/Bill';



// function Fr(){
//   return(<h1>HI</h1>);
// }


function App() {

  return (
    <Router>
      <div>
      
      {/* {token && <Navbar1/>} */}

        <Routes>
         <Route exact path="/" element={< Home />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/signup" element={<Signup />}></Route>
          <Route exact path = "/guest-dashboard" element = {<Dashboard/>}></Route>
          <Route exact path = "/list" element = {<HotelList/>}></Route>
          <Route exact path = "/guest-dashboard/history" element = {<History/>}></Route>
          <Route exact path = "/hotel-page" element = {<Hotelpage />}></Route>
          <Route exact path = "/bill" element = {<BillPage />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
