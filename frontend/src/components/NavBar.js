import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/HBSLogo.jpeg';
import SearchBar from './SearchBar';

import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";

import { FaUser, FaSignOutAlt, FaQuestionCircle } from 'react-icons/fa';
import { FiAlignJustify } from "react-icons/fi";


function NavBar() {
  // const [dropdownVisible, setDropdownVisible] = useState(false);
  // const dropdownRef = useRef(null);

  // const toggleDropdown = () => {
  //   setDropdownVisible(!dropdownVisible);
  // };

  // const handleClickOutside = (event) => {
  //   if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //     setDropdownVisible(false);
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, []);

  // return (
  //   <div className="flex justify-between items-center bg-gray-800 text-white p-4">
  //     <div className="flex items-center">
  //       <img src= {logo} alt="Logo" className="h-10 w-10 mr-2" />
  //       <h1 className="text-2xl">HBS</h1>
  //     </div>
  //     <div className="flex space-x-4">
  //       {/* <a href="#home" className="hover:text-gray-300">Home</a> */}
  //       <Link to="/guest-dashboard" className="hover:text-gray-300">Home</Link>

  //       <Link to="/guest-dashboard/history" className="hover:text-gray-300">History</Link>

  //       {/* <a href="#history" className="hover:text-gray-300">History</a> */}
  //     </div>
  //     <div className="relative">
  //       <button onClick={toggleDropdown} className="focus:outline-none">
  //         Login/Signup
  //       </button>
  //       {dropdownVisible && (
  //         <div ref={dropdownRef} className="absolute top-full right-0 bg-gray-800 text-white mt-1 p-2 rounded shadow-lg">
  //           <Link to="/login" className="block hover:bg-gray-700 py-2 px-4">Login</Link>
  //           {/* <a href="#signup" className="block hover:bg-gray-700 py-2 px-4">Signup</a> */}
  //           <Link to="/signup" className="block hover:bg-gray-700 py-2 px-4">SignUp</Link>
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // );
  return(
  <nav className='fixed top-0 left-0 shadow-[rgba(0,0,15,0.5)_2px_2px_2px_0px] w-full bg-white-800 opacity-100'>
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
                <MenuItem >
                <Link to="/profile" className="flex items-center px-4 py-4" >
                  <FaUser className='mr-2' /> Profile
                </Link>
                </MenuItem>
                <MenuItem className='flex px-4 py-4 items-center'>
                  <FaSignOutAlt className='mr-2' /> Sign Out
                </MenuItem>
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
