import React, { useState, useEffect } from "react";
import { getRestaurants } from '../services/restaurantService';
import { FaStar, FaTag, FaFire, FaSearch } from "react-icons/fa";
import { IoRestaurantOutline } from "react-icons/io5";

interface Restaurant {
  _id: string;
  id: string;
  name: string;
  image: string;
  cuisines: string[];
  rating: number;
  deliveryTime: string;
  priceRange: number;
  hasOffer: boolean;
  offer?: string;
  isVeg: boolean;
  isBestseller: boolean;
}

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
          {restaurant.isBestseller && (
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <FaFire className="text-xs" /> TRENDING
            </span>
          )}
          {restaurant.hasOffer && restaurant.offer && (
            <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <FaTag className="text-xs" /> {restaurant.offer}
            </span>
          )}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1">{restaurant.name}</h3>
        <p className="text-gray-500 text-sm mb-2">{restaurant.cuisines.join(", ")}</p>
        <div className="flex items-center gap-2 text-sm">
          <span className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded">
            <FaStar className="text-yellow-500" />
            {restaurant.rating}
          </span>
          <span className="text-gray-500">{restaurant.deliveryTime}</span>
        </div>
      </div>
    </div>
  );
};

export default function Dineout(): JSX.Element {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [search, setSearch] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const data = await getRestaurants();
        setRestaurants(data.map((r: any) => ({ ...r, id: r._id })));
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
        setIsLoading(false);
      }
    };
    fetchRestaurants();
  }, []);

  const filteredRestaurants = restaurants.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.cuisines.some((c) => c.toLowerCase().includes(search.toLowerCase()))
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <IoRestaurantOutline className="text-3xl text-orange-500" />
          <h1 className="text-3xl font-bold text-gray-800">Dineout</h1>
        </div>

        <div className="relative mb-6">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search restaurants..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-orange-500"
          />
        </div>

        <div className="flex flex-wrap gap-6">
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant._id} restaurant={restaurant} />
          ))}
        </div>
      </div>
    </div>
  );
}