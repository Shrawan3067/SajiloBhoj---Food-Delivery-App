import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaArrowRight, FaStar, FaClock, FaFire } from "react-icons/fa6";
import { FiTrendingUp, FiHeart } from "react-icons/fi";

import Biryani from "../assets/Biryani.png";
import Burger from "../assets/Burger.png";
import Pizza from "../assets/Pizza.png";
import Cake from "../assets/Cake.png";
import Chhole_Bhature from "../assets/Chole_Bhature.png";
import Paratha from "../assets/paratha.png";
import Pastry from "../assets/Pastry.png";
import Poori from "../assets/Poori.png";
import Rasmalai from "../assets/Rasmalai.png";
import Momo from "../assets/momo.png";
import Samosa from "../assets/Samosa.png";
import Icecream from "../assets/ice_cream.png";
import Roll from "../assets/Roll.png";

// Types
interface FoodItem {
  id: string;
  name: string;
  image: string;
  popularity?: number;
  isTrending?: boolean;
  preparationTime?: string;
  category?: string;
  price?: string;
}

// Food items with enhanced metadata
const FOOD_ITEMS: FoodItem[] = [
  { id: "1", name: "Biryani", image: Biryani, popularity: 98, isTrending: true, preparationTime: "20-25 min", category: "Main Course", price: "₹199" },
  { id: "2", name: "Burger", image: Burger, popularity: 95, isTrending: true, preparationTime: "15-20 min", category: "Fast Food", price: "₹149" },
  { id: "3", name: "Pizza", image: Pizza, popularity: 97, isTrending: true, preparationTime: "25-30 min", category: "Italian", price: "₹299" },
  { id: "4", name: "Roll", image: Roll, popularity: 92, preparationTime: "10-15 min", category: "Snacks", price: "₹99" },
  { id: "5", name: "Samosa", image: Samosa, popularity: 96, isTrending: true, preparationTime: "5-10 min", category: "Snacks", price: "₹49" },
  { id: "6", name: "Momo", image: Momo, popularity: 94, preparationTime: "10-15 min", category: "Snacks", price: "₹129" },
  { id: "7", name: "Paratha", image: Paratha, popularity: 91, preparationTime: "15-20 min", category: "Breakfast", price: "₹89" },
  { id: "8", name: "Chole Bhature", image: Chhole_Bhature, popularity: 93, preparationTime: "20-25 min", category: "North Indian", price: "₹159" },
  { id: "9", name: "Poori", image: Poori, popularity: 89, preparationTime: "15-20 min", category: "Breakfast", price: "₹79" },
  { id: "10", name: "Ice Cream", image: Icecream, popularity: 96, isTrending: true, preparationTime: "5 min", category: "Dessert", price: "₹99" },
  { id: "11", name: "Cake", image: Cake, popularity: 94, preparationTime: "10-15 min", category: "Dessert", price: "₹199" },
  { id: "12", name: "Pastry", image: Pastry, popularity: 92, preparationTime: "5-10 min", category: "Dessert", price: "₹79" },
  { id: "13", name: "Rasmalai", image: Rasmalai, popularity: 97, isTrending: true, preparationTime: "10-15 min", category: "Dessert", price: "₹149" },
];

// Loading Skeleton Component
const FoodItemSkeleton: React.FC = () => (
  <div className="flex-shrink-0 w-44 md:w-52 animate-pulse">
    <div className="bg-gray-200 rounded-2xl h-48 md:h-56 w-full"></div>
    <div className="mt-3 space-y-2">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
    </div>
  </div>
);

// Individual Food Item Card Component
const FoodItemCard: React.FC<{ item: FoodItem; onClick?: () => void }> = ({ item, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="flex-shrink-0 w-44 md:w-52 cursor-pointer group"
      onClick={onClick}
    >
      <div className="relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300">
        {/* Image Container */}
        <div className="relative h-48 md:h-56 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
          <motion.img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.4 }}
          />
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Trending Badge */}
          {item.isTrending && (
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-orange-500 text-white px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow-lg"
            >
              <FiTrendingUp className="text-xs" />
              Trending
            </motion.div>
          )}
          
          {/* Like Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
            className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:shadow-lg transition-all"
          >
            <FiHeart
              className={`text-lg transition-colors ${
                isLiked ? "fill-red-500 text-red-500" : "text-gray-600"
              }`}
            />
          </motion.button>
          
          {/* Preparation Time Badge */}
          {item.preparationTime && (
            <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs flex items-center gap-1">
              <FaClock className="text-xs" />
              {item.preparationTime}
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="p-3">
          <h3 className="font-bold text-gray-800 text-sm md:text-base mb-1 truncate">
            {item.name}
          </h3>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <div className="flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded-full">
                <FaStar className="text-yellow-500 text-xs" />
                <span className="text-xs font-semibold text-green-700">
                  {item.popularity}%
                </span>
              </div>
              <span className="text-xs text-gray-500">{item.category}</span>
            </div>
            <span className="font-bold text-orange-500 text-sm">{item.price}</span>
          </div>
        </div>
        
        {/* Hover Effect Border */}
        <div className="absolute inset-0 border-2 border-orange-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
    </motion.div>
  );
};

// Navigation Arrows Component
const NavigationArrows: React.FC<{
  onLeftClick: () => void;
  onRightClick: () => void;
  showLeft: boolean;
  showRight: boolean;
}> = ({ onLeftClick, onRightClick, showLeft, showRight }) => {
  return (
    <>
      {/* Left Arrow - Desktop */}
      <AnimatePresence>
        {showLeft && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onClick={onLeftClick}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-xl hover:shadow-2xl text-gray-700 hover:text-orange-500 transition-all duration-300 z-10"
          >
            <FaArrowLeft className="text-xl" />
          </motion.button>
        )}
      </AnimatePresence>
      
      {/* Right Arrow - Desktop */}
      <AnimatePresence>
        {showRight && (
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            onClick={onRightClick}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-xl hover:shadow-2xl text-gray-700 hover:text-orange-500 transition-all duration-300 z-10"
          >
            <FaArrowRight className="text-xl" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

// Category Filter Component
const CategoryFilter: React.FC<{
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}> = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      <button
        onClick={() => onCategoryChange("all")}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
          activeCategory === "all"
            ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
      >
        All Items
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
            activeCategory === category
              ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

// Main Component
export default function FoodOptionsSection(): JSX.Element {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Extract unique categories
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(FOOD_ITEMS.map(item => item.category))];
    return uniqueCategories.filter(Boolean);
  }, []);

  // Filter items by category
  const filteredItems = useMemo(() => {
    if (activeCategory === "all") return FOOD_ITEMS;
    return FOOD_ITEMS.filter(item => item.category === activeCategory);
  }, [activeCategory]);

  // Split items into two rows for better layout
  const firstRowItems = filteredItems.slice(0, Math.ceil(filteredItems.length / 2));
  const secondRowItems = filteredItems.slice(Math.ceil(filteredItems.length / 2));

  const checkScrollPosition = useCallback(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setShowLeftArrow(scrollLeft > 20);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 20);
    }
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollPosition);
      checkScrollPosition();
      
      // Simulate loading
      const timer = setTimeout(() => setIsLoading(false), 500);
      
      return () => {
        container.removeEventListener("scroll", checkScrollPosition);
        clearTimeout(timer);
      };
    }
  }, [checkScrollPosition]);

  // Reset scroll position when category changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
      setTimeout(checkScrollPosition, 300);
    }
  }, [activeCategory, checkScrollPosition]);

  const scrollLeft = useCallback(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = container.clientWidth * 0.8;
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  }, []);

  const scrollRight = useCallback(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = container.clientWidth * 0.8;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  }, []);

  const handleItemClick = (item: FoodItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  return (
    <>
      <section className="py-12 md:py-16 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Order our best food options
                </h2>
                <p className="text-gray-500 mt-2 text-sm md:text-base">
                  Discover delicious meals from your favorite cuisines
                </p>
              </div>
              
              {/* Mobile Navigation Arrows */}
              <div className="flex items-center gap-2 md:hidden">
                <button
                  onClick={scrollLeft}
                  disabled={!showLeftArrow}
                  className={`rounded-full p-2 transition-all duration-200 ${
                    showLeftArrow
                      ? "bg-gray-200 hover:bg-orange-500 text-gray-700 hover:text-white"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <FaArrowLeft className="text-sm" />
                </button>
                <button
                  onClick={scrollRight}
                  disabled={!showRightArrow}
                  className={`rounded-full p-2 transition-all duration-200 ${
                    showRightArrow
                      ? "bg-gray-200 hover:bg-orange-500 text-gray-700 hover:text-white"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <FaArrowRight className="text-sm" />
                </button>
              </div>
            </div>

            {/* Category Filter */}
            <CategoryFilter
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </motion.div>

          {/* Scrollable Container */}
          <div className="relative">
            <NavigationArrows
              onLeftClick={scrollLeft}
              onRightClick={scrollRight}
              showLeft={showLeftArrow}
              showRight={showRightArrow}
            />
            
            <motion.div
              ref={scrollContainerRef}
              className="overflow-x-auto scrollbar-hide"
              style={{ scrollBehavior: "smooth" }}
            >
              <div className="space-y-6 pb-4">
                {/* First Row */}
                <div className="flex gap-4 md:gap-6">
                  {isLoading ? (
                    <>
                      {[...Array(4)].map((_, i) => (
                        <FoodItemSkeleton key={i} />
                      ))}
                    </>
                  ) : (
                    firstRowItems.map((item, index) => (
                      <FoodItemCard
                        key={`${item.id}-${index}`}
                        item={item}
                        onClick={() => handleItemClick(item)}
                      />
                    ))
                  )}
                </div>
                
                {/* Second Row */}
                {secondRowItems.length > 0 && (
                  <div className="flex gap-4 md:gap-6 mt-4">
                    {isLoading ? (
                      <>
                        {[...Array(4)].map((_, i) => (
                          <FoodItemSkeleton key={i} />
                        ))}
                      </>
                    ) : (
                      secondRowItems.map((item, index) => (
                        <FoodItemCard
                          key={`${item.id}-${index + firstRowItems.length}`}
                          item={item}
                          onClick={() => handleItemClick(item)}
                        />
                      ))
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {[0, 1, 2].map((dot) => (
              <button
                key={dot}
                onClick={() => {
                  const container = scrollContainerRef.current;
                  if (container) {
                    const scrollAmount = container.clientWidth * dot;
                    container.scrollTo({ left: scrollAmount, behavior: "smooth" });
                  }
                }}
                className="group relative"
              >
                <div className="w-2 h-2 bg-gray-300 rounded-full hover:bg-orange-500 transition-all duration-300 group-hover:scale-125" />
                <div className="absolute inset-0 w-2 h-2 bg-orange-500 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Modal for Food Item Details */}
      <AnimatePresence>
        {isModalOpen && selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="w-full h-full object-cover"
                />
                {selectedItem.isTrending && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                    <FaFire className="text-xs" />
                    Trending
                  </div>
                )}
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{selectedItem.name}</h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-full">
                    <FaStar className="text-yellow-500 text-sm" />
                    <span className="text-sm font-semibold text-green-700">
                      {selectedItem.popularity}% recommended
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">{selectedItem.category}</span>
                </div>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaClock className="text-orange-500" />
                    <span>Preparation Time: {selectedItem.preparationTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <FiTrendingUp className="text-orange-500" />
                    <span>Popularity: {selectedItem.popularity}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-orange-500">{selectedItem.price}</span>
                  <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all">
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </>
  );
}