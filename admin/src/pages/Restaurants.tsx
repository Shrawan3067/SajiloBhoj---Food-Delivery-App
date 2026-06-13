import React, { useEffect, useState } from 'react';
import { adminService } from '../services/adminService';
import type { Restaurant } from '../types';
import { FaEdit, FaTrash, FaPlus, FaStar, FaRupeeSign, FaUtensils } from 'react-icons/fa';
import AddRestaurantModal from '../components/AddRestaurantModal';

const Restaurants: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const data = await adminService.getAllRestaurants();
        setRestaurants(data);
        setError(null);
      } catch (error) {
        console.error('Failed to fetch restaurants:', error);
        const err = error as { response?: { data?: { message?: string } } };
        setError(err.response?.data?.message || 'Failed to fetch restaurants');
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this restaurant?')) {
      try {
        await adminService.deleteRestaurant(id);
        setRestaurants(restaurants.filter((r) => r._id !== id));
      } catch (error) {
        console.error('Failed to delete restaurant:', error);
        alert('Failed to delete restaurant');
      }
    }
  };

  const handleCreateRestaurant = async (restaurantData: unknown) => {
    try {
      await adminService.createRestaurant(restaurantData);
      const data = await adminService.getAllRestaurants();
      setRestaurants(data);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('Failed to create restaurant:', error);
      alert('Failed to create restaurant');
    }
  };

  const filteredRestaurants = restaurants.filter(
    (r) =>
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.cuisines.some((c) => c.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mb-4"></div>
        <p className="text-gray-600">Loading restaurants...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-red-600 text-lg mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Restaurants</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center space-x-2"
        >
          <FaPlus />
          <span>Add Restaurant</span>
        </button>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search restaurants..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRestaurants.map((restaurant) => (
          <div key={restaurant._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="relative bg-gray-200 h-48">
              {restaurant.image ? (
                <img
                  src={`/${restaurant.image}`}
                  alt={restaurant.name}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100%25" height="100%25" viewBox="0 0 100 100"%3E%3Crect fill="%23e5e7eb" width="100" height="100"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" fill="%239ca3af"%3ENo Image%3C/text%3E%3C/svg%3E';
                  }}
                />
              ) : (
                <div className="w-full h-48 flex items-center justify-center bg-gray-200">
                  <FaUtensils className="text-gray-400 text-4xl" />
                </div>
              )}
              {restaurant.hasOffer && (
                <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {restaurant.offer}
                </div>
              )}
              {restaurant.isBestseller && (
                <div className="absolute top-2 left-2 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Bestseller
                </div>
              )}
            </div>

            <div className="p-4">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{restaurant.name}</h3>
              
              <div className="flex items-center space-x-2 mb-2">
                <FaStar className="text-yellow-500" />
                <span className="font-semibold">{restaurant.rating}</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600">{restaurant.deliveryTime}</span>
              </div>

              <div className="flex items-center space-x-2 mb-3">
                <FaRupeeSign className="text-gray-500" />
                <span className="text-gray-600">
                  ₹{restaurant.priceRange} for two
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                {restaurant.cuisines.map((cuisine, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm"
                  >
                    {cuisine}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>{restaurant.menu?.length || 0} items</span>
                <span>Popularity: {restaurant.popularity}</span>
              </div>

              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-50 text-blue-600 py-2 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center space-x-2">
                  <FaEdit />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(restaurant._id)}
                  className="flex-1 bg-red-50 text-red-600 py-2 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center space-x-2"
                >
                  <FaTrash />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredRestaurants.length === 0 && (
        <div className="text-center py-12">
          <FaUtensils className="text-gray-300 text-5xl mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No restaurants found</p>
        </div>
      )}

      <AddRestaurantModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleCreateRestaurant}
      />
    </div>
  );
};

export default Restaurants;
