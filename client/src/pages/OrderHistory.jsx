// src/pages/OrderHistory.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  FaHistory, 
  FaSearch, 
  FaFilter, 
  FaBox, 
  FaCheckCircle, 
  FaMotorcycle, 
  FaUtensils,
  FaClock,
  FaMapMarkerAlt,
  FaStar,
  FaRedo,
  FaShoppingBag,
  FaTimes,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaUser,
  FaChevronRight
} from 'react-icons/fa';
import { IoFastFood, IoRestaurant } from 'react-icons/io5';

// OrderCard Component (Fixed version included in same file)
const OrderCard = ({ order }) => {
  const getStatusInfo = (status) => {
    const statusConfig = {
      delivered: { 
        icon: FaCheckCircle, 
        color: 'text-green-500', 
        bgColor: 'bg-green-50', 
        label: 'Delivered',
        textColor: 'text-green-700'
      },
      preparing: { 
        icon: FaUtensils, 
        color: 'text-blue-500', 
        bgColor: 'bg-blue-50', 
        label: 'Preparing',
        textColor: 'text-blue-700'
      },
      on_the_way: { 
        icon: FaMotorcycle, 
        color: 'text-orange-500', 
        bgColor: 'bg-orange-50', 
        label: 'On the Way',
        textColor: 'text-orange-700'
      },
      cancelled: { 
        icon: FaTimes, 
        color: 'text-red-500', 
        bgColor: 'bg-red-50', 
        label: 'Cancelled',
        textColor: 'text-red-700'
      }
    };
    return statusConfig[status] || { 
      icon: FaClock, 
      color: 'text-gray-500', 
      bgColor: 'bg-gray-50', 
      label: 'Unknown',
      textColor: 'text-gray-700'
    };
  };

  const statusInfo = getStatusInfo(order.status);
  const StatusIcon = statusInfo.icon;
  const orderDate = new Date(order.orderDate);
  const deliveryDate = order.deliveryDate ? new Date(order.deliveryDate) : null;
  const estimatedDelivery = order.estimatedDelivery ? new Date(order.estimatedDelivery) : null;

  // Fix: Properly handle deliveryPartner object by accessing its properties
  const deliveryPartnerName = order.deliveryPartner ? order.deliveryPartner.name : null;
  const deliveryPartnerRating = order.deliveryPartner ? order.deliveryPartner.rating : null;
  const deliveryPartnerPhone = order.deliveryPartner ? order.deliveryPartner.phone : null;

  return (
    <div className="p-6">
      {/* Order Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusInfo.bgColor} ${statusInfo.textColor}`}>
              <StatusIcon className="inline mr-1" />
              {statusInfo.label}
            </span>
            <span className="text-gray-500 text-sm">#{order.id}</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900">{order.restaurant.name}</h3>
          <p className="text-gray-600">{order.restaurant.cuisine}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">₹{order.finalAmount}</div>
          {order.discount > 0 && (
            <div className="text-sm text-gray-500 line-through">₹{order.total}</div>
          )}
          <div className="text-sm text-green-600 font-semibold">
            {orderDate.toLocaleDateString('en-IN', { 
              day: 'numeric', 
              month: 'short', 
              year: 'numeric' 
            })}
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {order.items.map((item, index) => (
            <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
              {item.quantity}x {item.name}
            </span>
          ))}
        </div>
        <div className="text-sm text-gray-500 mt-2">
          {order.items.length} item{order.items.length > 1 ? 's' : ''} • 
          Total: ₹{order.total} {order.discount > 0 && `• Saved: ₹${order.discount}`}
        </div>
      </div>

      {/* Delivery Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="flex items-start gap-3">
          <FaMapMarkerAlt className="text-gray-400 mt-1" />
          <div>
            <div className="text-sm text-gray-600">Delivery Address</div>
            <div className="text-gray-900 font-medium">{order.deliveryAddress}</div>
          </div>
        </div>

        {/* Fixed: Properly render delivery partner information */}
        {deliveryPartnerName && (
          <div className="flex items-start gap-3">
            <FaUser className="text-gray-400 mt-1" />
            <div>
              <div className="text-sm text-gray-600">Delivery Partner</div>
              <div className="text-gray-900 font-medium">{deliveryPartnerName}</div>
              {deliveryPartnerRating && (
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <FaStar className="text-yellow-400" />
                  {deliveryPartnerRating}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Timing Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="flex items-center gap-3">
          <FaClock className="text-gray-400" />
          <div>
            <div className="text-sm text-gray-600">Order Time</div>
            <div className="text-gray-900 font-medium">
              {orderDate.toLocaleTimeString('en-IN', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </div>
          </div>
        </div>

        {order.status === 'delivered' && deliveryDate && (
          <div className="flex items-center gap-3">
            <FaCheckCircle className="text-green-500" />
            <div>
              <div className="text-sm text-gray-600">Delivered At</div>
              <div className="text-gray-900 font-medium">
                {deliveryDate.toLocaleTimeString('en-IN', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
            </div>
          </div>
        )}

        {order.status === 'on_the_way' && estimatedDelivery && (
          <div className="flex items-center gap-3">
            <FaMotorcycle className="text-orange-500" />
            <div>
              <div className="text-sm text-gray-600">Estimated Delivery</div>
              <div className="text-gray-900 font-medium">
                {estimatedDelivery.toLocaleTimeString('en-IN', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
            </div>
          </div>
        )}

        {order.status === 'preparing' && (
          <div className="flex items-center gap-3">
            <FaUtensils className="text-blue-500" />
            <div>
              <div className="text-sm text-gray-600">Status</div>
              <div className="text-gray-900 font-medium">Food is being prepared</div>
            </div>
          </div>
        )}

        {order.status === 'cancelled' && order.cancellationReason && (
          <div className="flex items-center gap-3">
            <FaTimes className="text-red-500" />
            <div>
              <div className="text-sm text-gray-600">Cancellation Reason</div>
              <div className="text-gray-900 font-medium">{order.cancellationReason}</div>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
        {order.status === 'delivered' && (
          <>
            <Link 
              to={`/track-order/${order.id}`}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              View Details
            </Link>
            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors flex items-center gap-2">
              <FaRedo />
              Reorder
            </button>
            {!order.rating && (
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors">
                Rate Order
              </button>
            )}
          </>
        )}
        
        {order.status === 'on_the_way' && (
          <Link 
            to={`/track-order/${order.id}`}
            className="bg-orange-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors"
          >
            Track Order
          </Link>
        )}

        {order.status === 'preparing' && (
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors">
            View Details
          </button>
        )}

        {order.status === 'cancelled' && (
          <button className="bg-gray-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-600 transition-colors">
            Order Details
          </button>
        )}
      </div>

      {/* Rating Display */}
      {order.rating && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Your rating:</span>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <FaStar 
                  key={i} 
                  className={i < order.rating ? "text-yellow-400" : "text-gray-300"} 
                />
              ))}
            </div>
            {order.review && (
              <span className="text-gray-600 ml-2">"{order.review}"</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Main OrderHistory Component
export default function OrderHistory() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState('newest');

  // Enhanced sample orders data
  const [orders, setOrders] = useState([
    {
      id: 'SBJH240115001',
      restaurant: {
        name: 'Burger King',
        image: '/api/placeholder/80/80',
        rating: 4.2,
        cuisine: 'Burgers, American',
        deliveryTime: '25-30 min'
      },
      items: [
        { name: 'Whopper Burger', quantity: 1, price: 199 },
        { name: 'French Fries', quantity: 1, price: 99 },
        { name: 'Coke', quantity: 1, price: 59 }
      ],
      total: 357,
      discount: 50,
      finalAmount: 307,
      status: 'delivered',
      orderDate: '2024-01-15T18:30:00',
      deliveryDate: '2024-01-15T19:15:00',
      deliveryAddress: '123 Main Street, Mumbai - 400001',
      deliveryPartner: { name: 'Rahul Kumar', rating: 4.8 },
      rating: 4,
      review: 'Great food, fast delivery!',
      preparationTime: '15 min',
      deliveryTimeTaken: '45 min'
    },
    {
      id: 'SBJH240110002',
      restaurant: {
        name: 'Dominos Pizza',
        image: '/api/placeholder/80/80',
        rating: 4.5,
        cuisine: 'Pizza, Italian',
        deliveryTime: '30-35 min'
      },
      items: [
        { name: 'Margherita Pizza', quantity: 1, price: 299 },
        { name: 'Garlic Bread', quantity: 1, price: 129 },
        { name: 'Choco Lava Cake', quantity: 1, price: 99 }
      ],
      total: 527,
      discount: 100,
      finalAmount: 427,
      status: 'delivered',
      orderDate: '2024-01-10T20:15:00',
      deliveryDate: '2024-01-10T20:45:00',
      deliveryAddress: 'Tech Park, Andheri East, Mumbai - 400093',
      deliveryPartner: { name: 'Amit Sharma', rating: 4.9 },
      rating: 5,
      preparationTime: '20 min',
      deliveryTimeTaken: '30 min'
    },
    {
      id: 'SBJH240105003',
      restaurant: {
        name: 'Bikanervala',
        image: '/api/placeholder/80/80',
        rating: 4.1,
        cuisine: 'North Indian, Sweets',
        deliveryTime: '35-40 min'
      },
      items: [
        { name: 'Paneer Butter Masala', quantity: 1, price: 280 },
        { name: 'Butter Naan', quantity: 2, price: 80 },
        { name: 'Gulab Jamun', quantity: 1, price: 120 }
      ],
      total: 480,
      discount: 0,
      finalAmount: 480,
      status: 'cancelled',
      orderDate: '2024-01-05T19:00:00',
      cancellationReason: 'Restaurant was closed',
      cancellationTime: '2024-01-05T19:15:00'
    },
    {
      id: 'SBJH240101004',
      restaurant: {
        name: 'McDonald\'s',
        image: '/api/placeholder/80/80',
        rating: 4.0,
        cuisine: 'Burgers, Fast Food',
        deliveryTime: '20-25 min'
      },
      items: [
        { name: 'McAloo Tikki Burger', quantity: 2, price: 50 },
        { name: 'McVeggie Burger', quantity: 1, price: 120 },
        { name: 'Coke', quantity: 2, price: 59 }
      ],
      total: 288,
      discount: 40,
      finalAmount: 248,
      status: 'on_the_way',
      orderDate: '2024-01-01T12:30:00',
      estimatedDelivery: '2024-01-01T13:10:00',
      deliveryAddress: 'Home Address, Mumbai - 400001',
      deliveryPartner: { name: 'Vikram Singh', rating: 4.7, phone: '+91 9876543210' }
    },
    {
      id: 'SBJH231225005',
      restaurant: {
        name: 'Pizza Hut',
        image: '/api/placeholder/80/80',
        rating: 4.3,
        cuisine: 'Pizza, Italian',
        deliveryTime: '30-35 min'
      },
      items: [
        { name: 'Cheese Pizza', quantity: 1, price: 399 },
        { name: 'Garlic Breadsticks', quantity: 1, price: 199 }
      ],
      total: 598,
      discount: 150,
      finalAmount: 448,
      status: 'preparing',
      orderDate: '2023-12-25T19:30:00',
      estimatedDelivery: '2024-12-25T20:15:00',
      deliveryAddress: 'Office Address, Mumbai - 400002'
    }
  ]);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let filtered = orders;

    // Filter by tab
    if (activeTab !== 'all') {
      filtered = filtered.filter(order => order.status === activeTab);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Sort orders
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.orderDate) - new Date(a.orderDate);
        case 'oldest':
          return new Date(a.orderDate) - new Date(b.orderDate);
        case 'price_high':
          return b.finalAmount - a.finalAmount;
        case 'price_low':
          return a.finalAmount - b.finalAmount;
        default:
          return new Date(b.orderDate) - new Date(a.orderDate);
      }
    });

    setFilteredOrders(filtered);
  }, [orders, activeTab, searchTerm, sortBy]);

  const getStatusCount = (status) => {
    return orders.filter(order => order.status === status).length;
  };

  const tabs = [
    { key: 'all', label: 'All Orders', icon: FaShoppingBag, count: orders.length },
    { key: 'delivered', label: 'Delivered', icon: FaCheckCircle, count: getStatusCount('delivered') },
    { key: 'preparing', label: 'Preparing', icon: FaUtensils, count: getStatusCount('preparing') },
    { key: 'on_the_way', label: 'On the Way', icon: FaMotorcycle, count: getStatusCount('on_the_way') },
    { key: 'cancelled', label: 'Cancelled', icon: FaTimes, count: getStatusCount('cancelled') }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-500 border-t-transparent mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Loading Your Orders</h3>
          <p className="text-gray-500">Getting your delicious history ready...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
                <FaHistory className="text-3xl" />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">Order History</h1>
                <p className="text-orange-100 text-lg flex items-center gap-2">
                  <FaShoppingBag />
                  {orders.length} orders • {getStatusCount('delivered')} delivered • ₹{orders.filter(o => o.status === 'delivered').reduce((sum, o) => sum + o.finalAmount, 0)} spent
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
                <div className="text-2xl font-bold">{getStatusCount('delivered')}</div>
                <div className="text-orange-200 text-sm">Successful Orders</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 -mt-8">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Search Bar */}
            <div className="lg:col-span-2">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  type="text"
                  placeholder="Search by restaurant, order ID, or items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all text-lg"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-500"
                  >
                    <FaTimes />
                  </button>
                )}
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-700 font-semibold">
                <FaFilter className="text-orange-500" />
                <span>Sort by:</span>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-100 font-semibold"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price_high">Price: High to Low</option>
                <option value="price_low">Price: Low to High</option>
              </select>
            </div>
          </div>
        </div>

        {/* Enhanced Tabs */}
        <div className="bg-white rounded-3xl shadow-xl mb-8 overflow-hidden">
          <div className="flex overflow-x-auto scrollbar-hide border-b">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-3 px-8 py-5 border-b-2 font-semibold transition-all duration-300 whitespace-nowrap flex-1 min-w-max ${
                    isActive
                      ? 'border-orange-500 text-orange-600 bg-orange-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <IconComponent className={`text-xl ${isActive ? 'text-orange-500' : 'text-gray-400'}`} />
                  <span>{tab.label}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    isActive ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Orders Grid */}
        <div className="space-y-6">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl shadow-xl">
              <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FaBox className="text-5xl text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {searchTerm ? 'No orders found' : 'No orders yet'}
              </h3>
              <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
                {searchTerm 
                  ? 'Try adjusting your search terms or browse different categories'
                  : 'Start your delicious food journey with BiteXpress!'
                }
              </p>
              <Link 
                to="/restaurant-list" 
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-xl font-bold hover:from-orange-600 hover:to-red-600 transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-3"
              >
                <IoRestaurant />
                {searchTerm ? 'Browse Restaurants' : 'Order Your First Meal'}
                <FaChevronRight className="text-sm" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {filteredOrders.map((order) => (
                <div key={order.id} className="bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
                  <OrderCard order={order} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Load More Section */}
        {filteredOrders.length > 0 && filteredOrders.length < orders.length && (
          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:from-gray-200 hover:to-gray-300 transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-3">
              <FaRedo />
              Load More Orders
              <span className="bg-white px-2 py-1 rounded-full text-xs font-bold">+{orders.length - filteredOrders.length}</span>
            </button>
          </div>
        )}

        {/* Statistics Footer */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{orders.length}</div>
            <div className="text-gray-700 font-semibold">Total Orders</div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-cyan-100 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{getStatusCount('delivered')}</div>
            <div className="text-gray-700 font-semibold">Delivered</div>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-red-100 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              ₹{orders.filter(o => o.status === 'delivered').reduce((sum, o) => sum + o.finalAmount, 0)}
            </div>
            <div className="text-gray-700 font-semibold">Total Spent</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              ₹{orders.reduce((sum, o) => sum + o.discount, 0)}
            </div>
            <div className="text-gray-700 font-semibold">Total Saved</div>
          </div>
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