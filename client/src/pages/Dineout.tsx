import React, { useState } from "react";
import { 
  dineout_restaurants, 
  filterRestaurants, 
  sortRestaurants,
  getRestaurantStats 
} from '../data/dineout_restaurants';
import { 
  FaFilter, 
  FaStar, 
  FaTag, 
  FaLeaf, 
  FaMoneyBillWave, 
  FaTimes, 
  FaFire, 
  FaSearch,
  FaMapMarkerAlt,
  FaClock,
  FaPercent,
  FaParking,
  FaWifi,
  FaMusic,
  FaHeart
} from "react-icons/fa";
import { IoRestaurantOutline } from "react-icons/io5";
import { GiPartyPopper } from "react-icons/gi";
import { Restaurant } from '../data/dineout_restaurants';

// Restaurant Card Component
const RestaurantCard = ({ restaurant }: { restaurant: Restaurant }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-orange-200">
      <div className="relative">
        <img 
          src={restaurant.image} 
          alt={restaurant.name} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {restaurant.isTrending && (
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <FaFire className="text-xs" /> TRENDING
            </span>
          )}
          {restaurant.hasOffer && restaurant.offer && (
            <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <FaPercent className="text-xs" /> {restaurant.offer}
            </span>
          )}
        </div>
        <div className="absolute top-3 right-3">
          <button className="bg-white/90 hover:bg-white p-2 rounded-full shadow-md">
            <FaHeart className="text-gray-600 hover:text-red-500" />
          </button>
        </div>
        <div className="absolute bottom-3 left-3 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
          {restaurant.cuisines.slice(0, 2).join(" • ")}
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-gray-900">{restaurant.name}</h3>
          <div className="flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded">
            <FaStar className="text-xs" />
            <span className="font-bold">{restaurant.rating}</span>
            <span className="text-xs text-green-600">({restaurant.totalRatings})</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 flex items-center gap-1">
          <FaMapMarkerAlt className="text-gray-400" />
          {restaurant.area} • {restaurant.distance}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1 text-gray-700">
            <FaMoneyBillWave className="text-gray-400" />
            <span className="text-sm">₹{restaurant.priceRange} for two</span>
          </div>
          <div className="flex items-center gap-1 text-gray-700">
            <FaClock className="text-gray-400" />
            <span className="text-sm">{restaurant.diningTime}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {restaurant.facilities?.includes("parking") && (
            <span className="flex items-center gap-1 text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">
              <FaParking /> Parking
            </span>
          )}
          {restaurant.facilities?.includes("wifi") && (
            <span className="flex items-center gap-1 text-xs bg-purple-50 text-purple-600 px-2 py-1 rounded">
              <FaWifi /> WiFi
            </span>
          )}
          {restaurant.facilities?.includes("liveMusic") && (
            <span className="flex items-center gap-1 text-xs bg-yellow-50 text-yellow-600 px-2 py-1 rounded">
              <FaMusic /> Live Music
            </span>
          )}
          {restaurant.facilities?.includes("rooftop") && (
            <span className="flex items-center gap-1 text-xs bg-pink-50 text-pink-600 px-2 py-1 rounded">
              <GiPartyPopper /> Rooftop
            </span>
          )}
          {restaurant.isPureVeg && (
            <span className="flex items-center gap-1 text-xs bg-green-50 text-green-600 px-2 py-1 rounded">
              <FaLeaf /> Pure Veg
            </span>
          )}
        </div>
        
        <div className="flex gap-3">
          <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-colors">
            Book Table
          </button>
          <button className="flex-1 border border-orange-500 text-orange-500 hover:bg-orange-50 font-semibold py-3 rounded-lg transition-colors">
            View Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Dineout(): JSX.Element {
  const [search, setSearch] = useState<string>("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("relevance");
  const [selectedCuisine, setSelectedCuisine] = useState<string>("all");

  // Get restaurant statistics
  const stats = getRestaurantStats();

  // Filter options for Dineout - using actual counts from the data
  const filters = [
    { 
      key: "offers", 
      label: "Offers", 
      icon: <FaTag className="text-red-500" />, 
      count: dineout_restaurants.filter(r => r.hasOffer).length 
    },
    { 
      key: "rating", 
      label: "Rating 4.0+", 
      icon: <FaStar className="text-yellow-500" />, 
      count: dineout_restaurants.filter(r => r.rating >= 4.0).length 
    },
    { 
      key: "veg", 
      label: "Pure Veg", 
      icon: <FaLeaf className="text-green-500" />, 
      count: dineout_restaurants.filter(r => r.isPureVeg).length 
    },
    { 
      key: "lowPrice", 
      label: "Under ₹500", 
      icon: <FaMoneyBillWave className="text-green-500" />, 
      count: dineout_restaurants.filter(r => r.priceRange < 500).length 
    },
    { 
      key: "midPrice", 
      label: "₹500-1000", 
      icon: <FaMoneyBillWave className="text-orange-500" />, 
      count: dineout_restaurants.filter(r => r.priceRange >= 500 && r.priceRange <= 1000).length 
    },
    { 
      key: "trending", 
      label: "Trending", 
      icon: <FaFire className="text-orange-500" />, 
      count: dineout_restaurants.filter(r => r.isTrending).length 
    },
    { 
      key: "romantic", 
      label: "Romantic", 
      icon: <FaHeart className="text-pink-500" />, 
      count: dineout_restaurants.filter(r => r.isRomantic).length 
    },
    { 
      key: "family", 
      label: "Family", 
      icon: <FaStar className="text-blue-500" />, 
      count: dineout_restaurants.filter(r => r.isFamilyFriendly).length 
    },
    { 
      key: "rooftop", 
      label: "Rooftop", 
      icon: <GiPartyPopper className="text-purple-500" />, 
      count: dineout_restaurants.filter(r => r.facilities.includes("rooftop")).length 
    }
  ];

  // Cuisine types with actual counts
  const cuisines = [
    { id: "all", label: "All Cuisines" },
    { id: "north-indian", label: "North Indian", 
      count: dineout_restaurants.filter(r => r.cuisines.some(c => c.toLowerCase().includes("north indian"))).length },
    { id: "south-indian", label: "South Indian", 
      count: dineout_restaurants.filter(r => r.cuisines.some(c => c.toLowerCase().includes("south indian"))).length },
    { id: "chinese", label: "Chinese", 
      count: dineout_restaurants.filter(r => r.cuisines.some(c => c.toLowerCase().includes("chinese"))).length },
    { id: "italian", label: "Italian", 
      count: dineout_restaurants.filter(r => r.cuisines.some(c => c.toLowerCase().includes("italian"))).length },
    { id: "continental", label: "Continental", 
      count: dineout_restaurants.filter(r => r.cuisines.some(c => c.toLowerCase().includes("continental"))).length },
    { id: "mexican", label: "Mexican", 
      count: dineout_restaurants.filter(r => r.cuisines.some(c => c.toLowerCase().includes("mexican"))).length },
    { id: "cafe", label: "Cafe", 
      count: dineout_restaurants.filter(r => r.cuisines.some(c => c.toLowerCase().includes("cafe"))).length },
    { id: "asian", label: "Asian", 
      count: dineout_restaurants.filter(r => r.cuisines.some(c => c.toLowerCase().includes("asian"))).length },
    { id: "desserts", label: "Desserts", 
      count: dineout_restaurants.filter(r => r.cuisines.some(c => c.toLowerCase().includes("desserts"))).length }
  ];

  const applyFiltersAndSort = (data: Restaurant[]) => {
    let filtered = [...data];

    // Search filter
    if (search) {
      filtered = filtered.filter(
        (r) =>
          r.name.toLowerCase().includes(search.toLowerCase()) ||
          r.cuisines.join(", ").toLowerCase().includes(search.toLowerCase()) ||
          r.area.toLowerCase().includes(search.toLowerCase()) ||
          r.description?.toLowerCase().includes(search.toLowerCase()) ||
          r.popularFor?.some(item => item.toLowerCase().includes(search.toLowerCase()))
      );
    }

    // Cuisine filter
    if (selectedCuisine !== "all") {
      filtered = filtered.filter((r) => 
        r.cuisines.some((cuisine: string) => 
          cuisine.toLowerCase().includes(selectedCuisine.toLowerCase().replace("-", " "))
        )
      );
    }

    // Active filters
    if (activeFilters.length > 0) {
      filtered = filtered.filter((restaurant) => {
        return activeFilters.every((filterKey) => {
          switch (filterKey) {
            case "offers":
              return restaurant.hasOffer;
            case "rating":
              return restaurant.rating >= 4.0;
            case "veg":
              return restaurant.isPureVeg;
            case "lowPrice":
              return restaurant.priceRange < 500;
            case "midPrice":
              return restaurant.priceRange >= 500 && restaurant.priceRange <= 1000;
            case "trending":
              return restaurant.isTrending;
            case "romantic":
              return restaurant.isRomantic;
            case "family":
              return restaurant.isFamilyFriendly;
            case "rooftop":
              return restaurant.facilities.includes("rooftop");
            default:
              return true;
          }
        });
      });
    }

    // Sorting - using imported sortRestaurants function
    return sortRestaurants(filtered, sortBy);
  };

  const filteredRestaurants = applyFiltersAndSort(dineout_restaurants);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 py-12 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 relative">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                  <IoRestaurantOutline className="text-3xl text-white" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Dineout</h1>
                  <p className="text-orange-100 text-lg">Discover the best restaurants for dining out</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-white">
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt />
                  <span>Janakpurdham</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaClock />
                  <span>Open Now</span>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-center text-white">
                <div className="text-3xl font-bold mb-2">{dineout_restaurants.length}+</div>
                <div className="text-orange-100">Premium Restaurants</div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-3xl">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for restaurants, cuisines, or locations..."
              className="w-full pl-12 pr-10 py-4 rounded-2xl border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-gray-200 focus:outline-none focus:border-white/50"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute inset-y-0 right-0 pr-4 flex items-center"
              >
                <FaTimes className="text-white hover:text-gray-200" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Cuisine Filter Bar */}
      <div className="sticky top-0 bg-white z-40 shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex gap-2 overflow-x-auto pb-2 -mb-2 scrollbar-hide">
            {cuisines.map((cuisine) => (
              <button
                key={cuisine.id}
                onClick={() => setSelectedCuisine(cuisine.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all duration-300 font-medium shrink-0 ${
                  selectedCuisine === cuisine.id
                    ? "bg-orange-500 border-orange-500 text-white"
                    : "bg-white border-gray-200 text-gray-700 hover:border-orange-300"
                }`}
              >
                <span>{cuisine.label}</span>
                {cuisine.count && cuisine.id !== "all" && (
                  <span className={`text-xs px-1.5 py-0.5 rounded ${
                    selectedCuisine === cuisine.id
                      ? "bg-orange-400 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}>
                    {cuisine.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Filters & Sorting */}
      <div className="sticky top-[80px] bg-white z-30 shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-2">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
            <div className="flex-1 min-w-0">
              <div className="flex gap-2 overflow-x-auto pb-2 -mb-2 scrollbar-hide">
                {filters.map((filter) => (
                  <button
                    key={filter.key}
                    onClick={() => {
                      if (activeFilters.includes(filter.key)) {
                        setActiveFilters(activeFilters.filter((f) => f !== filter.key));
                      } else {
                        setActiveFilters([...activeFilters, filter.key]);
                      }
                    }}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-300 font-medium shrink-0 text-sm ${
                      activeFilters.includes(filter.key)
                        ? "bg-orange-500 border-orange-500 text-white"
                        : "bg-white border-gray-200 text-gray-700 hover:border-orange-300"
                    }`}
                  >
                    {filter.icon}
                    <span>{filter.label}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded ${
                      activeFilters.includes(filter.key)
                        ? "bg-orange-400 text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}>
                      {filter.count}
                    </span>
                  </button>
                ))}

                {activeFilters.length > 0 && (
                  <button
                    onClick={() => setActiveFilters([])}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 transition-all font-medium shrink-0 text-sm"
                  >
                    <FaTimes />
                    Clear All
                  </button>
                )}
              </div>
            </div>

            <div className="shrink-0">
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-700">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-1.5 border border-gray-300 rounded-lg bg-white focus:border-orange-500 focus:outline-none font-medium min-w-[160px]"
                >
                  <option value="popularity">Popularity</option>
                  <option value="rating">Rating</option>
                  <option value="priceLow">Price: Low to High</option>
                  <option value="priceHigh">Price: High to Low</option>
                  <option value="name">Name (A-Z)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Active Filters Display */}
          {activeFilters.length > 0 && (
            <div className="flex items-center gap-2 pt-4 mt-4 border-t border-gray-200 flex-wrap">
              <span className="text-sm text-gray-600">Active filters:</span>
              <div className="flex flex-wrap gap-2">
                {activeFilters.map((filterKey) => {
                  const filter = filters.find((f) => f.key === filterKey);
                  return (
                    <div key={filterKey} className="flex items-center gap-2 bg-orange-100 text-orange-700 px-3 py-1.5 rounded-full text-sm">
                      {filter?.icon}
                      <span className="font-medium">{filter?.label}</span>
                      <button 
                        onClick={() => setActiveFilters(activeFilters.filter((f) => f !== filterKey))}
                        className="hover:bg-orange-200 rounded-full p-1 transition-colors"
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

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {filteredRestaurants.length} Restaurants Found
            </h2>
            <p className="text-gray-600 mt-1">
              Best dining experiences in Janakpurdham
            </p>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <div className="text-center">
              <div className="font-bold text-2xl text-orange-500">{stats.total}</div>
              <div className="text-gray-600 text-sm">Total Restaurants</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-2xl text-green-500">{stats.averageRating}+</div>
              <div className="text-gray-600 text-sm">Avg Rating</div>
            </div>
          </div>
        </div>

        {/* Restaurants Grid */}
        {filteredRestaurants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl shadow-lg">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No restaurants found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search or filters</p>
            <button 
              onClick={() => { 
                setSearch(""); 
                setActiveFilters([]); 
                setSelectedCuisine("all"); 
              }} 
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-bold hover:from-orange-600 hover:to-red-600 transition-all"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Load More */}
        {filteredRestaurants.length > 0 && filteredRestaurants.length < dineout_restaurants.length && (
          <div className="text-center mt-12">
            <button className="bg-white border-2 border-orange-500 text-orange-500 px-8 py-3 rounded-xl font-bold hover:bg-orange-50 transition-all">
              Load More Restaurants
            </button>
          </div>
        )}

        {/* Promo Banner */}
        <div className="mt-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl overflow-hidden">
          <div className="p-8 md:p-12 flex flex-col md:flex-row items-center justify-between">
            <div className="text-white mb-6 md:mb-0">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">🎉 Special Weekend Offer!</h3>
              <p className="text-blue-100">Get 25% off on all premium restaurants. Book now!</p>
            </div>
            <button className="bg-white text-blue-600 hover:bg-blue-50 font-bold px-6 py-3 rounded-lg transition-colors">
              Explore Offers
            </button>
          </div>
        </div>
      </div>

      <style>{`
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