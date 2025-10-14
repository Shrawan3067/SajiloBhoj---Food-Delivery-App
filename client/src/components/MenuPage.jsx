// src/pages/MenuPage.jsx
import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import paneerbutter from "../assets/paneer_butter.png";
import { CartContext } from "../context/CartContext";
import { 
  FaShoppingCart, 
  FaStar, 
  FaFire, 
  FaTag, 
  FaFilter, 
  FaSort,
  FaTimes,
  FaSearch
} from "react-icons/fa";
import { IoFastFood } from "react-icons/io5";
import { IoLeaf } from "react-icons/io5";

// Dummy menu data (replace with API later)
const menuData = {
  1: [
    {
      id: 1,
      name: "Paneer Butter Masala",
      price: 180,
      veg: true,
      bestseller: true,
      offer: true,
      rating: 4.5,
      description: "Creamy paneer in rich tomato butter sauce",
      preparationTime: "25 min",
      calories: "320 cal"
    },
    {
      id: 2,
      name: "Chicken Curry",
      price: 220,
      veg: false,
      bestseller: false,
      offer: false,
      rating: 4.2,
      description: "Spicy chicken cooked in traditional spices",
      preparationTime: "30 min",
      calories: "280 cal"
    },
    {
      id: 3,
      name: "Veg Fried Rice",
      price: 150,
      veg: true,
      bestseller: false,
      offer: false,
      rating: 4.0,
      description: "Fresh vegetables stir-fried with basmati rice",
      preparationTime: "20 min",
      calories: "250 cal"
    },
    {
      id: 4,
      name: "Mutton Biryani",
      price: 280,
      veg: false,
      bestseller: true,
      offer: true,
      rating: 4.8,
      description: "Aromatic basmati rice with tender mutton pieces",
      preparationTime: "40 min",
      calories: "380 cal"
    },
  ],
  2: [
    {
      id: 1,
      name: "Masala Dosa",
      price: 120,
      veg: true,
      bestseller: true,
      offer: false,
      rating: 4.6,
      description: "Crispy rice crepe filled with spiced potatoes",
      preparationTime: "15 min",
      calories: "180 cal"
    },
    {
      id: 2,
      name: "Idli Sambhar",
      price: 100,
      veg: true,
      bestseller: false,
      offer: true,
      rating: 4.3,
      description: "Soft rice cakes served with lentil soup",
      preparationTime: "10 min",
      calories: "150 cal"
    },
  ],
  3: [
    {
      id: 1,
      name: "Cheese Pizza",
      price: 250,
      veg: true,
      bestseller: true,
      offer: true,
      rating: 4.7,
      description: "Classic pizza with mozzarella cheese and tomato sauce",
      preparationTime: "25 min",
      calories: "300 cal"
    },
    {
      id: 2,
      name: "Pepperoni Pizza",
      price: 350,
      veg: false,
      bestseller: false,
      offer: false,
      rating: 4.4,
      description: "Spicy pepperoni on cheesy pizza base",
      preparationTime: "25 min",
      calories: "350 cal"
    },
  ],
};

const restaurantInfo = {
  1: {
    name: "Spice Garden",
    rating: 4.5,
    deliveryTime: "25-30 min",
    cuisine: "North Indian, Mughlai",
    image: paneerbutter
  },
  2: {
    name: "South Delights",
    rating: 4.3,
    deliveryTime: "20-25 min",
    cuisine: "South Indian, Vegetarian",
    image: paneerbutter
  },
  3: {
    name: "Pizza Palace",
    rating: 4.6,
    deliveryTime: "30-35 min",
    cuisine: "Italian, Fast Food",
    image: paneerbutter
  }
};

export default function MenuPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cart } = useContext(CartContext);
  const [activeFilters, setActiveFilters] = useState([]);
  const [sort, setSort] = useState("relevance");
  const [quantity, setQuantity] = useState({});
  const [search, setSearch] = useState("");

  const restaurant = restaurantInfo[id] || { name: `Restaurant #${id}` };
  let menuItems = menuData[id] || [];

  // Define filters with counts
  const filters = [
    { key: "all", label: "All Items", icon: <IoFastFood className="text-orange-500" />, count: menuItems.length },
    { key: "veg", label: "Pure Veg", icon: <IoLeaf className="text-green-500" />, count: menuItems.filter(item => item.veg).length },
    { key: "nonveg", label: "Non-Veg", icon: "🍖", count: menuItems.filter(item => !item.veg).length },
    { key: "offers", label: "Offers", icon: <FaTag className="text-red-500" />, count: menuItems.filter(item => item.offer).length },
    { key: "bestseller", label: "Bestsellers", icon: <FaFire className="text-orange-500" />, count: menuItems.filter(item => item.bestseller).length },
    { key: "rating", label: "Rating 4.0+", icon: <FaStar className="text-yellow-500" />, count: menuItems.filter(item => item.rating >= 4.0).length }
  ];

  // Enhanced filtering with search and multiple active filters
  const filteredItems = menuItems.filter((item) => {
    // Search filter - check if search term exists in name or description
    if (search) {
      const searchTerm = search.toLowerCase();
      const matchesSearch = 
        item.name.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm);
      
      if (!matchesSearch) return false;
    }

    // If no filters active, show all items that match search
    if (activeFilters.length === 0 || activeFilters.includes("all")) {
      return true;
    }

    // Apply AND logic for multiple filters
    return activeFilters.every(filterKey => {
      switch (filterKey) {
        case "veg": return item.veg;
        case "nonveg": return !item.veg;
        case "offers": return item.offer;
        case "bestseller": return item.bestseller;
        case "rating": return item.rating >= 4.0;
        default: return true;
      }
    });
  });

  // Enhanced sorting
  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sort) {
      case "lowToHigh": return a.price - b.price;
      case "highToLow": return b.price - a.price;
      case "rating": return b.rating - a.rating;
      case "bestseller": return (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0);
      default: return 0;
    }
  });

  const totalItems = cart?.reduce((total, item) => total + (item.qty || 1), 0) || 0;
  const cartTotal = cart?.reduce((total, item) => total + (item.price * (item.qty || 1)), 0) || 0;

  const handleAddToCart = (item) => {
    addToCart({ ...item, restaurantId: id });
    setQuantity(prev => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + 1
    }));
  };

  const FilterButton = ({ filter, mobile = false }) => (
    <button
      onClick={() => {
        if (filter.key === "all") {
          setActiveFilters([]);
        } else {
          // Toggle filter in activeFilters array
          if (activeFilters.includes(filter.key)) {
            setActiveFilters(activeFilters.filter(f => f !== filter.key));
          } else {
            setActiveFilters([...activeFilters.filter(f => f !== "all"), filter.key]);
          }
        }
      }}
      className={`flex items-center gap-1 px-3 py-2 rounded-lg border transition-all duration-300 font-semibold shrink-0 text-sm ${
        activeFilters.includes(filter.key) 
          ? "bg-orange-500 border-orange-500 text-white" 
          : "bg-white border-gray-200 text-gray-700 hover:border-orange-300"
      } ${mobile ? "text-xs px-2 py-1.5" : ""}`}
    >
      <span className="text-sm">{filter.icon}</span>
      <span className="whitespace-nowrap">{filter.label}</span>
      {filter.count > 0 && (
        <span className={`px-1.5 py-0.5 rounded text-xs ${
          activeFilters.includes(filter.key) 
            ? "bg-orange-400 text-white" 
            : "bg-orange-100 text-orange-600"
        }`}>
          {filter.count}
        </span>
      )}
    </button>
  );

  // Clear all filters and search
  const clearAllFilters = () => {
    setActiveFilters([]);
    setSearch("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50">
      {/* Restaurant Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <img 
              src={restaurant.image} 
              alt={restaurant.name}
              className="w-24 h-24 md:w-32 md:h-32 rounded-2xl object-cover shadow-lg"
            />
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {restaurant.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-black mb-3">
                <span className="flex items-center gap-1 bg-green-100 px-3 py-1 rounded-full">
                  <FaStar className="text-yellow-500" />
                  <span className="font-semibold">{restaurant.rating}</span>
                </span>
                <span className="flex items-center gap-1 text-white/90">
                  <IoFastFood />
                  {restaurant.deliveryTime}
                </span>
                <span className="text-white/90">{restaurant.cuisine}</span>
              </div>
              <p className="text-white/90">Free delivery above ₹299 • 100+ ratings</p>
            </div>
          </div>
        </div>
              {/* Search Bar */}
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="relative max-w-2xl">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for dishes, ingredients, or descriptions..."
              className="w-full pl-12 pr-10 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-orange-50 placeholder-gray-500 focus:outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {(search || activeFilters.length > 0) && (
              <button
                onClick={clearAllFilters}
                className="absolute inset-y-0 right-0 pr-4 flex items-center"
              >
                <FaTimes className="text-gray-400 hover:text-gray-600 transition-colors" />
              </button>
            )}
          </div>
        </div>
      </div>



      {/* Filters & Sorting Bar - Multiple Selection */}
      <div className="sticky top-[80px] bg-white z-40 shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          {/* Compact Layout */}
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
                    <FilterButton key={filter.key} filter={filter} mobile={true} />
                  ))}
                  
                  {/* Clear All Button */}
                  {(activeFilters.length > 0 || search) && (
                    <button
                      onClick={clearAllFilters}
                      className="flex items-center gap-1 px-3 py-2 rounded-lg border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 transition-all duration-300 font-semibold shrink-0 text-sm"
                    >
                      <FaTimes className="text-sm" />
                      <span className="whitespace-nowrap">Clear All</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Sorting - Compact */}
              <div className="shrink-0">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded-lg bg-white focus:border-orange-500 focus:outline-none font-semibold text-sm min-w-[120px]"
                >
                  <option value="relevance">Relevance</option>
                  <option value="rating">Rating</option>
                  <option value="lowToHigh">Price: Low</option>
                  <option value="highToLow">Price: High</option>
                  <option value="bestseller">Bestsellers</option>
                </select>
              </div>
            </div>

            {/* Active Filters & Search Indicator */}
            {(activeFilters.length > 0 || search) && (
              <div className="flex items-center gap-2 pt-2 border-t border-gray-200 flex-wrap">
                <span className="text-xs text-gray-600 shrink-0">
                  Active filters:
                </span>
                <div className="flex flex-wrap gap-1">
                  {/* Search term indicator */}
                  {search && (
                    <div className="flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs">
                      <FaSearch className="text-xs" />
                      <span className="font-semibold">"{search}"</span>
                      <button
                        onClick={() => setSearch("")}
                        className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                      >
                        <FaTimes className="text-xs" />
                      </button>
                    </div>
                  )}
                  
                  {/* Filter indicators */}
                  {activeFilters.map(filterKey => {
                    const filter = filters.find(f => f.key === filterKey);
                    return filter ? (
                      <div 
                        key={filterKey}
                        className="flex items-center gap-1 bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full text-xs"
                      >
                        {filter.icon}
                        <span className="font-semibold">{filter.label}</span>
                        <button
                          onClick={() => setActiveFilters(activeFilters.filter(f => f !== filterKey))}
                          className="hover:bg-orange-200 rounded-full p-0.5 transition-colors"
                        >
                          <FaTimes className="text-xs" />
                        </button>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Menu Items Grid */}
      <div className="max-w-6xl mx-auto pb-28 px-4 py-8">
        {/* Results Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {sortedItems.length} {search ? 'Search Results' : 'Dishes Available'}
            </h2>
            <p className="text-gray-600 flex items-center gap-2 mt-1">
              <IoFastFood className="text-orange-500" />
              {restaurant.name} • {restaurant.deliveryTime} delivery
            </p>
          </div>
          
          {/* Quick Stats */}
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <div className="text-center">
              <div className="font-bold text-2xl text-orange-500">{menuItems.length}</div>
              <div>Total Dishes</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-2xl text-green-500">
                {menuItems.filter(item => item.veg).length}
              </div>
              <div>Veg Options</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden group"
            >
              {/* Item Image */}
              <div className="relative overflow-hidden">
                <img
                  src={paneerbutter}
                  alt={item.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {item.bestseller && (
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                      <FaFire /> Bestseller
                    </span>
                  )}
                  {item.offer && (
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      💸 Offer
                    </span>
                  )}
                </div>

                {/* Veg/Non-Veg Indicator */}
                <div className={`absolute top-3 right-3 w-6 h-6 rounded-full border-2 ${
                  item.veg ? "border-green-500 bg-green-500" : "border-red-500 bg-red-500"
                }`}>
                  <div className={`w-2 h-2 rounded-full bg-white m-1 ${
                    item.veg ? "bg-green-500" : "bg-red-500"
                  }`}></div>
                </div>
              </div>

              {/* Item Details */}
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{item.name}</h3>
                  <span className="text-lg font-bold text-orange-600">₹{item.price}</span>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <span className="flex items-center gap-1 bg-yellow-100 px-2 py-1 rounded-full">
                    <FaStar className="text-yellow-500 text-sm" />
                    <span className="text-sm font-semibold">{item.rating}</span>
                  </span>
                  <span className="text-sm text-gray-500">{item.preparationTime}</span>
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm text-gray-500">{item.calories}</span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>

                {/* Add to Cart Button */}
                <button
                  onClick={() => handleAddToCart(item)}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-bold hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <FaShoppingCart />
                  ADD TO CART
                  {quantity[item.id] > 0 && (
                    <span className="bg-white text-orange-600 px-2 py-1 rounded-full text-xs">
                      {quantity[item.id]}
                    </span>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {sortedItems.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl shadow-lg">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">
              {search ? 'No dishes found' : 'No dishes match your filters'}
            </h3>
            <p className="text-gray-500 mb-6">
              {search 
                ? `No dishes found for "${search}". Try different keywords.`
                : 'Try adjusting your filters to see more options'
              }
            </p>
            <button
              onClick={clearAllFilters}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-bold hover:from-orange-600 hover:to-red-600 transition-all"
            >
              {search ? 'Clear Search' : 'Clear Filters'}
            </button>
          </div>
        )}
      </div>

      {/* Floating Cart Button */}
      {totalItems > 0 && (
        <div className="fixed md:bottom-6 bottom-16 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
          <button
            onClick={() => navigate("/cart")}
            className="bg-gradient-to-r w-[300px] from-green-500 to-emerald-600 text-white md:px-6 px-4 py-2 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 flex items-center gap-4 font-bold text-lg"
          >
            <div className="relative">
              <FaShoppingCart className="text-2xl" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                {totalItems}
              </span>
            </div>
            <div className="text-left">
              <div className="text-sm font-normal">View Cart</div>
              <div>₹{cartTotal}</div>
            </div>
            <div className="bg-white text-[14px] text-green-600 px-4 py-2 rounded-xl font-bold">
              CHECKOUT →
            </div>
          </button>
        </div>
      )}

      {/* Custom scrollbar hide styles */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-1 { overflow: hidden; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; }
        .line-clamp-2 { overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
      `}</style>
    </div>
  );
}