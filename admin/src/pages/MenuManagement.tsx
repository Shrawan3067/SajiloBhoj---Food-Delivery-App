import React, { useEffect, useState } from 'react';
import { adminService } from '../services/adminService';
import type { Restaurant, MenuItem } from '../types';
import { 
  FaUtensils, 
  FaPlus, 
  FaEdit, 
  FaTrash,
  FaStar,
  FaLeaf,
  FaTag,
  FaTimes
} from 'react-icons/fa';

const MenuManagement: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const data = await adminService.getAllRestaurants();
        setRestaurants(data);
        if (data.length > 0) {
          setSelectedRestaurant(data[0]._id);
        }
      } catch (error) {
        console.error('Failed to fetch restaurants:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const selectedRestaurantData = restaurants.find((r) => r._id === selectedRestaurant);

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (itemId: number) => {
    if (!selectedRestaurant) return;
    
    if (window.confirm('Are you sure you want to delete this menu item?')) {
      try {
        const restaurant = restaurants.find((r) => r._id === selectedRestaurant);
        if (restaurant) {
          const updatedMenu = restaurant.menu?.filter((item) => item.id !== itemId) || [];
          await adminService.updateRestaurant(selectedRestaurant, { menu: updatedMenu });
          const data = await adminService.getAllRestaurants();
          setRestaurants(data);
        }
      } catch (error) {
        console.error('Failed to delete menu item:', error);
        alert('Failed to delete menu item');
      }
    }
  };

  const handleUpdateItem = async (updatedItem: MenuItem) => {
    if (!selectedRestaurant || !editingItem) return;
    
    try {
      const restaurant = restaurants.find((r) => r._id === selectedRestaurant);
      if (restaurant) {
        const updatedMenu = restaurant.menu?.map((item) =>
          item.id === editingItem.id ? updatedItem : item
        ) || [];
        await adminService.updateRestaurant(selectedRestaurant, { menu: updatedMenu });
        const data = await adminService.getAllRestaurants();
        setRestaurants(data);
        setIsEditModalOpen(false);
        setEditingItem(null);
      }
    } catch (error) {
      console.error('Failed to update menu item:', error);
      alert('Failed to update menu item');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Menu Management</h1>
        <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center space-x-2">
          <FaPlus />
          <span>Add Menu Item</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Restaurant
        </label>
        <select
          value={selectedRestaurant || ''}
          onChange={(e) => setSelectedRestaurant(e.target.value)}
          className="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          {restaurants.map((restaurant) => (
            <option key={restaurant._id} value={restaurant._id}>
              {restaurant.name}
            </option>
          ))}
        </select>
      </div>

      {selectedRestaurantData && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">
                {selectedRestaurantData.name} - Menu Items
              </h2>
              <p className="text-gray-600 mt-1">
                {selectedRestaurantData.menu?.length || 0} items
              </p>
            </div>

            <div className="divide-y divide-gray-200">
              {selectedRestaurantData.menu?.map((item) => (
                <div key={item.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      )}
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                          {item.veg && (
                            <span className="flex items-center text-green-600">
                              <FaLeaf className="mr-1" />
                              Veg
                            </span>
                          )}
                          {item.bestseller && (
                            <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs font-semibold">
                              Bestseller
                            </span>
                          )}
                          {item.offer && (
                            <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-semibold">
                              <FaTag className="mr-1" />
                              Offer
                            </span>
                          )}
                        </div>

                        {item.description && (
                          <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                        )}

                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          {item.rating > 0 && (
                            <div className="flex items-center">
                              <FaStar className="text-yellow-500 mr-1" />
                              {item.rating}
                            </div>
                          )}
                          {item.preparationTime && (
                            <span>⏱ {item.preparationTime}</span>
                          )}
                          {item.calories && (
                            <span>🔥 {item.calories}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end space-y-2">
                      <p className="text-2xl font-bold text-gray-800">₹{item.price}</p>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {(!selectedRestaurantData.menu || selectedRestaurantData.menu.length === 0) && (
                <div className="p-12 text-center">
                  <FaUtensils className="text-gray-300 text-5xl mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No menu items found</p>
                  <button className="mt-4 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors">
                    Add First Menu Item
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {!selectedRestaurant && restaurants.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No restaurants found. Add a restaurant first.</p>
        </div>
      )}

      {isEditModalOpen && editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">Edit Menu Item</h2>
              <button
                onClick={() => {
                  setIsEditModalOpen(false);
                  setEditingItem(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FaTimes className="text-gray-500" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateItem(editingItem);
              }}
              className="p-6 space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Item Name
                </label>
                <input
                  type="text"
                  value={editingItem.name}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price (₹)
                </label>
                <input
                  type="number"
                  value={editingItem.price}
                  onChange={(e) => setEditingItem({ ...editingItem, price: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={editingItem.description || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image
                </label>
                <input
                  type="text"
                  value={editingItem.image || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="image.png"
                />
              </div>

              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={editingItem.veg}
                    onChange={(e) => setEditingItem({ ...editingItem, veg: e.target.checked })}
                    className="w-4 h-4 text-orange-600"
                  />
                  <span className="text-sm text-gray-700">Veg</span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={editingItem.bestseller}
                    onChange={(e) => setEditingItem({ ...editingItem, bestseller: e.target.checked })}
                    className="w-4 h-4 text-orange-600"
                  />
                  <span className="text-sm text-gray-700">Bestseller</span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={editingItem.offer}
                    onChange={(e) => setEditingItem({ ...editingItem, offer: e.target.checked })}
                    className="w-4 h-4 text-orange-600"
                  />
                  <span className="text-sm text-gray-700">Offer</span>
                </label>
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setEditingItem(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuManagement;
