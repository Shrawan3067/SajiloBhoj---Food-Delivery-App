// FeaturedRestaurantsSection.jsx
import React, { useState, useRef, useEffect } from 'react';
import { FiStar, FiClock } from "react-icons/fi";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const FeaturedRestaurantsSection = ({ featuredRestaurants }) => {
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScrollPosition = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      
      // Show left arrow if scrolled from the start
      setShowLeftArrow(scrollLeft > 10);
      
      // Show right arrow if not at the end
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollPosition);
      // Initial check
      checkScrollPosition();
      
      return () => {
        container.removeEventListener('scroll', checkScrollPosition);
      };
    }
  }, []);

  const scrollLeft = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  // Arrow background colors based on state
  const getLeftArrowBgColor = () => {
    return showLeftArrow 
      ? 'bg-gray-300 hover:bg-orange-600 text-black' 
      : 'bg-gray-100 text-black cursor-not-allowed';
  };

  const getRightArrowBgColor = () => {
    return showRightArrow 
      ? 'bg-gray-300 hover:bg-orange-600 text-black' 
      : 'bg-gray-100 text-black cursor-not-allowed';
  };

  return (
    <section className="py-8 bg-gray-50 relative">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header with Arrows at Top Right */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-[19px] md:text-2xl font-bold text-left">Featured Restaurants</h2>
          
          {/* Arrows Container - Top Right */}
          <div className="flex space-x-2">
            <button 
              onClick={scrollLeft}
              disabled={!showLeftArrow}
              className={`rounded-full p-2 transition-all duration-200 ${getLeftArrowBgColor()} flex items-center justify-center md:w-8 w-6 md:h-8 h-6`}
            >
              <FaArrowLeft className="text-xl" />
            </button>
            <button 
              onClick={scrollRight}
              disabled={!showRightArrow}
              className={`rounded-full p-2 transition-all duration-200 ${getRightArrowBgColor()} flex items-center justify-center md:w-8 w-6 md:h-8 h-6`}
            >
              <FaArrowRight className="text-xl" />
            </button>
          </div>
        </div>

        {/* Restaurants Scroll Container */}
        <div className="relative">
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto scrollbar-hide space-x-6 px-1 pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {featuredRestaurants.map(restaurant => (
              <div 
                key={restaurant.id}
                className="flex-shrink-0 w-80 bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
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
        </div>

        {/* Scroll Indicator Dots */}
        <div className="flex justify-center space-x-2 mt-4">
          {[1, 2, 3].map((dot) => (
            <div key={dot} className="w-2 h-2 bg-gray-300 rounded-full hover:bg-orange-500 cursor-pointer"></div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          <button 
            onClick={() => navigate('/restaurant-list')}
            className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-200"
          >
            View All Restaurants
          </button>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default FeaturedRestaurantsSection;