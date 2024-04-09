import Login from './components/Login';
import Home from './components/Home';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
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
