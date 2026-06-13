// RestaurantCard.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiStar, FiClock, FiMapPin, FiHeart, FiShoppingBag, FiTrendingUp } from "react-icons/fi";
import { FaLeaf, FaFire, FaTag } from "react-icons/fa";

interface Restaurant {
  id: string | number;
  image?: string;
  name: string;
  cuisines: string[];
  offer?: string;
  rating?: number | string;
  time?: string;
  isVeg?: boolean;
  isBestseller?: boolean;
  priceRange?: number;
  deliveryTime?: number;
  hasOffer?: boolean;
}

interface RestaurantCardProps {
  restaurant: Restaurant;
  onWishlist?: (id: string | number) => void;
  isWishlisted?: boolean;
}

export default function RestaurantCard({ restaurant, onWishlist, isWishlisted = false }: RestaurantCardProps): JSX.Element {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [liked, setLiked] = useState(isWishlisted);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setLiked(!liked);
    onWishlist?.(restaurant.id);
  };

  const rating = typeof restaurant.rating === 'number' ? restaurant.rating : parseFloat(restaurant.rating as string);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group"
    >
      <Link to={`/menu/${restaurant.id}`}>
        <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden w-72">
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
              {restaurant.isVeg && (
                <div className="bg-green-500 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-lg flex items-center gap-1">
                  <FaLeaf className="text-xs" />
                  Pure Veg
                </div>
              )}
              {restaurant.isBestseller && (
                <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-lg flex items-center gap-1">
                  <FaFire className="text-xs" />
                  Bestseller
                </div>
              )}
            </div>
            
            {/* Offer Badge */}
            {restaurant.offer && (
              <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1">
                <FaTag className="text-xs" />
                {restaurant.offer}
              </div>
            )}
            
            {/* Wishlist Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleWishlistClick}
              className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:shadow-lg transition-all"
            >
              <FiHeart
                className={`text-lg transition-colors ${
                  liked ? "fill-red-500 text-red-500" : "text-gray-600"
                }`}
              />
            </motion.button>
          </div>
          
          {/* Content */}
          <div className="p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 text-lg mb-1 line-clamp-1">
                  {restaurant.name}
                </h3>
                <p className="text-gray-500 text-sm line-clamp-1">
                  {restaurant.cuisines.join(", ")}
                </p>
              </div>
              {restaurant.priceRange && (
                <div className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                  ₹{restaurant.priceRange}
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-lg">
                  <FiStar className="text-yellow-500 text-sm" />
                  <span className="font-bold text-sm text-green-700">{rating.toFixed(1)}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-500 text-sm">
                  <FiClock className="text-orange-500" />
                  <span>{restaurant.time || `${restaurant.deliveryTime} min`}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-green-600 text-xs font-semibold">
                <FiShoppingBag className="text-sm" />
                <span>FREE</span>
              </div>
            </div>
          </div>
          
          {/* Hover Effect Border */}
          <div className="absolute inset-0 border-2 border-orange-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>
      </Link>
    </motion.div>
  );
}