import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiStar, 
  FiClock, 
  FiMapPin, 
  FiHeart, 
  FiShare2, 
  FiChevronRight,
  FiTruck,
  FiAward,
  FiTrendingUp
} from "react-icons/fi";
import { FaArrowLeft, FaArrowRight, FaFire, FaLeaf } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

// Types
interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  image: string;
  isFeatured?: boolean;
  isOpen?: boolean;
  priceRange?: string;
  distance?: string;
  offers?: string[];
  isVeg?: boolean;
  isNew?: boolean;
  totalRatings?: number;
}

interface FeaturedRestaurantsSectionProps {
  featuredRestaurants: Restaurant[];
  onViewAll?: () => void;
}

// Loading Skeleton Component
const RestaurantCardSkeleton: React.FC = () => (
  <div className="flex-shrink-0 w-80 animate-pulse">
    <div className="bg-gray-200 rounded-2xl h-48 w-full"></div>
    <div className="p-4 space-y-3">
      <div className="h-5 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="flex gap-2">
        <div className="h-4 bg-gray-200 rounded w-16"></div>
        <div className="h-4 bg-gray-200 rounded w-20"></div>
      </div>
    </div>
  </div>
);

// Individual Restaurant Card Component
const RestaurantCard: React.FC<{ 
  restaurant: Restaurant; 
  onClick: () => void;
  onWishlist?: (id: number) => void;
}> = ({ restaurant, onClick, onWishlist }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    onWishlist?.(restaurant.id);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="flex-shrink-0 w-80 cursor-pointer group"
      onClick={onClick}
    >
      <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse" />
          )}
          <motion.img
            src={restaurant.image}
            alt={restaurant.name}
            className={`w-full h-full object-cover transition-all duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.4 }}
          />
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {restaurant.isNew && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-lg"
              >
                New
              </motion.div>
            )}
            {restaurant.isVeg && (
              <div className="bg-green-500 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-lg flex items-center gap-1">
                <FaLeaf className="text-xs" />
                Pure Veg
              </div>
            )}
          </div>
          
          {/* Rating Badge */}
          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-lg shadow-md">
            <div className="flex items-center gap-1">
              <FiStar className="text-yellow-500 text-sm fill-yellow-500" />
              <span className="font-bold text-sm">{restaurant.rating}</span>
              {restaurant.totalRatings && (
                <span className="text-xs text-gray-500">({restaurant.totalRatings})</span>
              )}
            </div>
          </div>
          
          {/* Offer Badge */}
          {restaurant.offers && restaurant.offers.length > 0 && (
            <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs font-medium">
              {restaurant.offers[0]}
            </div>
          )}
          
          {/* Wishlist Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleWishlistClick}
            className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:shadow-lg transition-all"
          >
            <FiHeart
              className={`text-lg transition-colors ${
                isLiked ? "fill-red-500 text-red-500" : "text-gray-600"
              }`}
            />
          </motion.button>
        </div>
        
        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3 className="font-bold text-lg text-gray-800 mb-1 line-clamp-1">
                {restaurant.name}
              </h3>
              <p className="text-gray-500 text-sm line-clamp-1">
                {restaurant.cuisine}
              </p>
            </div>
            {restaurant.priceRange && (
              <span className="text-sm text-gray-500 font-medium">
                {restaurant.priceRange}
              </span>
            )}
          </div>
          
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-gray-500 text-sm">
                <FiClock className="text-orange-500" />
                <span>{restaurant.deliveryTime}</span>
              </div>
              {restaurant.distance && (
                <>
                  <span className="text-gray-300">•</span>
                  <div className="flex items-center gap-1 text-gray-500 text-sm">
                    <FiMapPin className="text-orange-500" />
                    <span>{restaurant.distance}</span>
                  </div>
                </>
              )}
            </div>
            <div className="flex items-center gap-1 text-green-600 text-xs font-semibold">
              <FiTruck className="text-sm" />
              <span>FREE</span>
            </div>
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

// Filter Tabs Component
const FilterTabs: React.FC<{
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}> = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { id: "all", label: "All", icon: null },
    { id: "trending", label: "Trending", icon: FiTrendingUp },
    { id: "nearby", label: "Nearby", icon: FiMapPin },
    { id: "offers", label: "Offers", icon: FiAward },
  ];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap flex items-center gap-2 ${
            activeFilter === filter.id
              ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {filter.icon && <filter.icon className="text-sm" />}
          {filter.label}
        </button>
      ))}
    </div>
  );
};

// Main Component
export default function FeaturedRestaurantsSection({
  featuredRestaurants,
  onViewAll,
}: FeaturedRestaurantsSectionProps): JSX.Element {
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [wishlistedIds, setWishlistedIds] = useState<number[]>([]);

  // Filter restaurants based on active filter
  const filteredRestaurants = useMemo(() => {
    let filtered = [...featuredRestaurants];
    
    switch (activeFilter) {
      case "trending":
        filtered = filtered.filter(r => r.rating >= 4.3);
        break;
      case "nearby":
        filtered = filtered.filter(r => r.distance && parseInt(r.distance) <= 3);
        break;
      case "offers":
        filtered = filtered.filter(r => r.offers && r.offers.length > 0);
        break;
      default:
        break;
    }
    
    return filtered;
  }, [featuredRestaurants, activeFilter]);

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

  const handleRestaurantClick = (restaurant: Restaurant) => {
    navigate(`/menu/${restaurant.id}`, { state: { restaurant } });
  };

  const handleWishlist = (id: number) => {
    setWishlistedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleViewAll = () => {
    if (onViewAll) {
      onViewAll();
    } else {
      navigate("/restaurant-list");
    }
  };

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
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
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                Featured Restaurants
              </h2>
              <p className="text-gray-500 mt-2 text-sm md:text-base">
                Discover the most popular dining spots in your area
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

          {/* Filter Tabs */}
          <FilterTabs
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
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
            <div className="flex gap-4 md:gap-6 pb-4">
              {isLoading ? (
                <>
                  {[...Array(4)].map((_, i) => (
                    <RestaurantCardSkeleton key={i} />
                  ))}
                </>
              ) : (
                filteredRestaurants.map((restaurant) => (
                  <RestaurantCard
                    key={restaurant.id}
                    restaurant={restaurant}
                    onClick={() => handleRestaurantClick(restaurant)}
                    onWishlist={handleWishlist}
                  />
                ))
              )}
            </div>
          </motion.div>
        </div>

        {/* Pagination Dots */}
        {filteredRestaurants.length > 3 && (
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
        )}

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleViewAll}
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto"
          >
            View All Restaurants
            <FiChevronRight className="text-lg" />
          </motion.button>
        </motion.div>
      </div>

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
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}