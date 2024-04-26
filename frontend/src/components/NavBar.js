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
} from "@material-tailwind/react";

import { FaUser, FaSignOutAlt, FaQuestionCircle } from 'react-icons/fa';
import { FiAlignJustify } from "react-icons/fi";

function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setIsLoggedIn(false); // No token found, user is not logged in
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
  

  if (loading) {
    return <div>Loading...</div>; // Render a loading indicator while waiting for the response
  }

  return (
    <nav className='fixed z-1000 top-0 left-0 shadow-[rgba(0,0,15,0.5)_2px_2px_2px_0px] w-full bg-white-800 opacity-100'>
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
                  <MenuItem className='flex px-4 py-4 items-center'>
                    <FaSignOutAlt className='mr-2' /> Sign Out
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem>
                    <Link to="/login" className="flex items-center px-4 py-4" >
                      <FaUser className='mr-2' /> Login
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to="/signup" className="flex items-center px-4 py-4" >
                      <FaUser className='mr-2' /> Signup
                    </Link>
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
