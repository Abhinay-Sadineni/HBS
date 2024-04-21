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
  return(
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
