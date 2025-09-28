// LandingPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiClock, FiStar, FiShoppingBag } from "react-icons/fi";
import { TfiLocationPin } from "react-icons/tfi";
import { FaUtensils, FaShoppingBasket, FaStore, FaMotorcycle, FaShieldAlt } from "react-icons/fa";
import FeaturedRestaurantsSection from './FeaturedRestaurantsSection';

// Side decorative images
import leftImage from '../assets/Veggies_new.png';
import rightImage from '../assets/Sushi_replace.png';
import FoodOptionsSection from './FoodOptionsSection'; // Import the new component
import GroceriesOptions from './GroceriesOptions';

const LandingPage = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Featured restaurants data
  const featuredRestaurants = [
    {
      id: 1,
      name: "Burger King",
      cuisine: "Burgers, American",
      rating: 4.2,
      deliveryTime: "30 min",
      image: "/api/placeholder/300/200"
    },
    {
      id: 2,
      name: "Dominos Pizza",
      cuisine: "Pizza, Italian",
      rating: 4.5,
      deliveryTime: "25 min",
      image: "/api/placeholder/300/200"
    },
    {
      id: 3,
      name: "Bikanervala",
      cuisine: "North Indian, Sweets",
      rating: 4.1,
      deliveryTime: "35 min",
      image: "/api/placeholder/300/200"
    },
    {
      id: 4,
      name: "McDonald's",
      cuisine: "Burgers, Fast Food",
      rating: 4.0,
      deliveryTime: "20 min",
      image: "/api/placeholder/300/200"
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (location.trim() && searchTerm.trim()) {
      navigate('/restaurant-list', { 
        state: { 
          searchLocation: location,
          searchQuery: searchTerm 
        } 
      });
    } else if (location.trim()) {
      navigate('/restaurant-list', { state: { searchLocation: location } });
    }
  };

  return (
    <div className="min-h-screen bg-[#ff5200]">
      {/* Navigation Bar Spacer */}
      <div className="h-10"></div>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Decorative Images */}
          <img 
            src={leftImage} 
            alt="Fresh Vegetables" 
            className="absolute left-0 top-20 w-48 md:w-64 opacity-80 -translate-x-12"
          />
          <img 
            src={rightImage} 
            alt="Sushi" 
            className="absolute right-0 top-32 w-48 md:w-64 opacity-80 translate-x-12"
          />

          {/* Main Content */}
          <div className="text-center relative z-10">
            <h1 className="font-bold text-4xl md:text-6xl lg:text-7xl text-white mb-4">
              Hungry?
            </h1>
            <p className="text-[22px] md:text-2xl lg:text-3xl font-semibold text-white mb-8 max-w-4xl mx-auto leading-tight">
              Order food & groceries from your favorite local spots with SajiloBhoj!
            </p>

            {/* Search Section */}
            <div className="max-w-4xl mx-auto mb-12">
              <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-xl p-2 flex flex-col md:flex-row gap-2">
                <div className="flex-1 flex items-center bg-gray-50 rounded-xl p-3">
                  <TfiLocationPin className="text-2xl text-orange-500 mr-3" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter your delivery location"
                    className="flex-1 bg-transparent outline-none text-lg font-medium"
                  />
                </div>
                
                <div className="flex-1 flex items-center bg-gray-50 rounded-xl p-3">
                  <FiSearch className="text-xl text-gray-500 mr-3" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for restaurants or items..."
                    className="flex-1 bg-transparent outline-none text-lg font-medium"
                  />
                </div>
                
                <button 
                  type="submit"
                  className="bg-orange-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-orange-600 transition-colors duration-200"
                >
                  Search
                </button>
              </form>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">10K+</div>
                <div className="text-white">Restaurants</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">500+</div>
                <div className="text-white">Cities</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">1M+</div>
                <div className="text-white">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-white">Delivery</div>
              </div>
            </div>
          </div>
        </div>
      </section>

           {/* Rest of your existing sections... */}
      <section className="py-16 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-xl md:text-4xl font-bold text-center mb-12">What would you like to do today?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Food Delivery Card */}
            <div 
              className="bg-gradient-to-br from-orange-100 to-red-100 rounded-3xl p-8 text-center cursor-pointer group hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-orange-200"
              onClick={() => navigate('/restaurant-list')}
            >
              <div className="bg-orange-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaUtensils className="text-3xl text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Food Delivery</h3>
              <p className="text-gray-600 mb-4">From restaurants near you</p>
              <span className="inline-block bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                Upto 60% OFF
              </span>
            </div>

            {/* Instamart Card */}
            <div 
              className="bg-gradient-to-br from-green-100 to-blue-100 rounded-3xl p-8 text-center cursor-pointer group hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-green-200"
              onClick={() => navigate('/instamart')}
            >
              <div className="bg-green-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaShoppingBasket className="text-3xl text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Instamart</h3>
              <p className="text-gray-600 mb-4">Groceries in minutes</p>
              <span className="inline-block bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                Upto 60% OFF
              </span>
            </div>

            {/* Dineout Card */}
            <div 
              className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl p-8 text-center cursor-pointer group hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-purple-200"
              onClick={() => navigate('/dineout')}
            >
              <div className="bg-purple-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaStore className="text-3xl text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Dineout</h3>
              <p className="text-gray-600 mb-4">Eat out & save more</p>
              <span className="inline-block bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                Upto 50% OFF
              </span>
            </div>
          </div>
        </div>
      </section>


      {/* Food Options Section */}
      <FoodOptionsSection />

      <GroceriesOptions />

 

      {/* <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-[19px] md:text-2xl font-bold text-left mb-8">Featured Restaurants</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredRestaurants.map(restaurant => (
              <div 
                key={restaurant.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
                onClick={() => navigate(`/menu/${restaurant.id}`)}
              >
                <div className="h-40 bg-gradient-to-r from-orange-400 to-red-400 relative">
                  <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full text-sm font-semibold flex items-center">
                    <FiStar className="text-yellow-400 mr-1" />
                    {restaurant.rating}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{restaurant.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{restaurant.cuisine}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span className="flex items-center">
                      <FiClock className="mr-1" />
                      {restaurant.deliveryTime}
                    </span>
                    <span>•</span>
                    <span>FREE DELIVERY</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button 
              onClick={() => navigate('/restaurant-list')}
              className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-200"
            >
              View All Restaurants
            </button>
          </div>
        </div>
      </section> */}

      <FeaturedRestaurantsSection featuredRestaurants={featuredRestaurants} />

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-12">Why Choose SajiloBhoj?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaMotorcycle className="text-2xl text-orange-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Get your food delivered in 30 minutes or less</p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaShieldAlt className="text-2xl text-orange-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Safe & Secure</h3>
              <p className="text-gray-600">Contactless delivery and secure payments</p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FiShoppingBag className="text-2xl text-orange-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Best Offers</h3>
              <p className="text-gray-600">Enjoy exclusive discounts and cashback offers</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;