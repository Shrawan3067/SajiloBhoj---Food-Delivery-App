// FoodOptionsSection.jsx
import React, { useState, useRef, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

// Import all your food images
import Biryani from "../assets/Biryani.png";
import Burger from "../assets/Burger.png";
import Pizza from "../assets/Pizza.png";
import Cake from "../assets/Cake.png"
import Chhole_Bhature from "../assets/Chole_Bhature.png"
import Paratha from "../assets/paratha.png"
import Pastry from "../assets/Pastry.png"
import Poori from "../assets/Poori.png"
import Rasmalai from "../assets/Rasmalai.png"
import Momo from "../assets/momo.png"
import Samosa from "../assets/Samosa.png"
import Icecream from "../assets/ice_cream.png"
import Roll from "../assets/Roll.png"

const FoodOptionsSection = () => {
  const foodItems = [
    { name: "Biryani", image: Biryani },
    { name: "Burger", image: Burger },
     { name: "Pizza", image: Pizza },
    { name: "Roll", image: Roll },
    { name: "Samosa", image: Samosa },
    { name: "Momo", image: Momo },
    { name: "Paratha", image: Paratha },
    { name: "Chhole_Bhature", image: Chhole_Bhature },
    { name: "Poori", image: Poori },
    { name: "Ice Cream", image: Icecream },
    { name: "Cake", image: Cake },
    { name: "Pastry", image: Pastry },
    { name: "Rasmalai", image: Rasmalai },
    { name: "Biryani", image: Biryani }
  ];

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

  // Split food items into two rows
  const firstRowItems = foodItems.slice(0, Math.ceil(foodItems.length / 2));
  const secondRowItems = foodItems.slice(Math.ceil(foodItems.length / 2));

  return (
    <section className="py-8 bg-white relative">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header with Arrows at Top Right */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-[19px] md:text-2xl font-bold text-gray-900">
            Order our best food options
          </h2>
          
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

        {/* Food Items Scroll Container with Two Lines */}
        <div className="relative">
          <div 
            ref={scrollContainerRef}
            id="food-scroll-container"
            className="flex overflow-x-auto scrollbar-hide space-x-6 px-1 flex-col"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* First Row */}
            <div className="flex space-x-6 flex-shrink-0">
              {firstRowItems.map((item, index) => (
                <div 
                  key={index}
                  className="flex-shrink-0 w-40 bg-white cursor-pointer group"
                >
                  {/* Food Image */}
                  <div className="h-45 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  
                </div>
              ))}
            </div>

            {/* Second Row */}
            <div className="flex space-x-6 flex-shrink-0">
              {secondRowItems.map((item, index) => (
                <div 
                  key={index + firstRowItems.length}
                  className="flex-shrink-0 w-40 bg-white cursor-pointer group"
                >
                  {/* Food Image */}
                  <div className="h-45 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator Dots */}
        <div className="flex justify-center space-x-2 mt-8">
          {[1, 2, 3].map((dot) => (
            <div key={dot} className="w-2 h-2 bg-gray-300 rounded-full hover:bg-orange-500 cursor-pointer"></div>
          ))}
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

export default FoodOptionsSection;