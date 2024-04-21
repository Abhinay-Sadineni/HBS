import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/HBSLogo.jpeg';


function NavBar() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex justify-between items-center bg-gray-800 text-white p-4">
      <div className="flex items-center">
        <img src= {logo} alt="Logo" className="h-10 w-10 mr-2" />
        <h1 className="text-2xl">HBS</h1>
      </div>
      <div className="flex space-x-4">
        {/* <a href="#home" className="hover:text-gray-300">Home</a> */}
        <Link to="/guest-dashboard" className="hover:text-gray-300">Home</Link>

        <Link to="/guest-dashboard/history" className="hover:text-gray-300">History</Link>

        {/* <a href="#history" className="hover:text-gray-300">History</a> */}
      </div>
      <div className="relative">
        <button onClick={toggleDropdown} className="focus:outline-none">
          Login/Signup
        </button>
        {dropdownVisible && (
          <div ref={dropdownRef} className="absolute top-full right-0 bg-gray-800 text-white mt-1 p-2 rounded shadow-lg">
            <Link to="/login" className="block hover:bg-gray-700 py-2 px-4">Login</Link>
            {/* <a href="#signup" className="block hover:bg-gray-700 py-2 px-4">Signup</a> */}
            <Link to="/signup" className="block hover:bg-gray-700 py-2 px-4">SignUp</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar;
