import './NavBar.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import sajilobhoj_icon from '../assets/sajilobhoj_logo.png';
import { FaUserAlt, FaShoppingCart, FaQuestionCircle, FaHandshake } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { BiSolidOffer } from "react-icons/bi";
import { IoMdArrowDropdown } from "react-icons/io";

export default function NavBar() {
  const [isLoggedIn] = useState(true); // later connect with auth
 

  return (
    <nav className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        
        {/* Left Section - Logo + Store Status */}
        <div className="flex items-center space-x-4 relative">
          <Link to="/">
            <img
              src={sajilobhoj_icon}
              alt="SajiloBhoj Logo"
              className="h-12 object-contain cursor-pointer"
            />
          </Link>
        </div>

        {/* Middle Section - Search */}
        <div className="md:flex items-center space-x-8">
          <div className="flex w-120 items-center bg-[rgb(248,248,248)] border border-[rgb(232,232,232)] px-3 py-3 rounded-[12px]">
            <FiSearch className="text-black-500 mr-2" />
            <input
              type="text"
              placeholder="Search for restaurants and food"
              className="bg-transparent outline-none text-[16px] font-[500] w-full"
            />
          </div>
        </div>

        {/* Right Section - Profile + Cart */}
        <div className="flex items-center space-x-6">
          
          <Link to="/partner-with-us" className="flex items-center space-x-1 text-gray-700 hover:text-orange-600">
            <FaHandshake />
            <span>Partner with us</span>
          </Link>
          <Link to="/offers" className="flex items-center space-x-1 text-gray-700 hover:text-orange-600">
            <BiSolidOffer />
            <span>Offers</span>
          </Link>

          <Link to="/help" className="flex items-center space-x-1 text-gray-700 hover:text-orange-600">
            <FaQuestionCircle />
            <span>Help</span>
          </Link>

          {isLoggedIn ? (
            <Link to="/profile" className="flex items-center space-x-2 cursor-pointer hover:text-orange-600">
              <FaUserAlt />
              <span className="md:inline">Profile</span>
            </Link>
          ) : (
            <Link to="/login" className="text-sm font-medium text-orange-600 hover:underline">
              Login
            </Link>
          )}

          <Link to="/cart" className='cursor-pointer hover:text-orange-600 flex items-center space-x-2'>
            <div className="relative">
              <FaShoppingCart size={18} />
              <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs px-1 rounded-full">
                0
              </span>
            </div>
            <span>Cart</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
