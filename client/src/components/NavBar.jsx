// src/components/NavBar.jsx
import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import sajilobhoj_icon from "../assets/sajilobhoj_icon9.png";
import {
  FaUserAlt,
  FaShoppingCart,
  FaQuestionCircle,
  FaHandshake,
  FaHome,
  FaTimes,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { BiSolidOffer } from "react-icons/bi";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function NavBar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const cartCount = cart?.reduce((sum, item) => sum + (item.qty || 0), 0) || 0;
  const navigate = useNavigate();

  const location = useLocation();
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const searchRef = useRef(null);
  const userMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setMobileSearchOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setShowMobileMenu(false);
      }
    };

    // Add both mouse and touch events
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    setShowMobileMenu(false);
    navigate("/");
  };

  const handleProfileClick = () => {
    if (user) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
    setShowUserMenu(false);
    setShowMobileMenu(false);
  };

  const handleUserMenuToggle = () => {
    setShowUserMenu(!showUserMenu);
    setShowMobileMenu(false);
  };

  const handleMobileMenuToggle = () => {
    setShowMobileMenu(!showMobileMenu);
    setShowUserMenu(false);
  };

  return (
    <>
      {/* Desktop Nav - fixed at top */}
      <nav className="sticky top-0 w-full bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-6 py-1 flex justify-between items-center w-full">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <div className="relative">
              <div className="absolute rounded-full"></div>
              <img
                src={sajilobhoj_icon}
                alt="SajiloBhoj Logo"
                className="h-18 object-contain cursor-pointer relative z-10"
              />
            </div>
            <div>
              <span className="text-[22px] font-bold text-gray-900">
                Bite<span className="text-orange-500">Xpress</span>
              </span>
              <span className="text-xs text-gray-500 font-[500] block -mt-1">
                Quick & Delicious
              </span>
            </div>
          </Link>

          {/* Mobile Menu Button - Hidden on desktop */}
          <button
            className="md:hidden flex items-center p-2"
            onClick={handleMobileMenuToggle}
          >
            <FaBars size={26} className="text-gray-700" />
          </button>

          {/* Search - Hidden on mobile */}
          <div className="hidden xl:flex items-center w-[500px]">
            <div className="flex w-full items-center bg-gray-50 border border-gray-200 px-3 py-3 rounded-xl">
              <FiSearch className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search for restaurants and food"
                className="bg-transparent outline-none text-base font-medium w-full"
              />
            </div>
          </div>

          {/* Desktop Links - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/partner-with-us"
              className={`flex items-center space-x-1 ${
                isActive("/partner-with-us")
                  ? "text-orange-600 font-semibold"
                  : "text-gray-700"
              } hover:text-orange-600 transition-colors duration-200`}
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
              } hover:text-orange-600 transition-colors duration-200`}
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
              } hover:text-orange-600 transition-colors duration-200`}
            >
              <FaQuestionCircle />
              <span>Help</span>
            </Link>

            {/* User Profile with Dropdown */}
            <div className="relative" ref={userMenuRef}>
              {user ? (
                <button
                  onClick={handleUserMenuToggle}
                  className={`flex items-center space-x-2 cursor-pointer ${
                    isActive("/profile")
                      ? "text-orange-600 font-semibold"
                      : "text-gray-700"
                  } hover:text-orange-600 transition-colors duration-200`}
                >
                  <FaUserAlt />
                  <span>{user.name.split(" ")[0]}</span>
                </button>
              ) : (
                <Link
                  to="/login"
                  className={`flex items-center space-x-1 ${
                isActive("/login")
                  ? "text-orange-600 font-semibold"
                  : "text-gray-700"
              } hover:text-orange-600 transition-colors duration-200`}
                >
                  <FaUserAlt />
                  <span>Login</span>
                </Link>
              )}

              {/* User Dropdown Menu */}
              {showUserMenu && user && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user.email || user.phone}
                    </p>
                  </div>
                  <button
                    onClick={handleProfileClick}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                  >
                    My Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2 transition-colors duration-200"
                  >
                    <FaSignOutAlt size={14} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>

            {/* Cart */}
            <Link
              to="/cart"
              className={`cursor-pointer flex items-center space-x-2 relative ${
                isActive("/cart")
                  ? "text-orange-600 font-semibold"
                  : "text-gray-700"
              } hover:text-orange-600 transition-colors duration-200`}
            >
              <div className="relative">
                <FaShoppingCart size={18} />
                <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs px-1 rounded-full min-w-[18px] text-center">
                  {cartCount > 0 ? cartCount : 0}
                </span>
              </div>
              <span>Cart</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Slide-down Menu */}
      {showMobileMenu && (
        <div
          ref={mobileMenuRef}
          className="fixed top-0 left-0 w-full bg-white z-50 p-4 shadow-md animate-slideDown md:hidden"
        >
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-bold">Menu</span>
            <button
              onClick={() => setShowMobileMenu(false)}
              className="p-2 hover:bg-gray-100 rounded transition-colors duration-200"
            >
              <FaTimes size={20} className="text-gray-700" />
            </button>
          </div>
          
          {/* Mobile User Section */}
          <div className="border-b border-gray-200 pb-4 mb-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <FaUserAlt className="text-orange-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email || user.phone}</p>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setShowMobileMenu(false)}
                className="flex items-center space-x-3 text-orange-600 font-medium"
              >
                <FaUserAlt />
                <span>Login / Sign Up</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Links */}
          <div className="space-y-2">
            <Link
              to="/profile"
              onClick={() => setShowMobileMenu(false)}
              className="block py-3 px-4 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              My Profile
            </Link>
            <Link
              to="/partner-with-us"
              onClick={() => setShowMobileMenu(false)}
              className="block py-3 px-4 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              Partner with Us
            </Link>
            <Link
              to="/offers"
              onClick={() => setShowMobileMenu(false)}
              className="block py-3 px-4 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              Offers
            </Link>
            <Link
              to="/help"
              onClick={() => setShowMobileMenu(false)}
              className="block py-3 px-4 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              Help
            </Link>
            {user && (
              <button
                onClick={handleLogout}
                className="w-full text-left py-3 px-4 hover:bg-gray-100 rounded-lg flex items-center space-x-2 transition-colors duration-200 text-red-600"
              >
                <FaSignOutAlt size={14} />
                <span>Logout</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Mobile Slide-down Search */}
      {mobileSearchOpen && (
        <div
          ref={searchRef}
          className="fixed top-0 left-0 w-full bg-white z-50 p-4 shadow-md animate-slideDown"
        >
          <div className="flex items-center space-x-2">
            <div className="flex w-full border border-gray-300 p-2 rounded outline-none">
              <input
                type="text"
                placeholder="Search for restaurants and food"
                className="w-full outline-none"
              />
              <FiSearch size={20} className="text-gray-700" />
            </div>
            <button
              onClick={() => setMobileSearchOpen(false)}
              className="p-2 hover:bg-gray-100 rounded transition-colors duration-200"
            >
              <FaTimes size={20} className="text-gray-700" />
            </button>
          </div>
        </div>
      )}

      {/* Bottom Mobile Nav - Hidden on desktop */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white p-2 flex justify-around items-center z-40 border-t border-gray-300">
        <Link
          to="/"
          className={`flex flex-col items-center p-2 ${
            isActive("/") ? "text-orange-600" : "text-gray-700"
          } hover:text-orange-600 transition-colors duration-200`}
        >
          <FaHome size={20} />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <button
          onClick={() => setMobileSearchOpen(true)}
          className="flex flex-col items-center p-2 text-gray-700 hover:text-orange-600 transition-colors duration-200"
        >
          <FiSearch size={20} />
          <span className="text-xs mt-1">Search</span>
        </button>
        <Link
          to="/offers"
          className={`flex flex-col items-center p-2 ${
            isActive("/offers") ? "text-orange-600" : "text-gray-700"
          } hover:text-orange-600 transition-colors duration-200`}
        >
          <BiSolidOffer size={20} />
          <span className="text-xs mt-1">Offers</span>
        </Link>
        
        {/* Mobile User Profile */}
        <button
          onClick={handleMobileMenuToggle}
          className={`flex flex-col items-center p-2 ${
            isActive("/profile") ? "text-orange-600" : "text-gray-700"
          } hover:text-orange-600 transition-colors duration-200`}
        >
          <FaUserAlt size={20} />
          <span className="text-xs mt-1">{user ? "Account" : "Login"}</span>
        </button>

        {/* Mobile Cart */}
        <Link
          to="/cart"
          className={`flex flex-col items-center p-2 relative ${
            isActive("/cart") ? "text-orange-600" : "text-gray-700"
          } hover:text-orange-600 transition-colors duration-200`}
        >
          <div className="relative">
            <FaShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs px-1 rounded-full min-w-[16px] text-center">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-xs mt-1">Cart</span>
        </Link>
      </nav>

      {/* Animation styles */}
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