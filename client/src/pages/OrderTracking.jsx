// src/pages/OrderTracking.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  FaCheckCircle, 
  FaClock, 
  FaUtensils, 
  FaMotorcycle, 
  FaUser, 
  FaMapMarkerAlt,
  FaPhone,
  FaArrowLeft,
  FaStar,
  FaShoppingBag,
  FaSmile,
  FaHeadset,
  FaTimes,
  FaMotorcycle as FaBike
} from 'react-icons/fa';
import { IoRestaurant, IoFastFood } from 'react-icons/io5';

export default function OrderTracking() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [currentStatus, setCurrentStatus] = useState('confirmed');
  const [timeLeft, setTimeLeft] = useState(25); // minutes
  const [isLoading, setIsLoading] = useState(true);
  const [driverLocation, setDriverLocation] = useState({ lat: 19.0760, lng: 72.8777 }); // Mumbai coordinates

  // Simulate order data - in real app, this would come from API
  useEffect(() => {
    const timer = setTimeout(() => {
      const orderData = {
        id: orderId || 'SBJH240115001',
        restaurant: {
          name: 'Burger King',
          address: 'Andheri West, Mumbai - 400053',
          phone: '1800-123-456',
          rating: 4.2,
          deliveryTime: '25-30 min',
          image: '/api/placeholder/80/80'
        },
        items: [
          { name: 'Whopper Burger', quantity: 1, price: 199 },
          { name: 'French Fries', quantity: 1, price: 99 },
          { name: 'Coke', quantity: 1, price: 59 },
          { name: 'Veggie Burger', quantity: 1, price: 149 }
        ],
        total: 506,
        discount: 50,
        finalAmount: 456,
        deliveryAddress: '123 Main Street, Apartment 4B, Near Central Park, Mumbai - 400001',
        deliveryPartner: {
          name: 'Rahul Kumar',
          phone: '+91 98765 43210',
          vehicle: 'Motorcycle - MH01AB1234',
          rating: 4.8,
          deliveries: 1247,
          image: '/api/placeholder/60/60'
        },
        status: 'on_the_way',
        orderTime: '2024-01-15T18:30:00',
        estimatedDelivery: '2024-01-15T19:15:00',
        preparationTime: '15 min',
        distance: '2.3 km'
      };

      setOrder(orderData);
      setIsLoading(false);
    }, 1500);

    // Simulate status updates and timer
    const intervalTimer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setOrder(prevOrder => prevOrder ? { ...prevOrder, status: 'delivered' } : null);
          clearInterval(intervalTimer);
          return 0;
        }
        return prev - 1;
      });
    }, 60000); // Update every minute

    // Simulate driver movement
    const driverInterval = setInterval(() => {
      setDriverLocation(prev => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.001,
        lng: prev.lng + (Math.random() - 0.5) * 0.001
      }));
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(intervalTimer);
      clearInterval(driverInterval);
    };
  }, [orderId]);

  const statusSteps = [
    { 
      key: 'confirmed', 
      label: 'Order Confirmed', 
      icon: FaCheckCircle, 
      time: '18:30',
      description: 'Your order has been confirmed by the restaurant'
    },
    { 
      key: 'preparing', 
      label: 'Being Prepared', 
      icon: FaUtensils, 
      time: '18:45',
      description: 'The restaurant is preparing your food'
    },
    { 
      key: 'on_the_way', 
      label: 'On the Way', 
      icon: FaMotorcycle, 
      time: '19:00',
      description: 'Your food is out for delivery'
    },
    { 
      key: 'delivered', 
      label: 'Delivered', 
      icon: FaUser, 
      time: '19:15',
      description: 'Your food has been delivered'
    }
  ];

  // Handle loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-500 border-t-transparent mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Tracking Your Order</h3>
          <p className="text-gray-500">Getting your delicious food details ready...</p>
        </div>
      </div>
    );
  }

  // Handle order not found
  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 flex items-center justify-center p-4">
        <div className="text-center bg-white rounded-3xl shadow-xl p-8 max-w-md">
          <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FaShoppingBag className="text-4xl text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Not Found</h1>
          <p className="text-gray-600 mb-6">We couldn't find an order with ID: {orderId}</p>
          <div className="space-y-3">
            <Link 
              to="/order-history" 
              className="block bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-bold hover:from-orange-600 hover:to-red-600 transition-all shadow-lg"
            >
              View Order History
            </Link>
            <Link 
              to="/restaurant-list" 
              className="block border-2 border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-bold hover:bg-gray-50 transition-all"
            >
              Browse Restaurants
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const currentStepIndex = statusSteps.findIndex(step => step.key === order.status);
  const isDelivered = order.status === 'delivered';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                to="/order-history" 
                className="bg-white/20 md:p-3 p-2 rounded-2xl backdrop-blur-sm hover:bg-white/30 transition-all"
              >
                <FaArrowLeft className="md:text-xl text-sm" />
              </Link>
              <div>
                <h1 className="text-[22px] md:text-3xl font-bold mb-1">Track Your Order</h1>
                <p className="text-[14px] md:text-[16px] text-orange-100 flex items-center gap-2">
                  {/* <IoFastFood /> */}
                  Order #{order.id}
                </p>
                <p className="text-[14px] md:text-[16px] text-orange-100 flex items-center gap-2">
                  {/* <IoFastFood /> */}
                  {order.restaurant.name}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl md:p-3 p-2 text-center">
                <div className="md:text-2xl text-xl font-bold">{timeLeft}</div>
                <div className="text-orange-200 md:text-sm text-[12px]">minutes left</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 -mt-4">
        {/* Delivery Status Card */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-6">
          <div className="flex md:flex-row flex-col items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`p-4 rounded-2xl ${
                isDelivered ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
              }`}>
                {isDelivered ? <FaCheckCircle className="text-3xl" /> : <FaBike className="text-3xl" />}
              </div>
              <div>
                <h3 className={`md:text-2xl text-[18px] font-bold ${isDelivered ? 'text-green-600' : 'text-orange-600'}`}>
                  {isDelivered ? 'Delivered Successfully!' : `Delivery in ${timeLeft} minutes`}
                </h3>
                <p className="text-gray-600">
                  {isDelivered ? 'Your food has been delivered. Enjoy your meal! 🎉' : 'Your food is on the way!'}
                </p>
              </div>
            </div>
            {!isDelivered && (
              <div className="text-right flex md:flex-col md:ml-0 ml-18 items-center flex-row gap-2">
                <div className="text-sm text-gray-500">Estimated delivery</div>
                <div className="text-lg font-bold text-gray-900">
                  {new Date(order.estimatedDelivery).toLocaleTimeString('en-IN', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Progress Tracking - Swiggy Style */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-6">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <FaClock className="text-orange-500" />
            Order Journey
          </h2>
          
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute left-8 top-0 h-full w-1 bg-gray-200">
              <div 
                className="bg-gradient-to-b from-orange-500 to-red-500 h-full transition-all duration-1000 ease-out"
                style={{ height: `${(currentStepIndex / (statusSteps.length - 1)) * 100}%` }}
              ></div>
            </div>

            {/* Steps */}
            <div className="space-y-8">
              {statusSteps.map((step, index) => {
                const Icon = step.icon;
                const isCompleted = index <= currentStepIndex;
                const isCurrent = index === currentStepIndex;
                const isLast = index === statusSteps.length - 1;

                return (
                  <div key={step.key} className="flex items-start gap-6 relative">
                    {/* Step Icon */}
                    <div className={`relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-500 ${
                      isCompleted 
                        ? 'bg-gradient-to-br from-orange-500 to-red-500 scale-110' 
                        : 'bg-gray-100 scale-100'
                    }`}>
                      <Icon className={`text-2xl ${isCompleted ? 'text-white' : 'text-gray-400'}`} />
                      
                      {/* Animated pulse for current step */}
                      {isCurrent && !isLast && (
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center animate-ping">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                    
                    {/* Step Content */}
                    <div className="flex-1 pt-2">
                      <div className="flex items-center gap-3 mb-1">
                        <p className={`text-lg font-bold ${
                          isCompleted ? 'text-gray-900' : 'text-gray-500'
                        }`}>
                          {step.label}
                        </p>
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm font-medium">
                          {step.time}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3">{step.description}</p>
                      
                      {/* Additional info for current step */}
                      {isCurrent && order.status === 'on_the_way' && order.deliveryPartner && (
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                                <FaUser className="text-green-600 text-xl" />
                              </div>
                              <div>
                                <p className="font-bold text-green-800">{order.deliveryPartner.name}</p>
                                <div className="flex items-center gap-2 text-sm text-green-600">
                                  <FaStar className="text-yellow-400" />
                                  {order.deliveryPartner.rating} • {order.deliveryPartner.deliveries} deliveries
                                </div>
                                <p className="text-xs text-green-500">{order.deliveryPartner.vehicle}</p>
                              </div>
                            </div>
                            <a 
                              href={`tel:${order.deliveryPartner.phone}`}
                              className="bg-green-500 text-white p-3 rounded-xl hover:bg-green-600 transition-all shadow-lg"
                            >
                              <FaPhone size={16} />
                            </a>
                          </div>
                          
                          {/* Mini Map Simulation */}
                          <div className="mt-3 bg-white rounded-xl p-3 border border-green-100">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-green-600 font-semibold">🚗 Driver is {order.distance} away</span>
                              <span className="text-gray-500">Moving towards you</span>
                            </div>
                            <div className="w-full h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-300"
                                style={{ width: `${(25 - timeLeft) / 25 * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      )}

                      {isCurrent && order.status === 'preparing' && (
                        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                          <div className="flex items-center gap-3">
                            <IoRestaurant className="text-blue-500 text-2xl" />
                            <div>
                              <p className="font-bold text-blue-800">Food is being prepared</p>
                              <p className="text-sm text-blue-600">Estimated preparation time: {order.preparationTime}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Order Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Restaurant Info Card */}
          <div className="bg-white rounded-3xl shadow-xl p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <IoRestaurant className="text-orange-500" />
              Restaurant Details
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl flex items-center justify-center">
                  <IoFastFood className="text-orange-500 text-xl" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">{order.restaurant.name}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FaStar className="text-yellow-400" />
                    {order.restaurant.rating} • {order.restaurant.deliveryTime}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <FaMapMarkerAlt className="text-gray-400" />
                <span className="text-sm">{order.restaurant.address}</span>
              </div>
              <a 
                href={`tel:${order.restaurant.phone}`}
                className="inline-flex items-center gap-2 text-orange-500 font-semibold hover:text-orange-600"
              >
                <FaPhone />
                {order.restaurant.phone}
              </a>
            </div>
          </div>

          {/* Delivery Address Card */}
          <div className="bg-white rounded-3xl shadow-xl p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <FaMapMarkerAlt className="text-green-500" />
              Delivery Address
            </h3>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <FaUser className="text-green-500" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Home</p>
                <p className="text-gray-600 text-sm leading-relaxed">{order.deliveryAddress}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary Card */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-6">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <FaShoppingBag className="text-purple-500" />
            Order Summary
          </h3>
          <div className="space-y-4">
            {order.items.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-3">
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-sm font-medium">
                    {item.quantity}x
                  </span>
                  <span className="text-gray-700">{item.name}</span>
                </div>
                <span className="font-semibold">₹{item.price * item.quantity}</span>
              </div>
            ))}
            
            <div className="space-y-2 pt-2">
              {order.discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount Applied</span>
                  <span>-₹{order.discount}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-500 text-sm">
                <span>Delivery Fee</span>
                <span>FREE</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total Amount</span>
                  <span>₹{order.finalAmount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Help Section */}
        {!isDelivered && (
          <div className="text-center mb-12">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl p-6 border-2 border-dashed border-gray-200">
              <FaHeadset className="text-4xl text-gray-400 mx-auto mb-3" />
              <h4 className="font-bold text-gray-700 mb-2">Need help with your order?</h4>
              <p className="text-gray-600 mb-4">Our support team is here to help you</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button className="bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all shadow-sm flex items-center justify-center gap-2">
                  <FaHeadset />
                  Contact Support
                </button>
                <button className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-red-600 hover:to-pink-600 transition-all shadow-lg flex items-center justify-center gap-2">
                  <FaTimes />
                  Cancel Order
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delivered Success Message */}
        {isDelivered && (
          <div className="text-center bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 border border-green-200">
            <FaSmile className="text-5xl text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-green-800 mb-2">Enjoy Your Meal! 🎉</h3>
            <p className="text-green-600 mb-6">Your food has been delivered successfully. Thank you for choosing BiteXpress!</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link 
                to="/order-history"
                className="bg-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-600 transition-all shadow-lg"
              >
                View Order History
              </Link>
              <Link 
                to="/restaurant-list"
                className="bg-white border-2 border-green-200 text-green-600 px-6 py-3 rounded-xl font-semibold hover:bg-green-50 transition-all"
              >
                Order Again
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}