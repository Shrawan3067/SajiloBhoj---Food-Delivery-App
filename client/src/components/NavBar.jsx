// src/components/NavBar.jsx
import "./NavBar.css";
import React, { useState, useContext, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import sajilobhoj_icon from "../assets/sajilobhoj_logo.png";
import {
  FaUserAlt,
  FaShoppingCart,
  FaQuestionCircle,
  FaHandshake,
  FaHome,
  FaTimes,
} from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { BiSolidOffer } from "react-icons/bi";
import { CartContext } from "../context/CartContext";
import '../index.css';

export default function NavBar() {
  const [isLoggedIn] = useState(true);
  const { cart } = useContext(CartContext);
  const cartCount = cart?.reduce((sum, item) => sum + (item.qty || 0), 0) || 0;

  const location = useLocation();
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setMobileSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Desktop Nav - fixed at top */}
      <nav className="desktop-nav">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center w-full">
          {/* Logo */}
          <Link to="/">
            <img
              src={sajilobhoj_icon}
              alt="SajiloBhoj Logo"
              className="h-12 object-contain cursor-pointer"
            />
          </Link>

          {/* Search */}
          <div className="search-bar flex items-center w-1/2">
            <div className="flex w-full items-center bg-[rgb(248,248,248)] border border-[rgb(232,232,232)] px-3 py-3 rounded-[12px]">
              <FiSearch className="text-black-500 mr-2" />
              <input
                type="text"
                placeholder="Search for restaurants and food"
                className="bg-transparent outline-none text-[16px] font-[500] w-full"
              />
            </div>
          </div>

          {/* Links */}
          <div className="menu-items flex items-center space-x-6">
            <Link
              to="/partner-with-us"
              className={`flex items-center space-x-1 ${
                isActive("/partner-with-us")
                  ? "text-orange-600 font-semibold"
                  : "text-gray-700"
              } hover:text-orange-600`}
            >
              <FaHandshake />
              <span>Partner</span>
            </Link>
            <Link
              to="/offers"
              className={`flex items-center space-x-1 ${
                isActive("/offers")
                  ? "text-orange-600 font-semibold"
                  : "text-gray-700"
              } hover:text-orange-600`}
            >
              <BiSolidOffer />
              <span>Offers</span>
            </Link>
            <Link
              to="/help"
              className={`flex items-center space-x-1 ${
                isActive("/help")
                  ? "text-orange-600 font-semibold"
                  : "text-gray-700"
              } hover:text-orange-600`}
            >
              <FaQuestionCircle />
              <span>Help</span>
            </Link>
            {isLoggedIn ? (
              <Link
                to="/profile"
                className={`flex items-center space-x-2 cursor-pointer ${
                  isActive("/profile")
                    ? "text-orange-600 font-semibold"
                    : "text-gray-700"
                } hover:text-orange-600`}
              >
                <FaUserAlt />
                <span>Profile</span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="text-sm font-medium text-orange-600 hover:underline"
              >
                Login
              </Link>
            )}
            <Link
              to="/cart"
              className={`cursor-pointer flex items-center space-x-2 relative ${
                isActive("/cart")
                  ? "text-orange-600 font-semibold"
                  : "text-gray-700"
              } hover:text-orange-600`}
            >
              <div className="relative">
                <FaShoppingCart size={18} />
                  <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs px-1 rounded-full">
                    {cartCount > 0 ? cartCount : 0}
                  </span>
              </div>
              <span>Cart</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Slide-down Search */}
      {mobileSearchOpen && (
        <div
          ref={searchRef}
          className="fixed top-0 left-0 w-full bg-white z-50 p-4 shadow-md animate-slideDown"
        >
          <div className="flex items-center space-x-2">
            <div className="flex w-full border p-2 rounded outline-none">
              <input
                type="text"
                placeholder="Search for restaurants and food"
                className="w-full outline-none"
              />
              <FiSearch size={20} className="text-gray-700" />
            </div>
            <button onClick={() => setMobileSearchOpen(false)}>
              <FaTimes size={20} className="text-gray-700" />
            </button>
          </div>
        </div>
      )}

      {/* Bottom Mobile Nav */}
      <nav className="mobile-nav fixed bottom-0 left-0 w-full bg-white p-2 flex justify-around items-center md:hidden z-50 border-t border-gray-400">
        <Link
          to="/"
          className={`flex flex-col items-center ${
            isActive("/") ? "text-orange-600" : "text-gray-700"
          } hover:text-orange-600`}
        >
          <FaHome size={20} />
          <span className="text-xs">Home</span>
        </Link>
        <button
          onClick={() => setMobileSearchOpen(true)}
          className="flex flex-col items-center text-gray-700 hover:text-orange-600"
        >
          <FiSearch size={20} />
          <span className="text-xs">Search</span>
        </button>
        <Link
          to="/offers"
          className={`flex flex-col items-center ${
            isActive("/offers") ? "text-orange-600" : "text-gray-700"
          } hover:text-orange-600`}
        >
          <BiSolidOffer size={20} />
          <span className="text-xs">Offers</span>
        </Link>
        <Link
          to="/partner-with-us"
          className={`flex flex-col items-center ${
            isActive("/partner-with-us") ? "text-orange-600" : "text-gray-700"
          } hover:text-orange-600`}
        >
          <FaHandshake size={20} />
          <span className="text-xs">Partner</span>
        </Link>
        <Link
          to="/help"
          className={`flex flex-col items-center ${
            isActive("/help") ? "text-orange-600" : "text-gray-700"
          } hover:text-orange-600`}
        >
          <FaQuestionCircle size={20} />
          <span className="text-xs">Help</span>
        </Link>
        <Link
          to="/profile"
          className={`flex flex-col items-center ${
            isActive("/profile") ? "text-orange-600" : "text-gray-700"
          } hover:text-orange-600`}
        >
          <FaUserAlt size={20} />
          <span className="text-xs">Profile</span>
        </Link>
        <Link
          to="/cart"
          className={`flex flex-col items-center relative ${
            isActive("/cart") ? "text-orange-600" : "text-gray-700"
          } hover:text-orange-600`}
        >
          <FaShoppingCart size={20} />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs px-1 rounded-full">
              {cartCount}
            </span>
          )}
          <span className="text-xs">Cart</span>
        </Link>
      </nav>

      <style>{`
        @keyframes slideDown {
          0% { transform: translateY(-100%); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-slideDown { animation: slideDown 0.3s ease-out forwards; }
      `}</style>
    </>
  );
}
