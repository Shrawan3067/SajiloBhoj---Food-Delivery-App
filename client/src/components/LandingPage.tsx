import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiClock,
  FiStar,
  FiShoppingBag,
  FiNavigation,
  FiMapPin,
  FiCheck,
  FiTrendingUp,
  FiHeart,
  FiTruck,
  FiAward,
  FiSmartphone,
} from "react-icons/fi";
import {
  FaUtensils,
  FaShoppingBasket,
  FaStore,
  FaMotorcycle,
  FaShieldAlt,
  FaRegClock,
  FaPercent,
  FaLeaf,
  FaGift,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// Side decorative images
import leftImage from "../assets/Veggies_new.png";
import rightImage from "../assets/Sushi_replace.png";
import FoodOptionsSection from "./FoodOptionsSection";
import GroceriesOptions from "./GroceriesOptions";
import FeaturedRestaurantsSection from "./FeaturedRestaurantsSection";
import Shristi_momo from "../assets/shristi_momo.png";
import Hansraj from "../assets/hansraj.png";
import Raghupati from "../assets/raghupati.png";
import food from "../assets/food1.png";
import grocery from "../assets/grocery.png";
import dineout from "../assets/dineout.png";

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
}

interface LocationData {
  address: string;
  latitude?: number;
  longitude?: number;
}

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Custom hook for location detection
const useLocationDetection = () => {
  const [location, setLocation] = useState<LocationData>({ address: "" });
  const [isDetecting, setIsDetecting] = useState(false);
  const [error, setError] = useState<string>("");

  const detectLocation = useCallback(async () => {
    setIsDetecting(true);
    setError("");

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setIsDetecting(false);
      return;
    }

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        });
      });

      const { latitude, longitude } = position.coords;
      const address = await reverseGeocode(latitude, longitude);

      setLocation({ address, latitude, longitude });
      localStorage.setItem("userLocation", address);
      localStorage.setItem("userCoordinates", JSON.stringify({ latitude, longitude }));

      return { address, latitude, longitude };
    } catch (err) {
      const error = err as GeolocationPositionError;
      let errorMessage = "Error detecting location. Please enter manually.";

      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage = "Location access denied. Please enable location services.";
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage = "Location information unavailable.";
          break;
        case error.TIMEOUT:
          errorMessage = "Location request timed out. Please try again.";
          break;
      }

      setError(errorMessage);
      return null;
    } finally {
      setIsDetecting(false);
    }
  }, []);

  const reverseGeocode = async (lat: number, lng: number): Promise<string> => {
    try {
      // Using OpenStreetMap Nominatim
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1&accept-language=en`,
        {
          headers: {
            'User-Agent': 'BiteMitra/1.0',
          },
        }
      );
      
      const data = await response.json();
      
      if (data.address) {
        const components = [
          data.address.road || data.address.neighbourhood,
          data.address.suburb || data.address.city_district,
          data.address.city || data.address.town,
        ].filter(Boolean);
        
        return components.join(", ");
      }
      
      return data.display_name?.split(",")[0] || "Location found";
    } catch {
      return await reverseGeocodeFallback(lat, lng);
    }
  };

  const reverseGeocodeFallback = async (lat: number, lng: number): Promise<string> => {
    try {
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
      );
      const data = await response.json();
      return `${data.locality || data.city || "Location"}, ${data.principalSubdivision || ""}`;
    } catch {
      return "Current Location";
    }
  };

  const getApproximateLocation = useCallback(async () => {
    try {
      const response = await fetch("https://ipapi.co/json/");
      const data = await response.json();
      
      if (data.city && data.region) {
        const address = `${data.city}, ${data.region}`;
        setLocation({ address });
        localStorage.setItem("userLocation", address);
      }
    } catch {
      // Fallback to default
      setLocation({ address: "Enter your location" });
    }
  }, []);

  return { location, setLocation, isDetecting, error, detectLocation, getApproximateLocation };
};

// Component for location modal
const LocationModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onDetect: () => Promise<void>;
  onManual: () => void;
  isDetecting: boolean;
  error: string;
}> = ({ isOpen, onClose, onDetect, onManual, isDetecting, error }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.1 }}
              className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <FiNavigation className="text-3xl text-orange-500" />
            </motion.div>
            <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
              Find restaurants near you
            </h3>
            <p className="text-gray-600">
              Enable location access to discover the best restaurants and groceries around you.
            </p>
          </div>

          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onDetect}
              disabled={isDetecting}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isDetecting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Detecting Location...
                </>
              ) : (
                <>
                  <FiNavigation className="text-lg" />
                  Detect My Location
                </>
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onManual}
              className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
            >
              Enter Location Manually
            </motion.button>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm"
            >
              {error}
            </motion.div>
          )}

          <p className="text-xs text-gray-400 mt-4 text-center">
            We respect your privacy and only use your location to show relevant options.
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Component for stats counter
const StatCounter: React.FC<{ end: number; suffix?: string; label: string }> = ({ end, suffix = "", label }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const increment = end / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center"
    >
      <div className="text-3xl md:text-4xl font-bold text-white mb-1">
        {count}{suffix}
      </div>
      <div className="text-white/90 text-sm md:text-base">{label}</div>
    </motion.div>
  );
};

// Main Component
export default function LandingPage(): JSX.Element {
  const navigate = useNavigate();
  const { location, setLocation, isDetecting, error, detectLocation, getApproximateLocation } = useLocationDetection();
  const [searchTerm, setSearchTerm] = useState("");
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Featured restaurants data
  const featuredRestaurants: Restaurant[] = useMemo(() => [
    {
      id: 1,
      name: "Shristi Momo Corner",
      cuisine: "Momo, Nepali",
      rating: 4.2,
      deliveryTime: "30 min",
      image: Shristi_momo,
      isOpen: true,
    },
    {
      id: 2,
      name: "Hansraj Sweets",
      cuisine: "Sweets, Momo",
      rating: 4.5,
      deliveryTime: "25 min",
      image: Hansraj,
      isOpen: true,
    },
    {
      id: 3,
      name: "Raghupati Sweets",
      cuisine: "Nepali, Sweets",
      rating: 4.1,
      deliveryTime: "35 min",
      image: Raghupati,
      isOpen: true,
    },
    {
      id: 4,
      name: "McDonald's",
      cuisine: "Burgers, Fast Food",
      rating: 4.0,
      deliveryTime: "20 min",
      image: Shristi_momo,
      isOpen: true,
    },
  ], []);

  // Stats data
  const stats = [
    { end: 10, suffix: "K+", label: "Restaurants" },
    { end: 500, suffix: "+", label: "Cities" },
    { end: 1, suffix: "M+", label: "Happy Customers" },
    { end: 24, suffix: "/7", label: "Delivery" },
  ];

  // Features data
  const features = [
    {
      icon: FaMotorcycle,
      title: "Fast Delivery",
      description: "Get your food delivered in 30 minutes or less",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: FaShieldAlt,
      title: "Safe & Secure",
      description: "Contactless delivery and secure payments",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: FiShoppingBag,
      title: "Best Offers",
      description: "Enjoy exclusive discounts and cashback offers",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: FaRegClock,
      title: "24/7 Service",
      description: "Order anytime, day or night",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: FaPercent,
      title: "Great Savings",
      description: "Up to 60% off on your favorite items",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: FaLeaf,
      title: "Fresh Food",
      description: "Prepared fresh with quality ingredients",
      color: "from-green-500 to-teal-500",
    },
  ];

  // Categories data
  const categories = [
    {
      icon: food,
      title: "Food Delivery",
      subtitle: "From restaurants",
      discount: "Upto 60% OFF",
      color: "from-orange-400 to-red-400",
      route: "/restaurant-list",
      bgGradient: "from-orange-50 to-red-50",
    },
    {
      icon: grocery,
      title: "Sajilo Mart",
      subtitle: "Groceries in minutes",
      discount: "Upto 60% OFF",
      color: "from-green-400 to-emerald-400",
      route: "/instamart",
      bgGradient: "from-green-50 to-emerald-50",
    },
    {
      icon: dineout,
      title: "Dineout",
      subtitle: "Eat out & save more",
      discount: "Upto 50% OFF",
      color: "from-blue-400 to-cyan-400",
      route: "/dineout",
      bgGradient: "from-blue-50 to-cyan-50",
    },
  ];

  useEffect(() => {
    const savedLocation = localStorage.getItem("userLocation");
    if (savedLocation) {
      setLocation({ address: savedLocation });
      return;
    }

    const hasSeenLocationModal = localStorage.getItem("hasSeenLocationModal");
    if (!hasSeenLocationModal) {
      setTimeout(() => {
        setShowLocationModal(true);
        localStorage.setItem("hasSeenLocationModal", "true");
      }, 1500);
    }

    getApproximateLocation();
  }, [getApproximateLocation, setLocation]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (location.address.trim()) {
      localStorage.setItem("userLocation", location.address.trim());

      if (searchTerm.trim()) {
        navigate("/restaurant-list", {
          state: {
            searchLocation: location.address,
            searchQuery: searchTerm,
          },
        });
      } else {
        navigate("/restaurant-list", { state: { searchLocation: location.address } });
      }
    } else {
      setShowLocationModal(true);
    }
  };

  const handleCategoryClick = (route: string) => {
    if (location.address.trim()) {
      localStorage.setItem("userLocation", location.address.trim());
      navigate(route);
    } else {
      setShowLocationModal(true);
    }
  };

  const handleDetectLocation = async () => {
    const result = await detectLocation();
    if (result) {
      setShowLocationModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-500 to-orange-600">
      {/* Location Modal */}
      <LocationModal
        isOpen={showLocationModal}
        onClose={() => setShowLocationModal(false)}
        onDetect={handleDetectLocation}
        onManual={() => setShowLocationModal(false)}
        isDetecting={isDetecting}
        error={error}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Decorative Images */}
        <motion.img
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          src={leftImage}
          alt="Fresh Vegetables"
          className="absolute left-0 bottom-0 w-32 md:w-48 lg:w-64 opacity-20 md:opacity-100"
        />
        <motion.img
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          src={rightImage}
          alt="Sushi"
          className="absolute right-0 bottom-0 w-32 md:w-48 lg:w-64 opacity-20 md:opacity-100"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/50 via-transparent to-transparent" />

        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 relative z-10 w-full">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="text-center"
          >
            <motion.h1
              variants={fadeInUp}
              className="font-bold text-5xl md:text-7xl lg:text-8xl text-white mb-6"
            >
              Hungry?
              <span className="block text-3xl md:text-4xl lg:text-5xl mt-2">Let's find you something delicious</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-12 max-w-4xl mx-auto"
            >
              Order food & groceries from your favorite local spots with{" "}
              <span className="font-bold">BiteMitra!</span>
            </motion.p>

            {/* Search Form */}
            <motion.div
              variants={fadeInUp}
              className="max-w-4xl mx-auto mb-16"
            >
              <form
                onSubmit={handleSearch}
                className={`bg-white rounded-2xl shadow-2xl p-2 transition-all duration-300 ${
                  isSearchFocused ? "shadow-3xl ring-2 ring-orange-300" : ""
                }`}
              >
                <div className="flex flex-col md:flex-row gap-2">
                  {/* Location Input */}
                  <div className="flex-1 relative">
                    <div className="flex items-center bg-gray-50 rounded-xl p-3 h-full">
                      <FiMapPin className="text-2xl text-orange-500 mr-3 flex-shrink-0" />
                      <input
                        type="text"
                        value={location.address}
                        onChange={(e) => setLocation({ address: e.target.value })}
                        placeholder="Enter your delivery location"
                        className="flex-1 bg-transparent outline-none text-base font-medium placeholder:text-gray-400"
                        required
                      />
                      <button
                        type="button"
                        onClick={handleDetectLocation}
                        disabled={isDetecting}
                        className="text-orange-500 hover:text-orange-600 transition-colors disabled:opacity-50 ml-2"
                        title="Detect my location"
                      >
                        {isDetecting ? (
                          <div className="w-5 h-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <FiNavigation className="text-xl" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Search Input */}
                  <div className="flex-1">
                    <div className="flex items-center bg-gray-50 rounded-xl p-3 h-full">
                      <FiSearch className="text-xl text-gray-400 mr-3 flex-shrink-0" />
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setIsSearchFocused(false)}
                        placeholder="Search for restaurants, cuisines, or items..."
                        className="flex-1 bg-transparent outline-none text-base font-medium placeholder:text-gray-400"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Search
                  </button>
                </div>
              </form>

              {error && !showLocationModal && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 p-3 bg-red-50/90 backdrop-blur-sm text-red-600 rounded-lg text-sm text-left"
                >
                  {error}
                </motion.div>
              )}
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
            >
              {stats.map((stat, index) => (
                <StatCounter key={index} end={stat.end} suffix={stat.suffix} label={stat.label} />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              What would you like to do today?
            </h2>
            <p className="text-gray-600 text-lg">Choose from our wide range of services</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className={`bg-gradient-to-br ${category.bgGradient} relative overflow-hidden rounded-3xl cursor-pointer group transition-all duration-500 hover:shadow-2xl border-2 border-transparent hover:border-${category.color.split('-')[1]}-200`}
                onClick={() => handleCategoryClick(category.route)}
              >
                <div className="relative z-10 p-8">
                  <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 font-medium mb-4">{category.subtitle}</p>
                  <div className={`inline-block bg-gradient-to-r ${category.color} text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg`}>
                    {category.discount}
                  </div>
                </div>
                <motion.img
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.5 }}
                  src={category.icon}
                  alt={category.title}
                  className="absolute -right-10 -bottom-10 w-48 md:w-56 opacity-50 group-hover:opacity-100 transition-all duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Food Options Section */}
      <FoodOptionsSection />

      {/* Groceries Options */}
      <GroceriesOptions />

      {/* Featured Restaurants */}
      <FeaturedRestaurantsSection featuredRestaurants={featuredRestaurants} />

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
              Why Choose BiteMitra?
            </h2>
            <p className="text-gray-600 text-lg">Experience the best food delivery service</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 group"
              >
                <div className={`w-20 h-20 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <feature.icon className="text-3xl text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to satisfy your cravings?
            </h2>
            <p className="text-white/90 text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of happy customers who enjoy delicious food delivered to their doorstep
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (location.address.trim()) {
                  navigate("/restaurant-list");
                } else {
                  setShowLocationModal(true);
                }
              }}
              className="bg-white text-orange-500 px-12 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-all duration-300"
            >
              Order Now
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}