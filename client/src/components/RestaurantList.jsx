import React, { useState } from "react";
import { restaurants } from "../data/restaurants";
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
  FaShippingFast
} from "react-icons/fa";

export default function RestaurantList() {
  const [search, setSearch] = useState("");
  const [activeFilters, setActiveFilters] = useState([]); // Changed to array
  const [sortBy, setSortBy] = useState("relevance");

  const filters = [
    { key: "offers", label: "Offers", icon: <FaTag className="text-red-500" />, count: restaurants.filter(r => r.hasOffer).length },
    { key: "rating", label: "Rating 4.0+", icon: <FaStar className="text-yellow-500" />, count: restaurants.filter(r => r.rating >= 4.0).length },
    { key: "veg", label: "Pure Veg", icon: <FaLeaf className="text-green-500" />, count: restaurants.filter(r => r.isVeg).length },
    { key: "lowPrice", label: "Under ₹300", icon: <FaMoneyBillWave className="text-green-500" />, count: restaurants.filter(r => r.priceRange < 300).length },
    { key: "midPrice", label: "₹300-600", icon: <FaMoneyBillWave className="text-orange-500" />, count: restaurants.filter(r => r.priceRange >= 300 && r.priceRange <= 600).length },
    { key: "bestseller", label: "Bestsellers", icon: <FaFire className="text-orange-500" />, count: restaurants.filter(r => r.isBestseller).length }
  ];

  const applyFiltersAndSort = (data) => {
    let filtered = data;

    // Search filter
    if (search) {
      filtered = filtered.filter(
        (r) =>
          r.name.toLowerCase().includes(search.toLowerCase()) ||
          r.cuisines.join(", ").toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply multiple active filters (AND logic)
    if (activeFilters.length > 0) {
      filtered = filtered.filter(restaurant => {
        return activeFilters.every(filterKey => {
          switch (filterKey) {
            case "offers":
              return restaurant.hasOffer;
            case "rating":
              return restaurant.rating >= 4.0;
            case "veg":
              return restaurant.isVeg;
            case "lowPrice":
              return restaurant.priceRange < 300;
            case "midPrice":
              return restaurant.priceRange >= 300 && restaurant.priceRange <= 600;
            case "bestseller":
              return restaurant.isBestseller;
            default:
              return true;
          }
        });
      });
    }

    // Apply sorting (same as before)
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
  };

  const filteredRestaurants = applyFiltersAndSort(restaurants);

  const FilterButton = ({ filter }) => (
    <button
      onClick={() => setActiveFilter(activeFilter === filter.key ? "" : filter.key)}
      className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all duration-300 font-semibold shrink-0 ${
        activeFilter === filter.key 
          ? "bg-orange-500 border-orange-500 text-white shadow-lg scale-105" 
          : "bg-white border-gray-200 text-gray-700 hover:border-orange-300 hover:shadow-md"
      }`}
    >
      {filter.icon}
      {filter.label}
      {filter.count > 0 && (
        <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs">
          {filter.count}
        </span>
      )}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
              <IoRestaurantOutline className="text-3xl" />
            </div>
            <div>
              <h1 className="md:text-4xl text-[22px] font-bold mb-2">Discover Amazing Food</h1>
              <p className="text-orange-100 md:text-lg text-[18px]">Top restaurant chains in Janakpurdham</p>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaSearch className="text-black z-10" />
            </div>
            <input
              type="text"
              placeholder="Search for restaurants, cuisines, or dishes..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-0 focus:ring-4 focus:ring-white/20 bg-orange-100 backdrop-blur-sm placeholder-gray-500 text-black focus:outline-none text-lg"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute inset-y-0 right-0 pr-4 flex items-center"
              >
                <FaTimes className="text-black hover:text-gray-500 transition-colors" />
              </button>
            )}
          </div>
        </div>
      </div>

{/* Filters & Sorting Bar - Multiple Selection */}
<div className="sticky top-[70px] bg-white z-40 shadow-sm border-b">
  <div className="max-w-7xl mx-auto px-4 py-3">
    {/* Compact Layout for very small screens */}
    <div className="flex flex-col gap-3">
      {/* Main Row */}
      <div className="flex items-center gap-3 w-full">
        {/* Filters Label */}
        <div className="flex items-center gap-2 text-gray-700 shrink-0">
          <FaFilter className="text-orange-500 text-sm" />
          <span className="font-semibold text-sm hidden xs:inline">Filters:</span>
        </div>
        
        {/* Scrollable Filters */}
        <div className="flex-1 min-w-0">
          <div className="flex gap-2 overflow-x-auto pb-2 -mb-2 scrollbar-hide">
            {filters.map(filter => (
              <button
                key={filter.key}
                onClick={() => {
                  // Toggle filter in activeFilters array
                  if (activeFilters.includes(filter.key)) {
                    setActiveFilters(activeFilters.filter(f => f !== filter.key));
                  } else {
                    setActiveFilters([...activeFilters, filter.key]);
                  }
                }}
                className={`flex items-center gap-1 px-2 py-1.5 rounded-lg border transition-all duration-300 font-semibold shrink-0 text-xs ${
                  activeFilters.includes(filter.key) 
                    ? "bg-orange-500 border-orange-500 text-white" 
                    : "bg-white border-gray-200 text-gray-700 hover:border-orange-300"
                }`}
              >
                <span className="text-xs">{filter.icon}</span>
                <span className="whitespace-nowrap">{filter.label}</span>
                {filter.count > 0 && (
                  <span className={`px-1 rounded text-xs ${
                    activeFilters.includes(filter.key) 
                      ? "bg-orange-400 text-white" 
                      : "bg-orange-100 text-orange-600"
                  }`}>
                    {filter.count}
                  </span>
                )}
              </button>
            ))}
            
            {/* Clear All Button */}
            {activeFilters.length > 0 && (
              <button
                onClick={() => setActiveFilters([])}
                className="flex items-center gap-1 px-2 py-1.5 rounded-lg border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 transition-all duration-300 font-semibold shrink-0 text-xs"
              >
                <FaTimes className="text-xs" />
                <span className="whitespace-nowrap">Clear All</span>
              </button>
            )}
          </div>
        </div>

        {/* Sorting - Compact */}
        <div className="shrink-0">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-2 py-1.5 border border-gray-200 rounded-lg bg-white focus:border-orange-500 focus:outline-none font-semibold text-xs min-w-[120px]"
          >
            <option value="relevance">Relevance</option>
            <option value="rating">Rating</option>
            <option value="deliveryTime">Delivery</option>
            <option value="priceLow">Price: Low</option>
            <option value="priceHigh">Price: High</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>

      {/* Active Filters Indicator */}
      {activeFilters.length > 0 && (
        <div className="flex items-center gap-2 pt-2 border-t border-gray-200 flex-wrap">
          <span className="text-xs text-gray-600 shrink-0">
            Active filters ({activeFilters.length}):
          </span>
          <div className="flex flex-wrap gap-1">
            {activeFilters.map(filterKey => {
              const filter = filters.find(f => f.key === filterKey);
              return (
                <div 
                  key={filterKey}
                  className="flex items-center gap-1 bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full text-xs"
                >
                  {filter?.icon}
                  <span className="font-semibold">{filter?.label}</span>
                  <button
                    onClick={() => setActiveFilters(activeFilters.filter(f => f !== filterKey))}
                    className="hover:bg-orange-200 rounded-full p-0.5 transition-colors"
                  >
                    <FaTimes className="text-xs" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  </div>
</div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Results Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {filteredRestaurants.length} Restaurants Found
            </h2>
            <p className="text-gray-600 flex items-center gap-2 mt-1">
              <FaShippingFast className="text-orange-500" />
              Delivering to your location in Janakpurdham
            </p>
          </div>
          
          {/* Quick Stats */}
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <div className="text-center">
              <div className="font-bold text-2xl text-orange-500">{restaurants.length}</div>
              <div>Total Restaurants</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-2xl text-green-500">
                {restaurants.filter(r => r.rating >= 4.0).length}
              </div>
              <div>Rated 4.0+</div>
            </div>
          </div>
        </div>

        {/* Restaurant Grid */}
        {filteredRestaurants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16 bg-white rounded-3xl shadow-lg">
            <div className="text-6xl mb-4">🍕</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No restaurants found</h3>
            <p className="text-gray-500 mb-6">
              Try adjusting your search or filters to find more options
            </p>
            <button
              onClick={() => { setSearch(""); setActiveFilter(""); }}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-bold hover:from-orange-600 hover:to-red-600 transition-all"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Load More Button (for pagination) */}
        {filteredRestaurants.length > 0 && filteredRestaurants.length < restaurants.length && (
          <div className="text-center mt-12">
            <button className="bg-white border-2 border-orange-500 text-orange-500 px-8 py-3 rounded-xl font-bold hover:bg-orange-50 transition-all">
              Load More Restaurants
            </button>
          </div>
        )}
      </div>

      {/* Promotional Banner */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 mt-4 md:py-8 md:mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="md:text-2xl text-xl font-bold mb-2">🚀 Free Delivery on First Order!</h3>
          <p className="text-[14px] text-green-100">Use code WELCOME50 to get 50% off up to ₹100</p>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}