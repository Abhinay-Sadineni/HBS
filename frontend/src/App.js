import Login from './pages/Login';
import Home from './pages/Guest_home';
import Signup from './pages/Signup';
import Dashboard from './pages/Guest_Dashboard';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Dashboard from './components/Dashboard';


function App() {

  return (
    <Router>
      <div>
      
      {/* {token && <Navbar1/>} */}

        <Routes>
         <Route exact path="/" element={< Home />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/signup" element={<Signup />}></Route>
          <Route exact path = "/dashboard" element = {<Dashboard/>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
