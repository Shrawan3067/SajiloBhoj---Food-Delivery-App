// RestaurantList.tsx
import React, { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { getRestaurants } from "../services/restaurantService";
import RestaurantCard from "./RestaurantCard";
import { IoRestaurantOutline } from "react-icons/io5";
import {
  FaFilter,
  FaStar,
  FaTag,
  FaLeaf,
  FaMoneyBillWave,
  FaTimes,
  FaFire,
  FaSearch,
  FaShippingFast,
  FaArrowRight,
  FaTrophy,
  FaUtensils,
} from "react-icons/fa";
import { FiTrendingUp, FiZap, FiAward } from "react-icons/fi";

// Types
interface Restaurant {
  _id: string;
  id: string | number;
  name: string;
  image?: string;
  cuisines: string[];
  rating: number;
  deliveryTime: number;
  priceRange: number;
  hasOffer: boolean;
  isVeg: boolean;
  isBestseller: boolean;
  popularity: number;
  offer?: string;
  time?: string;
}

interface Filter {
  key: string;
  label: string;
  icon: React.ReactNode;
  count: number;
  color: string;
  condition: (restaurant: Restaurant) => boolean;
}

// Loading Skeleton Component
const RestaurantCardSkeleton: React.FC = () => (
  <div className="w-72 animate-pulse">
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

// Filter Button Component
const FilterButton: React.FC<{
  filter: Filter;
  isActive: boolean;
  onClick: () => void;
}> = ({ filter, isActive, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border transition-all duration-300 font-semibold shrink-0 text-sm ${
        isActive
          ? `bg-gradient-to-r ${filter.color} border-transparent text-white shadow-md`
          : "bg-white border-gray-200 text-gray-700 hover:border-orange-300 hover:shadow-sm"
      }`}
    >
      <span className="text-base">{filter.icon}</span>
      <span className="whitespace-nowrap">{filter.label}</span>
      {filter.count > 0 && (
        <span
          className={`px-1.5 py-0.5 rounded-full text-xs font-bold transition-all ${
            isActive
              ? "bg-white/30 text-white"
              : "bg-orange-100 text-orange-600"
          }`}
        >
          {filter.count}
        </span>
      )}
    </motion.button>
  );
};

// Active Filter Tag Component
const ActiveFilterTag: React.FC<{
  filter: Filter;
  onRemove: () => void;
}> = ({ filter, onRemove }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className={`flex items-center gap-1.5 bg-gradient-to-r ${filter.color} text-white px-2.5 py-1 rounded-full text-xs font-medium shadow-sm`}
    >
      {filter.icon}
      <span>{filter.label}</span>
      <button
        onClick={onRemove}
        className="hover:bg-white/20 rounded-full p-0.5 transition-colors ml-0.5"
      >
        <FaTimes className="text-xs" />
      </button>
    </motion.div>
  );
};

// Sort Select Component
const SortSelect: React.FC<{
  value: string;
  onChange: (value: string) => void;
}> = ({ value, onChange }) => {
  const sortOptions = [
    { value: "relevance", label: "Relevance", icon: <FiTrendingUp /> },
    { value: "rating", label: "Rating", icon: <FaStar /> },
    { value: "deliveryTime", label: "Fast Delivery", icon: <FiZap /> },
    { value: "priceLow", label: "Price: Low to High", icon: <FaMoneyBillWave /> },
    { value: "priceHigh", label: "Price: High to Low", icon: <FaMoneyBillWave /> },
    { value: "name", label: "Name A-Z", icon: <FaUtensils /> },
  ];

  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-2 pr-8 border border-gray-200 rounded-xl bg-white focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 font-medium text-sm appearance-none cursor-pointer hover:border-orange-300 transition-colors"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <FaArrowRight className="text-gray-400 text-xs rotate-90" />
      </div>
    </div>
  );
};

// Stats Card Component
const StatsCard: React.FC<{ title: string; value: number; icon: React.ReactNode; color: string }> = ({
  title,
  value,
  icon,
  color,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      const duration = 1000;
      const increment = value / (duration / 16);
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      className="text-center"
    >
      <div className={`bg-gradient-to-br ${color} w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-lg`}>
        <div className="text-white text-xl">{icon}</div>
      </div>
      <div className="font-bold text-2xl text-gray-800">{count}</div>
      <div className="text-gray-500 text-sm">{title}</div>
    </motion.div>
  );
};

// Main Component
export default function RestaurantList(): JSX.Element {
  const [search, setSearch] = useState<string>("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("relevance");
  const [isLoading, setIsLoading] = useState(true);
  const [wishlistedIds, setWishlistedIds] = useState<(string | number)[]>([]);
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Fetch restaurants from API
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const data = await getRestaurants();
        setRestaurants(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
        setIsLoading(false);
      }
    };
    fetchRestaurants();
  }, []);

  // Define filters with conditions
  const filters: Filter[] = useMemo(() => [
    {
      key: "offers",
      label: "Offers",
      icon: <FaTag />,
      count: restaurants.filter((r: Restaurant) => r.hasOffer).length,
      color: "from-red-500 to-red-600",
      condition: (r: Restaurant) => r.hasOffer,
    },
    {
      key: "rating",
      label: "Rating 4.0+",
      icon: <FaStar />,
      count: restaurants.filter((r: Restaurant) => r.rating >= 4.0).length,
      color: "from-yellow-500 to-orange-500",
      condition: (r: Restaurant) => r.rating >= 4.0,
    },
    {
      key: "veg",
      label: "Pure Veg",
      icon: <FaLeaf />,
      count: restaurants.filter((r: Restaurant) => r.isVeg).length,
      color: "from-green-500 to-emerald-600",
      condition: (r: Restaurant) => r.isVeg,
    },
    {
      key: "lowPrice",
      label: "Under ₹300",
      icon: <FaMoneyBillWave />,
      count: restaurants.filter((r: Restaurant) => r.priceRange < 300).length,
      color: "from-green-500 to-green-600",
      condition: (r: Restaurant) => r.priceRange < 300,
    },
    {
      key: "midPrice",
      label: "₹300-600",
      icon: <FaMoneyBillWave />,
      count: restaurants.filter((r: Restaurant) => r.priceRange >= 300 && r.priceRange <= 600).length,
      color: "from-orange-500 to-orange-600",
      condition: (r: Restaurant) => r.priceRange >= 300 && r.priceRange <= 600,
    },
    {
      key: "bestseller",
      label: "Bestsellers",
      icon: <FaFire />,
      count: restaurants.filter((r: Restaurant) => r.isBestseller).length,
      color: "from-orange-500 to-red-500",
      condition: (r: Restaurant) => r.isBestseller,
    },
  ], [restaurants]);

  // Filter and sort restaurants
  const filteredRestaurants = useMemo(() => {
    let filtered = [...restaurants] as Restaurant[];

    // Apply search filter
    if (search.trim()) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.name.toLowerCase().includes(searchLower) ||
          r.cuisines.some(c => c.toLowerCase().includes(searchLower))
      );
    }

    // Apply active filters
    if (activeFilters.length > 0) {
      filtered = filtered.filter((restaurant) => {
        return activeFilters.every((filterKey) => {
          const filter = filters.find((f) => f.key === filterKey);
          return filter ? filter.condition(restaurant) : true;
        });
      });
    }

    // Apply sorting
    switch (sortBy) {
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "deliveryTime":
        filtered.sort((a, b) => a.deliveryTime - b.deliveryTime);
        break;
      case "priceLow":
        filtered.sort((a, b) => a.priceRange - b.priceRange);
        break;
      case "priceHigh":
        filtered.sort((a, b) => b.priceRange - a.priceRange);
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        filtered.sort((a, b) => b.popularity - a.popularity);
        break;
    }

    return filtered;
  }, [search, activeFilters, sortBy, filters, restaurants]);

  const handleFilterToggle = useCallback((filterKey: string) => {
    setActiveFilters(prev =>
      prev.includes(filterKey)
        ? prev.filter(f => f !== filterKey)
        : [...prev, filterKey]
    );
  }, []);

  const handleClearFilters = useCallback(() => {
    setActiveFilters([]);
    setSearch("");
    searchInputRef.current?.focus();
  }, []);

  const handleWishlist = useCallback((id: string | number) => {
    setWishlistedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  }, []);

  const activeFilterObjects = useMemo(() => {
    return filters.filter(f => activeFilters.includes(f.key));
  }, [filters, activeFilters]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50/30">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-red-600">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse animation-delay-2000" />
        </div>
        
        <div className="relative z-10 pt-20 pb-12">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-8"
            >
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                <IoRestaurantOutline className="text-3xl text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Discover Amazing Food
                </h1>
                <p className="text-orange-100 text-lg">
                  Top restaurant chains in Janakpurdham
                </p>
              </div>
            </motion.div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative max-w-2xl"
            >
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search for restaurants, cuisines, or dishes..."
                className="w-full pl-12 pr-12 py-3 rounded-2xl border-2 border-transparent focus:border-orange-300 bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FaTimes />
                </button>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filters & Sorting Bar */}
      <div className="sticky top-20 bg-white z-40 shadow-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-4">
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 text-gray-700 shrink-0">
                <FaFilter className="text-orange-500 text-sm" />
                <span className="font-semibold text-sm">Filters:</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex gap-2 overflow-x-auto pb-2 -mb-2 scrollbar-hide">
                  {filters.map((filter) => (
                    <FilterButton
                      key={filter.key}
                      filter={filter}
                      isActive={activeFilters.includes(filter.key)}
                      onClick={() => handleFilterToggle(filter.key)}
                    />
                  ))}
                  {activeFilters.length > 0 && (
                    <button
                      onClick={handleClearFilters}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 transition-all duration-300 font-semibold shrink-0 text-sm"
                    >
                      <FaTimes className="text-sm" />
                      <span className="whitespace-nowrap">Clear All</span>
                    </button>
                  )}
                </div>
              </div>
              <div className="shrink-0">
                <SortSelect value={sortBy} onChange={setSortBy} />
              </div>
            </div>

            {/* Active Filters Tags */}
            <AnimatePresence>
              {activeFilterObjects.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-2 pt-3 border-t border-gray-100 flex-wrap"
                >
                  <span className="text-xs text-gray-500 shrink-0">
                    Active filters ({activeFilters.length}):
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeFilterObjects.map((filter) => (
                      <ActiveFilterTag
                        key={filter.key}
                        filter={filter}
                        onRemove={() => handleFilterToggle(filter.key)}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl md:text-3xl font-bold text-gray-900"
            >
              {filteredRestaurants.length} Restaurants Found
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-600 flex items-center gap-2 mt-1"
            >
              <FaShippingFast className="text-orange-500" />
              Delivering to your location in Janakpurdham
            </motion.p>
          </div>
          
          {/* Stats Cards */}
          <div className="flex gap-6">
            <StatsCard
              title="Total Restaurants"
              value={restaurants.length}
              icon={<FaUtensils />}
              color="from-orange-500 to-red-500"
            />
            <StatsCard
              title="Rated 4.0+"
              value={restaurants.filter((r: Restaurant) => r.rating >= 4.0).length}
              icon={<FaTrophy />}
              color="from-yellow-500 to-orange-500"
            />
          </div>
        </div>

        {/* Restaurant Grid */}
        {isLoading ? (
          <div className="flex flex-wrap justify-center gap-6">
            {[...Array(6)].map((_, i) => (
              <RestaurantCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredRestaurants.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap justify-center gap-6"
          >
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant._id}
                restaurant={{
                  ...restaurant,
                  id: restaurant._id,
                  time: `${restaurant.deliveryTime} min`,
                }}
                onWishlist={handleWishlist}
                isWishlisted={wishlistedIds.includes(restaurant._id)}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 bg-white rounded-3xl shadow-lg"
          >
            <div className="text-6xl mb-4">🍕</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No restaurants found</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              We couldn't find any restaurants matching your criteria. Try adjusting your search or filters.
            </p>
            <button
              onClick={handleClearFilters}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
            >
              Clear All Filters
            </button>
          </motion.div>
        )}

        {/* Load More Button */}
        {filteredRestaurants.length > 0 && filteredRestaurants.length < restaurants.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-12"
          >
            <button className="bg-white border-2 border-orange-500 text-orange-500 px-8 py-3 rounded-xl font-bold hover:bg-orange-50 hover:shadow-lg transition-all flex items-center gap-2 mx-auto">
              Load More Restaurants
              <FaArrowRight />
            </button>
          </motion.div>
        )}
      </div>

      {/* Promo Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-6 mt-8"
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-xl md:text-2xl font-bold mb-2 flex items-center justify-center gap-2">
            🚀 Free Delivery on First Order!
          </h3>
          <p className="text-sm text-green-100">
            Use code <span className="font-mono bg-white/20 px-2 py-1 rounded">WELCOME50</span> to get 50% off up to ₹100
          </p>
        </div>
      </motion.div>

      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
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
    </div>
  );
}