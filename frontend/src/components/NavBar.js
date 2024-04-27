import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/HBSLogo.jpeg';
import SearchBar from './SearchBar';
import axiosInstance from '../helpers/axios'


import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Spinner
} from "@material-tailwind/react";

import { FaUser, FaSignOutAlt, FaQuestionCircle } from 'react-icons/fa';
import { FiAlignJustify } from "react-icons/fi";

function NavBar({loginPopup, setLoginPopup, signUpPopup, setSignUpPopup}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setIsLoggedIn(false); 
          setLoading(false);
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
      }
    };
  
    checkToken();
  }, []);


  const handleSignout =  () => {
    try {
      setLoading(true);
      localStorage.removeItem('token');
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
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
  )
}

export default NavBar;
