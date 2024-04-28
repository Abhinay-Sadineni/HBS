import React, { useState, useEffect } from 'react';
import { Link ,useLocation ,useNavigate} from 'react-router-dom';
import logo from '../assets/images/HBSLogo.jpeg';
import SearchBar from './SearchBar';
import axiosInstance from '../helpers/axios'
import Login from '../pages/Login';
import Signup from '../pages/Signup';


import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";

import { FaUser, FaQuestionCircle } from 'react-icons/fa';
import { FiAlignJustify } from "react-icons/fi";

function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loginPopup, setLoginPopup] = useState(false);
  const [signUpPopup, setSignUpPopup] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();


  const checkToken = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsLoggedIn(false); 
        setLoading(false);
        console.log(loading)
        return;
      }
      
      const response = await axiosInstance.post('/login');
      if (response.status === 200) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Error checking token:', error);
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    checkToken();
  },[]);


  const handleSignout =  () => {
    try {
      setLoading(true);
      localStorage.removeItem('token');
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      const pathsToRedirect = ['/history', '/profile'];
      if (pathsToRedirect.includes(location.pathname)) {
        navigate('/');
      }
      setTimeout(() => {
        setLoading(false);
      }, 2000); 
    }
  }
  

  const handleLogin = () => {
    setLoginPopup(true);
  }

  const handleSignUp = () => {
    setSignUpPopup(true);
  }


  return (
    <div>
    <nav className='fixed z-1000 top-0 left-0 shadow-[rgba(0,0,15,0.5)_2px_2px_2px_0px] w-full bg-white bg-opacity-99'>
      <div className='flex flex-row items-center justify-between'>
        <img src={logo} className='rounded-full px-2 py-2' style={{ height: '75px', width: '75px' }} alt="HBS Logo" />
        <SearchBar />
        <div className='mx-4'>
          <Menu>
            <MenuHandler>
              <button className='flex px-4 py-4 items-center'>
                <FiAlignJustify className='mx-2' /> Menu
              </button>
            </MenuHandler>
            <MenuList className='w-max'>
              {console.log(isLoggedIn)}
              {isLoggedIn ? (
                <>
                  <MenuItem>
                    <Link to="/profile" className="flex items-center px-4 py-4" >
                      <FaUser className='mr-2' /> Profile
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to="/history" className="flex items-center px-4 py-4" >
                      <FaUser className='mr-2' /> History
                    </Link>
                  </MenuItem>
                  <MenuItem >
                    {/* <FaSignOutAlt className='mr-2' onClick={handleSignout}/> Sign Out */}
                    <button className='mr-2 flex px-4 py-4 items-center' onClick={handleSignout} > Sign Out</button>
                  </MenuItem>                  
                </>
              ) : (
                <>
                  <MenuItem>
                    {/* <Link to="/login" className="flex items-center px-4 py-4" > */}
                      {/* <FaUser className='mr-2' />  */}
                      <button className='mr-2 flex px-4 py-4 items-center' onClick={() => handleLogin()} > Login</button>
                    {/* </Link> */}
                  </MenuItem>
                  <MenuItem>
                    {/* <Link to="/signup" className="flex items-center px-4 py-4" > */}
                      {/* <FaUser className='mr-2' /> Signup */}
                    {/* </Link> */}
                    <button className='mr-2 flex px-4 py-4 items-center' onClick={() => handleSignUp()} > Sign Up</button>
                  </MenuItem>
                </>
              )}
              <MenuItem className='flex px-4 py-4 items-center '>
                <FaQuestionCircle className='mr-2' /> Help Center
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
    </nav>


    {loginPopup && (
  <div className="fixed z-50 top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
    <div className='bg-white p-8 rounded-lg w-2/5 relative'>
      <button onClick={() => setLoginPopup(false)} className="absolute top-0 right-0 p-2 text-gray-600 hover:text-gray-800"> &#x2715; </button>
      <Login loginPopup = {loginPopup}
              setLoginPopup = {setLoginPopup}
              // loading = {loading}
              // setLoading = {setLoading}
              isLoggedIn = {isLoggedIn}
              setIsLoggedIn = {setIsLoggedIn}
      
      />
    </div>
  </div>
)}

{signUpPopup && (
  <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
    <div className='bg-white p-8 rounded-lg w-2/5 h-4/5 relative flex justify-center items-center'>
      <button onClick={() => setSignUpPopup(false)} className="absolute top-0 right-0 p-2 text-gray-600 hover:text-gray-800"> &#x2715; </button>
      <Signup 
        signUpPopup = {signUpPopup}
        setSignUpPopup = {setSignUpPopup}
      />
    </div>
  </div>
)}
    </div>
  )
}

export default NavBar;
