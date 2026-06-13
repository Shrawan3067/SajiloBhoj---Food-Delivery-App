import React, { useState } from 'react';
import type { MenuItem } from '../types';
import { FaPlus, FaTrash, FaTimes } from 'react-icons/fa';

interface AddRestaurantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (restaurantData: unknown) => Promise<void>;
}

const AddRestaurantModal: React.FC<AddRestaurantModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    cuisines: '',
    rating: 4.0,
    deliveryTime: '30-35 mins',
    image: '',
    offer: '',
    hasOffer: false,
    isVeg: false,
    priceRange: 300,
    isBestseller: false,
    popularity: 85,
    location: '',
  });

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [currentMenuItem, setCurrentMenuItem] = useState({
    id: 0,
    name: '',
    price: 0,
    veg: true,
    bestseller: false,
    offer: false,
    rating: 4.0,
    description: '',
    preparationTime: '20 min',
    calories: '200 cal',
    image: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleMenuItemChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    setCurrentMenuItem({
      ...currentMenuItem,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const addMenuItem = () => {
    console.log('Add menu item clicked', currentMenuItem);
    
    if (!currentMenuItem.name.trim()) {
      setError('Please fill in menu item name');
      return;
    }

    if (!currentMenuItem.price || currentMenuItem.price <= 0) {
      setError('Please enter a valid price');
      return;
    }

    console.log('Adding menu item to list');
    setMenuItems([...menuItems, { ...currentMenuItem, id: Date.now() }]);
    setCurrentMenuItem({
      id: 0,
      name: '',
      price: 0,
      veg: true,
      bestseller: false,
      offer: false,
      rating: 4.0,
      description: '',
      preparationTime: '20 min',
      calories: '200 cal',
      image: '',
    });
    setError('');
  };

  const removeMenuItem = (id: number) => {
    setMenuItems(menuItems.filter((item) => item.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const restaurantData = {
        ...formData,
        cuisines: formData.cuisines.split(',').map((c) => c.trim()),
        menu: menuItems,
      };
      await onSubmit(restaurantData);
      onClose();
      // Reset form
      setFormData({
        name: '',
        cuisines: '',
        rating: 4.0,
        deliveryTime: '30-35 mins',
        image: '',
        offer: '',
        hasOffer: false,
        isVeg: false,
        priceRange: 300,
        isBestseller: false,
        popularity: 85,
        location: '',
      });
      setMenuItems([]);
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || 'Failed to create restaurant');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Add New Restaurant</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FaTimes className="text-gray-500 text-xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Restaurant Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cuisines (comma-separated) *
                </label>
                <input
                  type="text"
                  name="cuisines"
                  value={formData.cuisines}
                  onChange={handleInputChange}
                  placeholder="Italian, Pizzas, Fast Food"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating *
                </label>
                <input
                  type="number"
                  name="rating"
                  value={formData.rating}
                  onChange={handleInputChange}
                  min="0"
                  max="5"
                  step="0.1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Delivery Time *
                </label>
                <input
                  type="text"
                  name="deliveryTime"
                  value={formData.deliveryTime}
                  onChange={handleInputChange}
                  placeholder="30-35 mins"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range (for two) *
                </label>
                <input
                  type="number"
                  name="priceRange"
                  value={formData.priceRange}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Popularity Score
                </label>
                <input
                  type="number"
                  name="popularity"
                  value={formData.popularity}
                  onChange={handleInputChange}
                  min="0"
                  max="100"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URL / Filename
              </label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="pizza_hut.png"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="City, Area"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* Offer Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Offer Settings</h3>
            
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="hasOffer"
                  checked={formData.hasOffer}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-orange-600 focus:ring-orange-500"
                />
                <span className="text-sm text-gray-700">Has Offer</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="isBestseller"
                  checked={formData.isBestseller}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-orange-600 focus:ring-orange-500"
                />
                <span className="text-sm text-gray-700">Bestseller</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="isVeg"
                  checked={formData.isVeg}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-orange-600 focus:ring-orange-500"
                />
                <span className="text-sm text-gray-700">Pure Veg</span>
              </label>
            </div>

            {formData.hasOffer && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Offer Text
                </label>
                <input
                  type="text"
                  name="offer"
                  value={formData.offer}
                  onChange={handleInputChange}
                  placeholder="20% OFF or BUY 1 GET 1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            )}
          </div>

          {/* Menu Items */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Menu Items</h3>
            
            {error && error.includes('menu') && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}
            
            <div className="bg-gray-50 p-4 rounded-lg space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Item Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={currentMenuItem.name}
                    onChange={handleMenuItemChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={currentMenuItem.price}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value) || 0;
                      setCurrentMenuItem({ ...currentMenuItem, price: value });
                    }}
                    min="0"
                    step="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rating
                  </label>
                  <input
                    type="number"
                    name="rating"
                    value={currentMenuItem.rating}
                    onChange={handleMenuItemChange}
                    min="0"
                    max="5"
                    step="0.1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preparation Time
                  </label>
                  <input
                    type="text"
                    name="preparationTime"
                    value={currentMenuItem.preparationTime}
                    onChange={handleMenuItemChange}
                    placeholder="20 min"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Calories
                  </label>
                  <input
                    type="text"
                    name="calories"
                    value={currentMenuItem.calories}
                    onChange={handleMenuItemChange}
                    placeholder="200 cal"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image
                  </label>
                  <input
                    type="text"
                    name="image"
                    value={currentMenuItem.image}
                    onChange={handleMenuItemChange}
                    placeholder="image.png"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={currentMenuItem.description}
                  onChange={handleMenuItemChange}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Item description..."
                />
              </div>

              <div className="flex flex-wrap gap-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="veg"
                    checked={currentMenuItem.veg}
                    onChange={handleMenuItemChange}
                    className="w-4 h-4 text-orange-600 focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-700">Veg</span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="bestseller"
                    checked={currentMenuItem.bestseller}
                    onChange={handleMenuItemChange}
                    className="w-4 h-4 text-orange-600 focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-700">Bestseller</span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="offer"
                    checked={currentMenuItem.offer}
                    onChange={handleMenuItemChange}
                    className="w-4 h-4 text-orange-600 focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-700">Offer</span>
                </label>
              </div>

              <button
                type="button"
                onClick={addMenuItem}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <FaPlus />
                <span>Add Menu Item</span>
              </button>
            </div>

            {/* Menu Items List */}
            {menuItems.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-700">Added Menu Items ({menuItems.length})</h4>
                {menuItems.map((item) => (
                  <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-3 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-600">₹{item.price} • {item.veg ? 'Veg' : 'Non-Veg'}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeMenuItem(item.id)}
                      className="text-red-600 hover:text-red-700 p-2"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating...' : 'Create Restaurant'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRestaurantModal;
